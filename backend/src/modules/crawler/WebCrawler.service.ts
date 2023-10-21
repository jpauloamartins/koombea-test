import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WebCrawlerService {
  async fetchPage(url: string): Promise<string> {
    const { data } = await axios.get(url);

    return data;
  }
}
