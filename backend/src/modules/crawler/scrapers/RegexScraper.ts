import { Injectable } from '@nestjs/common';
import { pathOr } from 'ramda';

import { Scraper } from './Scraper';

@Injectable()
export class RegexScraper extends Scraper {
  scrape(data: string) {
    const titleRegex = new RegExp('<title.*>(.*?)</title.*>', 'gmis');
    const titleMatch = titleRegex.exec(data);

    const linksRegex = new RegExp('<a.*?href="(.*?)".*?>(.*?)</a>', 'gmis');
    const linksMatches = data.matchAll(linksRegex);

    const links = [];

    for (const match of linksMatches) {
      links.push({
        url: pathOr('', [1], match),
        label: pathOr('', [2], match)
          .replaceAll(/(<([^>]+)>)/gi, '')
          .trim(),
      });
    }

    return {
      title: pathOr('', [1], titleMatch).trim(),
      links,
    };
  }
}
