import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateBookDto {
  @IsString()
  @Field()
  @IsNotEmpty()
  title: string;

  @IsString()
  @Field({ nullable: true })
  desc?: string;

  @IsString()
  @Field({ nullable: true })
  @IsOptional()
  author?: string;
}
