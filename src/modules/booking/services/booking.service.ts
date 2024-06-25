/* eslint-disable @typescript-eslint/no-unused-vars */
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/service/base.service';
import { FieldEntity } from 'src/modules/field/entities/field.entity';
import { SportFieldEntity } from 'src/modules/sport-field/entities/sport-field.entity';
import { UpdateStatusBookingDto } from '../dto/update-status-booking.dto';
import { ReadUserDTO } from 'src/modules/user/dto/read-user-dto';
import {
  In,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { CreateBookingDto } from '../dto/create-booking.dto';
import { ReadBookingDto } from '../dto/read-booking.dto';
import { BookingEntity, BookingStatus } from '../entities/booking.entity';

@Injectable()
export class BookingService extends BaseService<BookingEntity> {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingRepository: Repository<BookingEntity>,
    @InjectRepository(SportFieldEntity)
    private readonly sportFieldRepository: Repository<SportFieldEntity>,
    @InjectRepository(FieldEntity)
    private readonly fieldRepository: Repository<FieldEntity>,
    @InjectMapper()
    public readonly mapper: Mapper,
  ) {
    super(bookingRepository);
  }

  async createBooking(user: ReadUserDTO, createBookingDto: CreateBookingDto) {
    const field = await this.fieldRepository.findOne({
      where: { id: createBookingDto.fieldId },
    });

    if (!field) {
      throw new NotFoundException('Field not found');
    }

    const { id, ...userInfo } = user;

    const newBooking = await this.bookingRepository.save({
      ...userInfo,
      ...createBookingDto,
      status: BookingStatus.BOOKING,
      field,
      fullName: user.name,
      createdBy: user.id,
      updatedBy: user.id,
    });

    return newBooking;
  }

  private async validateFieldAccess(
    userId: string,
    fieldId: string,
  ): Promise<void> {
    const field = await this.fieldRepository.findOne({
      where: { id: fieldId },
    });

    if (!field) {
      throw new NotFoundException('Field not found');
    }

    if (field.createdBy !== userId) {
      throw new ForbiddenException(
        'You do not have permission to view bookings',
      );
    }
  }

  async getBookingsByFieldId(
    user: ReadUserDTO,
    readBookingDto: ReadBookingDto,
  ) {
    this.validateFieldAccess(user.id, readBookingDto.fieldId);
    const query = this.buildBaseQuery(readBookingDto);
    this.applyStatusFilter(query, readBookingDto.status);
    return query.getMany();
  }

  private buildBaseQuery(readBookingDto: ReadBookingDto) {
    const { fieldId, startTime, endTime } = readBookingDto;
    return this.bookingRepository
      .createQueryBuilder('booking')
      .innerJoinAndSelect('booking.field', 'field')
      .where('field.id = :fieldId', { fieldId })
      .andWhere("booking.startTime >= :startTime at time zone '-07'", {
        startTime,
      })
      .andWhere("booking.endTime <= :endTime at time zone '-07'", { endTime });
  }

  private applyStatusFilter(
    query: SelectQueryBuilder<BookingEntity>,
    status?: string[],
  ) {
    if (status && status.length > 0) {
      query.andWhere('booking.status IN (:...status)', { status });
    }
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
  async removeBookingOfSportField(id: string, user: ReadUserDTO) {
    const sportField = await this.sportFieldRepository.find({
      where: { id: id },
    });
    console.log('123zczx', sportField);
    if (sportField.length === 0) {
      return {
        statusCode: 404,
        status: 'Error',
        message: 'Sport field not exists',
      };
    }
    if (sportField[0].createdBy !== user.id) {
      return {
        statusCode: 403,
        status: 'Error',
        message:
          'You do not have permission to delete  bookings of this  sport field',
      };
    }
    // const a = await this.bookingRepository
    //   .createQueryBuilder('booking')
    //   .innerJoinAndSelect('booking.field', 'field')
    //   .innerJoinAndSelect('field.sportField', 'sportField')
    //   .delete()
    //   .from(BookingEntity)
    //   .where('sportField.id = :sportFieldId', { sportFieldId: id })
    //   .execute();
    const fields = await this.fieldRepository.find({
      where: { sportField: { id: id } },
    });
    const fieldIds = fields.map((field) => field.id);
    console.log(fieldIds);
    await this.bookingRepository
      .createQueryBuilder()
      .delete()
      .where('field_id IN (:...fieldIds)', { fieldIds })
      .execute();

    return {
      statusCode: 200,
      status: 'Success',
      message: 'Deleted successfully',
    };
  }

  async getBookingsBySportFieldId(id: string) {
    const sportField = await this.sportFieldRepository.findOne({
      where: { id: id },
    });
    if (!sportField) {
      return {
        statusCode: 404,
        status: 'Error',
        message: 'Sport field not exists',
      };
    }
    const fields = await this.fieldRepository.find({
      where: { sportField: { id: id } },
    });
    const fieldIds = fields.map((field) => field.id);
    const bookings = await this.bookingRepository.find({
      where: { field: { id: In(fieldIds) } },
    });
    console.log(bookings);
    return bookings;
  }
  async updateStatusBooking(id: string, data: UpdateStatusBookingDto) {
    const booking = await this.bookingRepository.findOne({
      where: { id: id },
    });
    if (!booking) {
      return {
        statusCode: 404,
        status: 'Error',
        message: 'Booking not exists',
      };
    }
    await this.bookingRepository.update(id, data);
    return {
      statusCode: 200,
      status: 'Success',
      message: 'Updated successfully',
    };
  }
}
