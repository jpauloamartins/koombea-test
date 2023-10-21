export enum IPageScrapeStatus {
  SCRAPING = 'SCRAPING',
  SCRAPED = 'SCRAPED',
  ERROR = 'ERROR',
}

export interface IPageLink {
  id: string;
  url: string;
  label: string;
}

export interface IPage {
  id: string;
  url: string;
  title?: string;
  links: IPageLink[];
  linksCount: number;
  status: IPageScrapeStatus;
}
