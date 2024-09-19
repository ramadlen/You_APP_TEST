import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { PrismaService } from '../common/prisma.service';
import { About, User } from '@prisma/client';
import {
  AboutResponse,
  CreateAboutRequest,
  SearchAboutRequest,
  UpdateAboutRequest,
} from '../model/about.model';
import { ValidationService } from '../common/validation.service';

import { WebResponse } from '../model/web.model';
import { AboutValidation } from './about.validation';

@Injectable()
export class AboutService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
    private validationService: ValidationService,
  ) {}

  async create(
    user: User,
    request: CreateAboutRequest,
  ): Promise<AboutResponse> {
    this.logger.debug(
      `ContactService.create(${JSON.stringify(user)}, ${JSON.stringify(request)})`,
    );
    const createRequest: CreateAboutRequest = this.validationService.validate(
      AboutValidation.CREATE,
      request,
    );

    const about = await this.prismaService.about.create({
      data: {
        ...createRequest,
        ...{ username: user.username },
      },
    });

    return this.toAboutResponse(about);
  }

  toAboutResponse(about: About): AboutResponse {
    return {
      Display_name: about.Display_name,
      Image_profile_zodiac: about.Image_profile_zodiac,
      Image_zodiac: about.Image_zodiac,
      Birthday: about.Birthday,
      Gender: about.Gender,
      Height: about.Height,
      Weight: about.Weight,
      id: about.id,
    };
  }

  async checkAboutMustExists(
    username: string,
    aboutId: string,
  ): Promise<About> {
    const about = await this.prismaService.about.findFirst({
      where: {
        username: username,
        id: aboutId,
      },
    });

    if (!about) {
      throw new HttpException('Contact is not found', 404);
    }

    return about;
  }

  async get(user: User, aboutId: string): Promise<AboutResponse> {
    const about = await this.checkAboutMustExists(user.username, aboutId);
    return this.toAboutResponse(about);
  }

  async update(
    user: User,
    request: UpdateAboutRequest,
  ): Promise<AboutResponse> {
    const updateRequest = this.validationService.validate(
      AboutValidation.UPDATE,
      request,
    );
    let about = await this.checkAboutMustExists(
      user.username,
      updateRequest.id,
    );

    about = await this.prismaService.about.update({
      where: {
        id: about.id,
        username: about.username,
      },
      data: updateRequest,
    });

    return this.toAboutResponse(about);
  }

  async remove(user: User, aboutId: string): Promise<AboutResponse> {
    await this.checkAboutMustExists(user.username, aboutId);

    const about = await this.prismaService.about.delete({
      where: {
        id: aboutId,
        username: user.username,
      },
    });

    return this.toAboutResponse(about);
  }

  async search(
    user: User,
    request: SearchAboutRequest,
  ): Promise<WebResponse<AboutResponse[]>> {
    const searchRequest: SearchAboutRequest = this.validationService.validate(
      AboutValidation.SEARCH,
      request,
    );

    const filters = [];

    if (searchRequest.Display_name) {
      // add name filter
      filters.push({
        OR: [
          {
            first_name: {
              contains: searchRequest.Display_name,
            },
          },
          {
            last_name: {
              contains: searchRequest.Display_name,
            },
          },
        ],
      });
    }

    if (searchRequest.Display_name) {
      // add email filter
      filters.push({
        email: {
          contains: searchRequest.Display_name,
        },
      });
    }

    const skip = (searchRequest.page - 1) * searchRequest.size;

    const about = await this.prismaService.about.findMany({
      where: {
        username: user.username,
        AND: filters,
      },
      take: searchRequest.size,
      skip: skip,
    });

    const total = await this.prismaService.about.count({
      where: {
        username: user.username,
        AND: filters,
      },
    });

    return {
      data: about.map((about) => this.toAboutResponse(about)),
      paging: {
        current_page: searchRequest.page,
        size: searchRequest.size,
        total_page: Math.ceil(total / searchRequest.size),
      },
    };
  }
}
