import { FieldService } from './../../field/services/field.service';
import { LocationService } from './../../location/location.service';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';

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
  getSportFieldQuery(sportFieldId: string) {
    return sportFieldId ? { id: sportFieldId } : {};
  }
  async getSportFields(
    { limit, offset }: Pagination,
    filter?: Filtering,
    sportFieldTypeId?: string,
    startTime?: string,
    endTime?: string,
    location?: string,
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

  async getSportFieldsWithFilter(filter: any) {
    const query = await this.sportFieldRepository
      .createQueryBuilder('sportField')
      .innerJoinAndSelect('sportField.location', 'location');

    if (
      filter.location !== undefined &&
      filter.location !== null &&
      filter.location !== ''
    ) {
      const { long, lat } = JSON.parse(filter.location);
      console.log('long', long, 'lat', lat);
      query.addSelect(
        `earth_distance(
        ll_to_earth(location.latitude, location.longitude),
        ll_to_earth(:lat, :long)
      ) `,
        'distance_meters',
      );
      query.setParameters({ lat, long });
    }

    if (filter.name) {
      query.andWhere('sportField.name ILIKE :name', {
        name: `%${filter.name}%`,
      });
    }

    if (filter.date !== undefined) {
      query.andWhere("DATE(sportField.startTime AT TIME ZONE 'UTC+7') = :day", {
        day: filter.date,
      });
    }

    if (filter.startTime && filter.endTime) {
      query.andWhere("TO_CHAR(sportField.startTime, 'HH24:MI') >= :startTime", {
        startTime: filter.startTime,
      });
      query.andWhere("TO_CHAR(sportField.startTime, 'HH24:MI') <= :endTime", {
        endTime: filter.endTime,
      });
      query.andWhere("TO_CHAR(sportField.endTime, 'HH24:MI') <= :endTime", {
        endTime: filter.endTime,
      });
    }

    if (filter.type && filter.type !== '' && filter.type !== 'all') {
      query.andWhere('sportField.sportFieldTypeId = :type', {
        type: filter.type,
      });
    }

    if (
      filter.query !== undefined &&
      filter.query !== null &&
      filter.query !== ''
    ) {
      const userQuery = JSON.parse(filter.query);

      if (userQuery.name) {
        query.andWhere('sportField.name ILIKE :name', {
          name: `%${userQuery.name}%`,
        });
      }

      // if (userQuery.date !== undefined && userQuery.date !== '') {
      //   query.andWhere(
      //     "DATE(sportField.startTime AT TIME ZONE 'UTC+7') = :day",
      //     {
      //       day: userQuery.date,
      //     },
      //   );
      // }

      if (userQuery.startTime && userQuery.endTime) {
        query.andWhere(
          "TO_CHAR(sportField.startTime, 'HH24:MI') >= :startTime",
          {
            startTime: userQuery.startTime,
          },
        );
        query.andWhere("TO_CHAR(sportField.startTime, 'HH24:MI') <= :endTime", {
          endTime: userQuery.endTime,
        });
        query.andWhere("TO_CHAR(sportField.endTime, 'HH24:MI') <= :endTime", {
          endTime: userQuery.endTime,
        });
      }

      if (userQuery.distanceOrder && userQuery.distanceOrder !== '') {
        if (
          filter.location !== undefined &&
          filter.location !== null &&
          filter.location !== ''
        ) {
          query.orderBy('distance_meters', userQuery.distanceOrder);
        }
      }
    }

    const total = await query.getCount();

    if (filter.page !== undefined && filter.limit !== undefined) {
      query.take(filter.limit);
      query.skip(filter.page * filter.limit);
    }

    query
      .innerJoinAndSelect('sportField.sportFieldImages', 'sportFieldImages')
      .innerJoinAndSelect('sportField.sportFieldType', 'sportFieldType');

    if (
      filter.query !== undefined &&
      filter.query !== null &&
      filter.query !== ''
    ) {
      const userQuery = JSON.parse(filter.query);
      if (userQuery.priceOrder && userQuery.priceOrder !== '') {
        query.orderBy('sportField.price', userQuery.priceOrder);
      }
    }

    const rawAndEntities = await query.getRawAndEntities();
    const { entities, raw } = rawAndEntities;

    const sportFields = entities.map((entity, index) => {
      const rawItem = raw.find((item) => item.sportField_id === entity.id);
      if (rawItem) {
        return {
          ...entity,
          distanceMeters: rawItem.distance_meters,
        };
      } else {
        return entity;
      }
    });
    return new BaseResponse(
      sportFields,
      'sport_field_found',
      200,
      new Date().toString(),
      Math.ceil(total / filter.limit),
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
    const getSportField = await this.sportFieldRepository.findOne({
      where: { id: id, ownerId: sportField.updatedBy },
    });

    if (!getSportField) {
      return null;
    }

    const updatedSportField: SportFieldEntity = await this.update(
      id,
      { where: { id: id } },
      sportField,
    );
    return this.mapper.map(
      updatedSportField,
      SportFieldEntity,
      ReadSportFieldDto,
    );
  }

  async deleteSportField(id: string): Promise<any> {
    console.log(123, id);
    // const sportField: SportFieldEntity = await this.delete(id, {
    //   where: { id: id, deletedAt: Not(IsNull()) },
    // });
    // console.log(sportField);
    // return this.mapper.map(sportField, SportFieldEntity, ReadSportFieldDto);
    const res = await this.sportFieldRepository.softDelete(id);
    if (res.affected === 0) {
      return null;
    }
    return { message: 'Sport field deleted successfully' };
  }
}
