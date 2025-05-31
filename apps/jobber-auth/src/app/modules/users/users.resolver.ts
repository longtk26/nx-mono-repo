import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { CreateUserRequestDto } from './dto/create-user.dto';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService // This should be the actual service, e.g., UsersService
  ) {}

  @Mutation(() => User, { name: 'createUser' })
  async createUser(
    @Args('createUserRequestDto') createUserRequestDto: CreateUserRequestDto
  ) {
    return this.usersService.createUser(createUserRequestDto);
  }

  @Query(() => [User], { name: 'users' })
  async getUsers() {
    return this.usersService.getUsers();
  }
}
