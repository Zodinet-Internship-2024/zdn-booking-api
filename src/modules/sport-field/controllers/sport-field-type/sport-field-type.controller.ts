import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'nest-keycloak-connect';

import { API_BEARER_AUTH } from 'src/constants/constants';
import { BaseResponse } from 'src/common/response/base.response';
import { SportFieldTypeService } from '../../services/sport-field-type/sport-field-type.service';
import { CreateSportFieldTypeDto } from '../../dto/sport-field-type/create-sport-field-type.dto';

@ApiTags('sport-field-type')
@ApiBearerAuth(API_BEARER_AUTH)
@Public()
@Controller('sport-field-type')
export class SportFieldTypeController {
  constructor(private readonly sportFieldTypeSerive: SportFieldTypeService) {}

  @Post()
  async createSportFieldType(
    @Body() createSportFieldTypeDto: CreateSportFieldTypeDto,
  ): Promise<BaseResponse> {
    const res = await this.sportFieldTypeSerive.createSportFieldType(
      createSportFieldTypeDto,
    );
    if (!res) {
      return new BaseResponse(
        [],
        'sport_field_type_not_created',
        400,
        new Date().toString(),
      );
    }
    return new BaseResponse(
      [res],
      'sport_field_type_created',
      201,
      new Date().toString(),
    );
  }
}
