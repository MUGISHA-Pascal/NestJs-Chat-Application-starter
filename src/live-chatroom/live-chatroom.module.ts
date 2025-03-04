import { Module } from '@nestjs/common';
import { LiveChatroomResolver } from './resolvers/live-chatroom.resolver';
import { LiveChatroomService } from './services/live-chatroom.service';
import { UserService } from 'src/user/services/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [
    LiveChatroomResolver,
    LiveChatroomService,
    UserService,
    PrismaService,
    JwtService,
  ],
})
export class LiveChatroomModule {}
