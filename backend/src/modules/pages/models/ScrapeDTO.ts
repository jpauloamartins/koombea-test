import { IsUrl } from 'class-validator';

export class ScrapeDTO {
  @IsUrl()
  url: string;
}
