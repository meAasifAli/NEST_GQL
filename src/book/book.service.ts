import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from 'src/models/book.model';
import { Model } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { User } from 'src/models/user.model';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createBook(data: CreateBookDto, id: string): Promise<Book> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException('user not found');
    const newBook = new this.bookModel({
      ...data,
      author: user._id,
    });
    const book = await newBook.save();

    return await book.populate('author');
  }

  async getBooks(id: string): Promise<Book[]> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException('user not found');
    return await this.bookModel.find().populate('author').exec();
  }

  async getBookById(id: string, userId: string): Promise<Book | null> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) throw new NotFoundException('user not found');
    const book = (await this.bookModel.findById(id).exec()) as Book;
    if (!book) throw new NotFoundException(`book with id:${id} doesn't exist`);
    return await this.bookModel.findById(id).populate('author').exec();
  }

  async updateBook(data: UpdateBookDto) {
    const book = await this.bookModel.findById(data.id);
    if (!book) throw new NotFoundException('book not found');
    Object.assign(book, data);
    return (await book.save()).populate('author');
  }

  async remove(id: string): Promise<any> {
    const book = await this.bookModel.findById(id);
    if (!book) throw new NotFoundException('book not found');
    await book.deleteOne();

    return 'Book has been deleted successfully';
  }
}
