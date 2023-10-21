import { Injectable } from '@nestjs/common';

import { Scraper } from './Scraper';

@Injectable()
export class RegexScraper extends Scraper {
  async scrape(data: string) {
    const titleRegex = new RegExp('<title.*>(.*?)</title.*>', 'g');
    const titleMatch = titleRegex.exec(data);

    const linksRegex = new RegExp('<a.*?href="(.*?)".*?>(.*?)</a>', 'g');
    const linksMatches = data.matchAll(linksRegex);

    const links = [];

    for (const match of linksMatches) {
      links.push({
        url: match[1],
        label: match[2].replaceAll(/(<([^>]+)>)/gi, '').trim(),
      });
    }

    return {
      title: titleMatch[1].trim(),
      links,
    };
  }
}
