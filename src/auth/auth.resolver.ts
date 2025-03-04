import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { CreateAuthInput } from './dto/create-auth.input';
import { UpdateAuthInput } from './dto/update-auth.input';
import { BadRequestException, UseFilters } from '@nestjs/common';
import { GraphQlExceptionHandler } from 'src/filter/custom-exception.filter';
import { LoginResponse, RegisterResponse } from './types';
import { LoginDTO, RegisterDTO } from './dto/auth.dto';
import { Request, Response } from 'express';
@UseFilters(GraphQlExceptionHandler)
@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @Mutation(() => RegisterResponse)
  async register(
    @Args('registerInput') registerDto: RegisterDTO,
    @Context() context: { res: Response },
  ) {
    if (registerDto.password !== registerDto.confirmPassword) {
      throw new BadRequestException({
        confirmPassword: 'password and confirm password are not the same',
      });
    }
    const { user } = await this.authService.register(registerDto, context.res);
    return { user };
  }
  @Mutation(() => LoginResponse)
  async login(
    @Args('loginInput') loginDto: LoginDTO,
    @Context() context: { res: Response },
  ) {
    return this.authService.login(loginDto, context.res);
  }
  @Mutation(() => {
    String;
  })
  async logout(@Context() context: { res: Response }) {
    return this.authService.logout(context.res);
  }
  @Mutation(() => {
    String;
  })
  async refreshToken(@Context() context: { req: Request; res: Response }) {
    try {
      return this.authService.refreshToken(context.req, context.res);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
