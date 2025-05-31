import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { UserRepository } from './users.repository';

@Module({
  providers: [UsersResolver, UsersService, UserRepository],
  exports: [UsersService, UsersResolver, UserRepository],
})
export class UsersModule {}
