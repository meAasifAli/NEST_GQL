/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BookService } from 'src/book/book.service';
import { CreateBookDto } from 'src/book/dto/create-book.dto';
import { UpdateBookDto } from 'src/book/dto/update-book.dto';
import { Book } from 'src/models/book.model';
import { GqlAuthGuard } from 'src/guards/auth/auth.guard';
import { CurrentUser } from 'src/decorators/user.decorator';
import { User } from 'src/models/user.model';

@Resolver(() => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Query(() => [Book], { name: 'books' })
  @UseGuards(GqlAuthGuard)
  async getAllBooks(@CurrentUser() user: User) {
    return this.bookService.getBooks(user?.id!);
  }

  @Query(() => Book, { name: 'book' })
  @UseGuards(GqlAuthGuard)
  async getBookById(
    @Args('id', { type: () => String }) id: string,
    @CurrentUser() user: User,
  ) {
    return this.bookService.getBookById(id, user.id);
  }

  @Mutation(() => Book)
  @UseGuards(GqlAuthGuard)
  async createBook(
    @Args('data') data: CreateBookDto,
    @CurrentUser() user: User,
  ) {
    return this.bookService.createBook(data, user.id);
  }

  @Mutation(() => Book)
  @UseGuards(GqlAuthGuard)
  async UpdateBook(@Args('data') data: UpdateBookDto) {
    return this.bookService.updateBook(data);
  }
  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  async deleteBook(@Args('id', { type: () => String }) id: string) {
    return this.bookService.remove(id);
  }
}
