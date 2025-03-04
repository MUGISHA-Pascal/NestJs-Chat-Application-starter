import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Subscription,
  Context,
} from '@nestjs/graphql';
import { LiveChatroom } from '../entities/live-chatroom.entity';
import { LiveChatroomService } from '../services/live-chatroom.service';
import { PubSub } from 'graphql-subscriptions';
import { UserService } from 'src/user/services/user.service';
import { User } from 'src/user/types/user.type';
import { UseFilters, UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { Request } from 'express';
import { GraphQlErrorFilter } from 'src/filter/custom-exception.filter';
interface CRequest extends Request {
  user: any;
}
@Resolver(() => LiveChatroom)
export class LiveChatroomResolver {
  private pubSub: PubSub;
  constructor(
    private readonly liveChatroomService: LiveChatroomService,
    private readonly userService: UserService,
  ) {
    this.pubSub = new PubSub();
  }
  @Subscription(() => [User], {
    nullable: true,
    resolve: (value) => value.liveUsers,
    filter: (payload, variables) => {
      return payload.chatroomId === variables.chatroomId;
    },
  })
  liveUsersInChatroom(@Args('chatroomId') chatroomId: number) {
    return this.pubSub.asyncIterableIterator(
      `liveUsersInChatroom.${chatroomId}`,
    );
  }
  @UseFilters(GraphQlErrorFilter)
  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => Boolean)
  async enterChatroom(
    @Args('chatroomId') chatroomId: number,
    @Context() context: { req: CRequest },
  ) {
    const user = await this.userService.getUser(context.req.user.sub);
    if (user) {
      await this.liveChatroomService.addLiveUserToChatroom(chatroomId, user);
    }
    const liveUsers = await this.liveChatroomService
      .getLiveUsersForChatroom(chatroomId)
      .catch((err) => {
        console.log(`getLiveUsersForChatroom error`, err);
      });
    await this.pubSub
      .publish(`liveUsersInChatroom.${chatroomId}`, {
        liveUsers,
        chatroomId,
      })
      .catch((err) => {
        console.log('pubsub error', err);
      });
    return true;
  }
  @UseFilters(GraphQlErrorFilter)
  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => Boolean)
  async leaveChatRoom(
    @Args('chatroomId') chatroomId: number,
    @Context() context: { req: CRequest },
  ) {
    const user = await this.userService.getUser(context.req.user.sub);
    await this.liveChatroomService.removeLiveUserFromChatroom(chatroomId, user);
    const liveUsers =
      await this.liveChatroomService.getLiveUsersForChatroom(chatroomId);
    await this.pubSub.publish(`liveUsersInChatroom.${chatroomId}`, {
      liveUsers,
      chatroomId,
    });
    return true;
  }
}
