import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LiveChatroomService } from './live-chatroom.service';
import { LiveChatroom } from './entities/live-chatroom.entity';
import { CreateLiveChatroomInput } from './dto/create-live-chatroom.input';
import { UpdateLiveChatroomInput } from './dto/update-live-chatroom.input';

@Resolver(() => LiveChatroom)
export class LiveChatroomResolver {
  constructor(private readonly liveChatroomService: LiveChatroomService) {}

  @Mutation(() => LiveChatroom)
  createLiveChatroom(@Args('createLiveChatroomInput') createLiveChatroomInput: CreateLiveChatroomInput) {
    return this.liveChatroomService.create(createLiveChatroomInput);
  }

  @Query(() => [LiveChatroom], { name: 'liveChatroom' })
  findAll() {
    return this.liveChatroomService.findAll();
  }

  @Query(() => LiveChatroom, { name: 'liveChatroom' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.liveChatroomService.findOne(id);
  }

  @Mutation(() => LiveChatroom)
  updateLiveChatroom(@Args('updateLiveChatroomInput') updateLiveChatroomInput: UpdateLiveChatroomInput) {
    return this.liveChatroomService.update(updateLiveChatroomInput.id, updateLiveChatroomInput);
  }

  @Mutation(() => LiveChatroom)
  removeLiveChatroom(@Args('id', { type: () => Int }) id: number) {
    return this.liveChatroomService.remove(id);
  }
}
