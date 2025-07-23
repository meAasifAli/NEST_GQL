import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from 'src/auth/auth.service';
import { AuthResponse } from 'src/auth/dto/auth-response.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import { SignupDto } from 'src/auth/dto/signup.dto';
import { User } from 'src/models/user.model';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async signup(@Args('data') data: SignupDto) {
    return this.authService.signupUser(data);
  }

  @Mutation(() => AuthResponse)
  async login(@Args('data') data: LoginDto) {
    return this.authService.loginUser(data);
  }
}
