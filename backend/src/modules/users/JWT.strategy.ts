import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UsersService } from './Users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(protected usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
    });
  }

  async validate(payload: any) {
    const account = await this.usersService.getUser(payload.sub);

    delete account.password;

    return account;
  }
}
