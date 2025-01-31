import { Module } from '@nestjs/common';
import { LiveChatroomService } from './live-chatroom.service';
import { LiveChatroomResolver } from './live-chatroom.resolver';

@Module({
  providers: [LiveChatroomResolver, LiveChatroomService],
})
export class LiveChatroomModule {}
