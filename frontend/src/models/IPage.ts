export enum IPageScrapeStatus {
  SCRAPING = 'SCRAPING',
  SCRAPED = 'SCRAPED',
  ERROR = 'ERROR',
}

export interface IPage {
  id: string;
  url: string;
  title?: string;
  linksCount: number;
  status: IPageScrapeStatus;
}
