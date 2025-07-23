import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from '../models/book.model';
import { User, UserSchema } from 'src/models/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Book.name,
        schema: BookSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [BookService],
  exports: [BookService],
})
export class BookModule {}
