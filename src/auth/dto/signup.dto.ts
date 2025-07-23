import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class SignupDto {
  @IsString()
  @IsNotEmpty()
  @Field()
  name: string;

  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  password: string;
}
