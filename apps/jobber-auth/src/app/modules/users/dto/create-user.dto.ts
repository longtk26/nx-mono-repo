import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsStrongPassword } from 'class-validator';

@InputType()
export class CreateUserRequestDto {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsStrongPassword()
  password: string;
}

@InputType()
export class CreateUserResponseDto {
  @Field()
  id: string;

  @Field()
  email: string;
}
