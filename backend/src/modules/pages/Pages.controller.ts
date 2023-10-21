import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

import { CurrentUser } from '@lib/params/CurrentUser';
import { Page } from '@models/Page.entity';
import { User } from '@models/User.entity';

import { ScrapeDTO } from './models/ScrapeDTO';
import { PagesService } from './Pages.service';

@Controller('pages')
export class PagesController {
  constructor(protected pagesService: PagesService) {}

  @Get()
  async listPages(
    @CurrentUser() user: User,
    @Query('take') take: number,
    @Query('skip') skip: number,
  ) {
    take = take || 5;
    skip = skip || 0;

    const [rows, total] = await Page.findAndCount({
      where: { userId: user.id },
      take,
      skip,
    });

    return { rows, total };
  }

  @Get(':id')
  listPageLinks(@Param('id') pageId: string, @CurrentUser() user: User) {
    return Page.findOne({
      where: { id: pageId, userId: user.id },
      relations: ['links'],
    });
  }

  @Post()
  scrapePage(@CurrentUser() user: User, @Body() scrapeData: ScrapeDTO) {
    const { url } = scrapeData;

    return this.pagesService.scrapePage(user, url);
  }
}
