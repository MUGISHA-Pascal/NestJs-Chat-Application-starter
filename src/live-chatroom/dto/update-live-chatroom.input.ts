import { CreateLiveChatroomInput } from './create-live-chatroom.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateLiveChatroomInput extends PartialType(CreateLiveChatroomInput) {
  @Field(() => Int)
  id: number;
}
