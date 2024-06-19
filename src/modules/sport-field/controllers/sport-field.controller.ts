/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { API_BEARER_AUTH } from 'src/constants/constants';

import { SportFieldService } from '../services/sport-field.service';

import { CreateSportFieldDto } from '../dto/create-sport-field.dto';
import { UpdateSportFieldDto } from '../dto/update-sport-field.dto';
import { BaseResponse } from 'src/common/response/base.response';
import { Public } from 'nest-keycloak-connect';

@ApiTags('sport-field')
@Controller('sport-field')
@ApiBearerAuth(API_BEARER_AUTH)
@Public()
export class SportFieldController {
  constructor(private readonly sportFieldService: SportFieldService) {}

  @Post()
  async createSportField(
    @Body() createSportFieldDto: CreateSportFieldDto,
  ): Promise<BaseResponse> {
    const res =
      await this.sportFieldService.createSportField(createSportFieldDto);
    if (!res) {
      return new BaseResponse(
        [],
        'sport_field_not_created',
        400,
        new Date().toString(),
      );
    }
    return new BaseResponse(
      [res],
      'sport_field_created',
      201,
      new Date().toString(),
    );
  }

  // @Post()
  // async create(@Body() createSportFieldDto: CreateSportFieldDto) {
  //   return this.sportFieldService.create(createSportFieldDto);
  // }

  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   return this.sportFieldService.findOne(id);
  // }

  // @Patch(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateSportFieldDto: UpdateSportFieldDto,
  // ) {
  //   return this.sportFieldService.update(+id, updateSportFieldDto);
  // }

  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   return this.sportFieldService.remove(id);
  // }
}
