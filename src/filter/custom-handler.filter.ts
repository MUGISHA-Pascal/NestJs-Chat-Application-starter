import { BadRequestException, Catch } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';
@Catch(BadRequestException)
export class GraphQlExceptionHandler implements GqlExceptionFilter {
  catch(exception: BadRequestException) {
    const response = exception.getResponse();
    if (typeof response === 'object') {
      throw new ApolloError('validation error', 'VALIDATION_ERROR', response);
    } else {
      throw new ApolloError('bad request');
    }
  }
}
