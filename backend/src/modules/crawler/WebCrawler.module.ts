import { Module } from '@nestjs/common';

import { WebCrawlerService } from './WebCrawler.service';
import { RegexScraper } from './scrapers/RegexScraper';
import { Scraper } from './scrapers/Scraper';

@Module({
  providers: [
    WebCrawlerService,
    {
      provide: Scraper,
      useClass: RegexScraper,
    },
  ],
  exports: [WebCrawlerService, Scraper],
})
export class WebCrawlerModule {}
