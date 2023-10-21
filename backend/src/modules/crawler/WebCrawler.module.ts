import { Module } from '@nestjs/common';

import { WebCrawlerService } from './WebCrawler.service';

@Module({
  providers: [WebCrawlerService],
  exports: [WebCrawlerService],
})
export class WebCrawlerModule {}
