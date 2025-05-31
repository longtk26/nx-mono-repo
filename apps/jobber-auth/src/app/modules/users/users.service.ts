import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import {
  CreateUserRequestDto,
  CreateUserResponseDto,
} from './dto/create-user.dto';
import bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(data: CreateUserRequestDto): Promise<CreateUserResponseDto> {
    return this.userRepository.create({
      data: {
        email: data.email,
        password: await bcrypt.hash(data.password, 10),
      },
    });
  }

  async getUsers() {
    return this.userRepository.findAll({});
  }
}
