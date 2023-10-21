import { Module } from '@nestjs/common';

import { DatabaseModule } from '@modules/database/Database.module';

import { PagesController } from './Pages.controller';
import { PagesService } from './Pages.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PagesController],
  providers: [PagesService],
})
export class PagesModule {}
