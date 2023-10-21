export interface ScreperResult {
  title: string;
  links: {
    url: string;
    label: string;
  }[];
}

export abstract class Scraper {
  abstract scrape(data: string): Promise<ScreperResult>;
}
