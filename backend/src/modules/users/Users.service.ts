import { Injectable, NotFoundException } from '@nestjs/common';
import { hash, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { User } from '@models/User.entity';

@Injectable()
export class UsersService {
  constructor(protected jwtService: JwtService) {}

  getUser(id: string) {
    return User.findOneBy({ id });
  }

  async signIn(email: string, password: string) {
    const user = await User.findOneBy({ email });

    if (!user) {
      throw new NotFoundException('USER_NOT_FOUND');
    }

    const isValidPassword = await this.comparePassword(password, user.password);

    if (!isValidPassword) {
      throw new NotFoundException('USER_NOT_FOUND');
    }

    return this.generateToken(user);
  }

  async signUp(email: string, password: string) {
    const user = new User();
    user.email = email;
    user.password = await this.hashPassword(password);

    await user.save();

    return this.generateToken(user);
  }

  protected generateToken(user: User) {
    const payload = { email: user.email, sub: user.id };

    return {
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      }),
    };
  }

  protected hashPassword(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  protected comparePassword(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
