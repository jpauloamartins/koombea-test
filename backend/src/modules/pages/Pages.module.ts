import { Module } from '@nestjs/common';

import { DatabaseModule } from '@modules/database/Database.module';
import { WebCrawlerModule } from '@modules/crawler/WebCrawler.module';

import { PagesController } from './Pages.controller';
import { PagesService } from './Pages.service';

@Module({
  imports: [DatabaseModule, WebCrawlerModule],
  controllers: [PagesController],
  providers: [PagesService],
})
export class PagesModule {}
