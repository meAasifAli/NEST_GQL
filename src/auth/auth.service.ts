import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/models/user.model';
import { SignupDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signupUser(data: SignupDto) {
    const newUser = new this.userModel(data);

    const user = await newUser.save();

    const hash = await bcrypt.hash(user.password, 10);

    user.password = hash;

    const payload = { sub: user._id };

    const token = this.jwtService.sign(payload);

    user.accessToken = token;

    await user.save();

    return { user, token };
  }

  async loginUser(data: LoginDto) {
    const user = await this.userModel.findOne({ email: data.email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new NotFoundException('Invalid Credentials');
    }

    const payload = { sub: user._id };

    const token = this.jwtService.sign(payload);
    user.accessToken = token;

    await user.save();

    return { user, token };
  }
}
