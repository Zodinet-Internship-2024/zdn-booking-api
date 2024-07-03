import { FieldService } from './../../field/services/field.service';
import { LocationService } from './../../location/location.service';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IsNull,
  LessThanOrEqual,
  MoreThanOrEqual,
  Not,
  Repository,
} from 'typeorm';

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
import { BookingStatus } from 'src/modules/booking/entities/booking.entity';
import dayjs from 'dayjs';
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
  convertTimeToSeconds = (timeString) => {
    if (!timeString) return null;
    const time = dayjs(timeString);
    const hours = time.hour();
    const minutes = time.minute();
    const seconds = time.second();
    return hours * 3600 + minutes * 60 + seconds;
  };

  async getSportFieldByTime(
    startTime: Date,
    endTime: Date,
    { limit, offset }: Pagination,
    sportFieldTypeId?: string,
  ): Promise<any> {
    const sportFieldType = this.getSportFieldQuery(sportFieldTypeId);
    const qb = this.sportFieldRepository
      .createQueryBuilder('sportField')
      .leftJoin('sportField.fields', 'field', 'field.deletedAt IS NULL')
      .leftJoin('field.bookings', 'booking', 'booking.deletedAt IS NULL')
      .where('sportField.deletedAt IS NULL')
      .andWhere((qb) => {
        const subQuery = qb
          .subQuery()
          .select('1')
          .from('booking', 'booking')
          .where('booking.fieldId = field.id')
          .andWhere('booking.deletedAt IS NULL')
          .andWhere('booking.status = :status', {
            status: BookingStatus.ACCEPTED,
          })
          .andWhere("booking.startTime >= :startTime at time zone '-07' ", {
            startTime,
          })
          .andWhere("booking.endTime <= :endTime at time zone '-07'", {
            endTime,
          })
          .andWhere(
            'EXTRACT(EPOCH FROM (booking.endTime - booking.startTime)) <= :duration',
            {
              duration:
                this.convertTimeToSeconds(endTime) -
                this.convertTimeToSeconds(startTime),
            },
          )
          .getQuery();

        return 'NOT EXISTS ' + subQuery;
      })
      .where(sportFieldType)
      .take(limit)
      .skip(offset)
      .groupBy('sportField.id');

    return await qb.getMany();
  }
}
