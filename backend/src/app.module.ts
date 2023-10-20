import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from '@modules/database/Database.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
