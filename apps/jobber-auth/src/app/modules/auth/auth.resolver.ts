import { Mutation, Resolver } from '@nestjs/graphql';
import { LoginModel } from './models/login.models';

@Resolver()
export class AuthResolver {
  @Mutation(() => LoginModel, { name: 'login' })
  async login() {}
}
