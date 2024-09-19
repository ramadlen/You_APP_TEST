import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { Auth } from '../common/auth.decorator';
import { User } from '@prisma/client';
import {
  AboutResponse,
  CreateAboutRequest,
  SearchAboutRequest,
  UpdateAboutRequest,
} from '../model/about.model';
import { WebResponse } from '../model/web.model';
import { AboutService } from './about.service';

@Controller('/api/profile')
export class ContactController {
  constructor(private aboutService: AboutService) {}

  @Post()
  @HttpCode(200)
  async create(
    @Auth() user: User,
    @Body() request: CreateAboutRequest,
  ): Promise<WebResponse<AboutResponse>> {
    const result = await this.aboutService.create(user, request);
    return {
      data: result,
    };
  }

  @Get('/:profileId')
  @HttpCode(200)
  async get(
    @Auth() user: User,
    @Param('profileId', ParseIntPipe) aboutId: string,
  ): Promise<WebResponse<AboutResponse>> {
    const result = await this.aboutService.get(user, aboutId);
    return {
      data: result,
    };
  }

  @Put('/:profileId')
  @HttpCode(200)
  async update(
    @Auth() user: User,
    @Param('contactId', ParseIntPipe) aboutId: string,
    @Body() request: UpdateAboutRequest,
  ): Promise<WebResponse<AboutResponse>> {
    request.id = aboutId;
    const result = await this.aboutService.update(user, request);
    return {
      data: result,
    };
  }

  @Delete('/:profileId')
  @HttpCode(200)
  async remove(
    @Auth() user: User,
    @Param('profileId', ParseIntPipe) aboutId: string,
  ): Promise<WebResponse<boolean>> {
    await this.aboutService.remove(user, aboutId);
    return {
      data: true,
    };
  }

  @Get()
  @HttpCode(200)
  async search(
    @Auth() user: User,
    @Query('username') username?: string,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('size', new ParseIntPipe({ optional: true })) size?: number,
  ): Promise<WebResponse<AboutResponse[]>> {
    const request: SearchAboutRequest = {
      Display_name: username,
      page: page || 1,
      size: size || 10,
    };
    return this.aboutService.search(user, request);
  }
}
