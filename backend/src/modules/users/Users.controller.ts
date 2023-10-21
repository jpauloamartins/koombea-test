import { Body, Controller, Post } from '@nestjs/common';

import { Public } from '@guards/JWTAuthGuard';

import { SignInDTO } from './models/SignInDTO';
import { SignUpDTO } from './models/SignUpDTO';
import { UsersService } from './Users.service';

@Controller('users')
export class UsersController {
  constructor(protected userService: UsersService) {}

  @Public()
  @Post('sign-in')
  signIn(@Body() signInData: SignInDTO) {
    const { email, password } = signInData;

    return this.userService.signIn(email, password);
  }

  @Public()
  @Post('sign-up')
  signUp(@Body() signUpData: SignUpDTO) {
    const { email, password } = signUpData;

    return this.userService.signUp(email, password);
  }
}
