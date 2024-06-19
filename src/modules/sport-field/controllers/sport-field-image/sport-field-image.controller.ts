import { API_BEARER_AUTH } from 'src/constants/constants';
import { SportFieldImageService } from './../../services/sport-field-image/sport-field-image.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'nest-keycloak-connect';
import { CreateSportFieldImageDto } from '../../dto/sport-field-image/create-sport-field-image.dto';
import { BaseResponse } from 'src/common/response/base.response';

@ApiTags('sport-field-image')
@ApiBearerAuth(API_BEARER_AUTH)
@Public()
@Controller('sport-field-image')
export class SportFieldImageController {
  constructor(
    private readonly sportFieldImageService: SportFieldImageService,
  ) {}

  @Post()
  async createSportFieldImage(
    @Body() createSportFieldImageDto: CreateSportFieldImageDto,
  ): Promise<BaseResponse> {
    const res = await this.sportFieldImageService.createSportFieldImage(
      createSportFieldImageDto,
    );
    if (!res) {
      return new BaseResponse(
        [],
        'sport_field_image_not_created',
        400,
        new Date().toString(),
      );
    }
    return new BaseResponse(
      [res],
      'sport_field_image_created',
      201,
      new Date().toString(),
    );
  }
}
