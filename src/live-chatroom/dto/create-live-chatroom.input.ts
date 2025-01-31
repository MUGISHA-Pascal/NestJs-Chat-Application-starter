import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateLiveChatroomInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
