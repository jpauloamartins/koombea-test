import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { DatabaseModule } from '@modules/database/Database.module';

import { UsersController } from './Users.controller';
import { UsersService } from './Users.service';
import { JwtStrategy } from './JWT.strategy';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secretOrPrivateKey: process.env.JWT_ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
})
export class UsersModule {}
