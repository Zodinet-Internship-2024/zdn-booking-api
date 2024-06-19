import { LocationService } from './../../location/location.service';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

import { BaseService } from 'src/common/service/base.service';
import { CreateSportFieldDto } from '../dto/create-sport-field.dto';
import { UpdateSportFieldDto } from '../dto/update-sport-field.dto';
import { SportFieldEntity } from '../entities/sport-field.entity';
import { ReadSportFieldDto } from '../dto/read-sport-field.dto';
import { SportFieldImageService } from './sport-field-image/sport-field-image.service';
import { CreateLocationDto } from 'src/modules/location/dto/create-location.dto';
import { CreateSportFieldImageDto } from '../dto/sport-field-image/create-sport-field-image.dto';
import { UploadImageDto } from 'src/common/dto/upload-image.dto';

@Injectable()
export class SportFieldService extends BaseService<SportFieldEntity> {
  constructor(
    @InjectRepository(SportFieldEntity)
    private readonly sportFieldRepository: Repository<SportFieldEntity>,
    @InjectMapper()
    private readonly mapper: Mapper,
    private readonly sportFieldImageService: SportFieldImageService,
    private readonly locationService: LocationService,
  ) {
    super(sportFieldRepository);
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

    createSportFieldDto.sportFieldImages?.map(async (image) => {
      const sportFieldImage: CreateSportFieldImageDto = {
        sportField: createdSportField.id,
        ...image,
        createdBy: createSportFieldDto.createdBy,
      };
      await this.sportFieldImageService.createSportFieldImage(sportFieldImage);
    });

    if (createSportFieldDto.location) {
      await this.locationService.create({
        sportField: createdSportField.id,
        ...(createSportFieldDto.location as CreateLocationDto),
      });
    }

    return this.mapper.map(
      createdSportField,
      SportFieldEntity,
      ReadSportFieldDto,
    );
  }

  async findSportFieldById(id: string): Promise<ReadSportFieldDto> {
    const sportField: SportFieldEntity = await this.findOne({ where: { id } });
    return this.mapper.map(sportField, SportFieldEntity, ReadSportFieldDto);
  }

  async updateSportField(
    id: string,
    updateSportFieldDto: UpdateSportFieldDto,
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
}
