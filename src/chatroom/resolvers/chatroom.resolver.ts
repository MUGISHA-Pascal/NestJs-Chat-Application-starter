import { Resolver } from '@nestjs/graphql';
import { ChatroomService } from '../services/chatroom.service';

@Resolver()
export class ChatroomResolver {
  constructor(private readonly chatroomService: ChatroomService) {}
}
