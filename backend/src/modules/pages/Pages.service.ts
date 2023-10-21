import { Injectable } from '@nestjs/common';
import axios from 'axios';

import { User } from '@models/User.entity';
import { Page, PageScrapeStatus } from '@models/Page.entity';
import { PageLink } from '@models/PageLink.entity';

@Injectable()
export class PagesService {
  async scrapePage(user: User, url: string) {
    const page = new Page();
    page.url = url;
    page.user = user;

    await page.save();

    this.processPage(page);

    return page;
  }

  protected async processPage(page: Page) {
    const { data } = await axios.get(page.url);

    const titleRegex = new RegExp('<title>(.*?)</title>', 'g');
    const titleMatch = titleRegex.exec(data);

    const linksRegex = new RegExp('<a.*?href="(.*?)".*?>(.*?)</a>', 'g');
    const linksMatches = data.matchAll(linksRegex);

    const links = [];

    for (const match of linksMatches) {
      const link = new PageLink();
      link.url = match[1];
      link.label = match[2].replaceAll(/(<([^>]+)>)/gi, '').trim();
      link.page = page;

      await link.save();

      links.push(link);
    }

    page.title = titleMatch[1].trim();
    page.status = PageScrapeStatus.SCRAPED;
    page.linksCount = links.length;

    await page.save();
  }
}
