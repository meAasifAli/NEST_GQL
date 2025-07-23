import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Book } from './book.model';

@Schema()
@ObjectType()
export class User extends Document {
  @Field(() => ID)
  declare readonly _id: string;

  @Prop({ required: true })
  @Field()
  name: string;

  @Prop()
  @Field()
  email: string;

  @Prop()
  @Field()
  password: string;

  @Prop({ default: null })
  @Field({ nullable: true })
  accessToken?: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Book' }] })
  @Field(() => [Book], { nullable: 'itemsAndList' })
  books: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
