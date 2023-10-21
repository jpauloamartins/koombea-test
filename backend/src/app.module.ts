import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { JWTAuthGuard } from '@lib/guards/JWTAuthGuard';
import { DatabaseModule } from '@modules/database/Database.module';
import { UsersModule } from '@modules/users/Users.module';
import { PagesModule } from '@modules/pages/Pages.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, UsersModule, PagesModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JWTAuthGuard,
    },
  ],
})
export class AppModule {}
