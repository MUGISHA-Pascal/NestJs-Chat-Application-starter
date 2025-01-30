import { Injectable } from '@nestjs/common';
import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { join } from 'path';
import * as fs from 'fs';
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async updateProfile(userId: number, fullname: string, avatarUrl: string) {
    if (avatarUrl) {
      const oldUser = await this.prisma.user.findUnique({
        where: { id: userId },
      });
      const updatedUser = await this.prisma.user.update({
        where: { id: userId },
        data: {
          fullname,
          avatarUrl,
        },
      });
      if (oldUser?.avatarUrl) {
        const imageName = oldUser.avatarUrl.split('/').pop();
        let imagePath;
        if (imageName) {
          imagePath = join(
            __dirname,
            '..',
            '..',
            'public',
            'images',
            imageName,
          );
        }
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
      return updatedUser;
    }
    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        fullname,
      },
    });
  }
  async searchUsers(fullname: string, userId: string) {
    return this.prisma.user.findMany({
      where: {
        fullname: {
          contains: fullname,
        },
        id: {
          not: userId,
        },
      },
    });
  }
  async getUsersOfChatroom(chatroomId: number) {
    return await this.prisma.user.findMany({
      where: {
        chatRooms: {
          some: {
            id: chatroomId,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  async getUser(userId: number) {
    return await this.prisma.user.findUnique({
      where: { id: userId },
    });
  }
}
