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
import { GraphQlExceptionHandler } from 'src/filter/custom-handler.filter';
import { GraphqlAuthGuard } from 'src/auth/graphql-auth.guard';
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
  @UseFilters(GraphQlExceptionHandler)
  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => boolean)
  async enterChatroom(
    @Args('chatroomId') chatroomId: number,
    @Context() context: { req: Request },
  ) {
    const user = await this.userService.getUser;
  }
}
