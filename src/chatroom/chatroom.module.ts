import { Module } from '@nestjs/common';
import { ChatroomResolver } from './resolvers/chatroom.resolver';
import { ChatroomService } from './services/chatroom.service';

@Module({
  providers: [ChatroomResolver, ChatroomService],
})
export class ChatroomModule {}
