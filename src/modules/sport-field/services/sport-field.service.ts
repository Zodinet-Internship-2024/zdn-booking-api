import { FieldService } from './../../field/services/field.service';
import { LocationService } from './../../location/location.service';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from 'src/common/service/base.service';
import { Filtering } from 'src/decorators/filter.decorator';
import { Pagination } from 'src/decorators/pagination.decorator';
import { getWhere } from 'src/helpers/typeorm.helper';
import { CreateSportFieldDto } from '../dto/create-sport-field.dto';
import { ReadSportFieldDto } from '../dto/read-sport-field.dto';
import { UpdateSportFieldDto } from '../dto/update-sport-field.dto';
import { SportFieldEntity } from '../entities/sport-field.entity';
import { SportFieldImageService } from './sport-field-image/sport-field-image.service';
import { GetSportFieldDto } from '../dto/get-sport-field.dto';
import { BaseResponse } from 'src/common/response/base.response';

@Injectable()
export class SportFieldService extends BaseService<SportFieldEntity> {
  constructor(
    @InjectRepository(SportFieldEntity)
    private readonly sportFieldRepository: Repository<SportFieldEntity>,
    @InjectMapper()
    private readonly mapper: Mapper,
    private readonly fieldService: FieldService,
    private readonly sportFieldImageService: SportFieldImageService,
    private readonly locationService: LocationService,
  ) {
    super(sportFieldRepository);
  }

  getSportFieldQuery(sportFieldId: string) {
    return sportFieldId ? { id: sportFieldId } : {};
  }

  async getUserSportFields(
    userId: string,
    { limit, offset }: Pagination,
    sportFieldTypeId?: string,
  ): Promise<GetSportFieldDto[]> {
    const sportFieldType = this.getSportFieldQuery(sportFieldTypeId);
    const sportFields: SportFieldEntity[] =
      await this.sportFieldRepository.find({
        where: { ownerId: userId, sportFieldType },
        relations: {
          sportFieldImages: true,
          location: true,
          sportFieldType: true,
        },
        take: limit,
        skip: offset,
      });

    return this.mapper.mapArray(
      sportFields,
      SportFieldEntity,
      GetSportFieldDto,
    );
  }

  async getSportFields(
    { limit, offset }: Pagination,
    filter?: Filtering,
    sportFieldTypeId?: string,
  ) {
    const where = getWhere(filter);
    const sportFieldType = this.getSportFieldQuery(sportFieldTypeId);

    const [sportFields, total]: [SportFieldEntity[], number] =
      await this.sportFieldRepository.findAndCount({
        where: {
          ...where,
          sportFieldType,
        },
        relations: {
          sportFieldImages: true,
          location: true,
          sportFieldType: true,
        },
        take: limit,
        skip: offset,
      });

    const totalPage = Math.ceil(total / limit);

    const getSportFieldDto = this.mapper.mapArray(
      sportFields,
      SportFieldEntity,
      GetSportFieldDto,
    );

    return new BaseResponse(
      getSportFieldDto,
      'sport_field_found',
      200,
      new Date().toString(),
      totalPage,
    );
  }

  async createSportField(
    createSportFieldDto: CreateSportFieldDto,
  ): Promise<ReadSportFieldDto> {
    const sportField: SportFieldEntity = this.mapper.map(
      createSportFieldDto,
      CreateSportFieldDto,
      SportFieldEntity,
    );
    const createdSportField: SportFieldEntity = await this.create(sportField);

    return this.mapper.map(
      createdSportField,
      SportFieldEntity,
      ReadSportFieldDto,
    );
  }

  async findSportFieldById(id: string): Promise<ReadSportFieldDto> {
    const sportField: SportFieldEntity = await this.findOne({
      where: { id },
      relations: ['fields', 'location', 'sportFieldType', 'sportFieldImages'],
    });
    return this.mapper.map(sportField, SportFieldEntity, ReadSportFieldDto);
  }

  async updateSportField(
    id: string,
    updateSportFieldDto: Partial<UpdateSportFieldDto>,
  ): Promise<ReadSportFieldDto> {
    const sportField: SportFieldEntity = this.mapper.map(
      updateSportFieldDto,
      UpdateSportFieldDto,
      SportFieldEntity,
    );
    const updatedSportField: SportFieldEntity = await this.update(
      id,
      { where: { id } },
      sportField,
    );
    return this.mapper.map(
      updatedSportField,
      SportFieldEntity,
      ReadSportFieldDto,
    );
  }

  async deleteSportField(id: string): Promise<ReadSportFieldDto> {
    const sportField: SportFieldEntity = await this.delete(id, {
      where: { id },
    });

    return this.mapper.map(sportField, SportFieldEntity, ReadSportFieldDto);
  }
}
