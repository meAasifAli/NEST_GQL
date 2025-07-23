import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateBookDto } from './create-book.dto';

import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateBookDto extends PartialType(CreateBookDto) {
  @Field(() => ID)
  @IsNotEmpty()
  id: string;
}
