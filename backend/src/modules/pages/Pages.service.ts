import { Injectable } from '@nestjs/common';

import { User } from '@models/User.entity';
import { Page, PageScrapeStatus } from '@models/Page.entity';
import { PageLink } from '@models/PageLink.entity';
import { WebCrawlerService } from '@modules/crawler/WebCrawler.service';
import { Scraper } from '@modules/crawler/scrapers/Scraper';

@Injectable()
export class PagesService {
  constructor(
    protected webCrawlerService: WebCrawlerService,
    protected scraper: Scraper,
  ) {}

  async scrapePage(user: User, url: string) {
    const page = new Page();
    page.url = url;
    page.user = user;

    await page.save();

    this.processPage(page);

    return page;
  }

  protected async processPage(page: Page) {
    try {
      const data = await this.webCrawlerService.fetchPage(page.url);

      const { title, links } = await this.scraper.scrape(data);

      const linksPromises = links.map((_link) => {
        const link = new PageLink();
        link.url = _link.url;
        link.label = _link.label;
        link.page = page;

        return link.save();
      });

      page.title = title;
      page.status = PageScrapeStatus.SCRAPED;
      page.linksCount = links.length;

      await Promise.all([...linksPromises, page.save()]);
    } catch {
      page.status = PageScrapeStatus.ERROR;
      await page.save();
    }
  }
}
