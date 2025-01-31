import { Test, TestingModule } from '@nestjs/testing';
import { LiveChatroomResolver } from './live-chatroom.resolver';
import { LiveChatroomService } from './live-chatroom.service';

describe('LiveChatroomResolver', () => {
  let resolver: LiveChatroomResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LiveChatroomResolver, LiveChatroomService],
    }).compile();

    resolver = module.get<LiveChatroomResolver>(LiveChatroomResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
