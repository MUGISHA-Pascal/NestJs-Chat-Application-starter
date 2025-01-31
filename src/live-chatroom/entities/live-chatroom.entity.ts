import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class LiveChatroom {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
