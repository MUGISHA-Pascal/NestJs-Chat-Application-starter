import { Field, ObjectType } from '@nestjs/graphql';
import { first } from 'rxjs';
import { User } from 'src/user/types/user.type';

@ObjectType()
export class RegisterResponse {
  @Field(() => User, { nullable: true })
  user?: User;
}
export class LoginResponse {
  @Field(() => User)
  user: User;
}
