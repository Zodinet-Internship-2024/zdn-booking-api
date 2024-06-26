/* eslint-disable @typescript-eslint/no-unused-vars */
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  BadRequestException,
  ConflictException,
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
import { ReadOwnerBookingDto } from '../dto/read-owner-booking.dto';
import { DateTimeHelper } from 'src/helpers/datetime.helper';

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

  private async validateFieldExists(fieldId: string): Promise<FieldEntity> {
    const field = await this.fieldRepository.findOne({
      where: { id: fieldId },
    });
    if (!field) {
      throw new NotFoundException('Field not found');
    }
    return field;
  }

  async isBookingTimeInvalid(fieldId: string, startTime: Date, endTime: Date) {
    await this.validateFieldExists(fieldId);

    const field = await this.fieldRepository.findOne({
      where: { id: fieldId },
      relations: {
        sportField: true,
      },
    });

    const sportField = field.sportField;
    const startTimeString = new Date(startTime).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h24',
    });
    const endTimeString = new Date(endTime).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h24',
    });

    const compareStartTime = DateTimeHelper.compareTimes(
      startTimeString,
      sportField.startTime,
    );

    const compareEndTime = DateTimeHelper.compareTimes(
      endTimeString,
      sportField.endTime,
    );
    return compareStartTime === -1 || compareEndTime === 1;
  }

  async hasBookingTime(fieldId: string, startTime: Date, endTime: Date) {
    const booking = await this.bookingRepository
      .createQueryBuilder('booking')
      .where('booking.field = :fieldId', { fieldId })
      .andWhere(
        "booking.startTime < :endTime at time zone '-07' AND booking.endTime > :startTime  at time zone '-07'",
        {
          startTime,
          endTime,
        },
      )
      .getOne();

    return !!booking;
  }

  async createBooking(user: ReadUserDTO, createBookingDto: CreateBookingDto) {
    const { fieldId, ...bookingDetails } = createBookingDto;
    const field = await this.validateFieldExists(fieldId);

    if (
      await this.isBookingTimeInvalid(
        fieldId,
        bookingDetails.startTime,
        bookingDetails.endTime,
      )
    ) {
      throw new BadRequestException('Invalid booking time');
    }

    if (
      await this.hasBookingTime(
        fieldId,
        bookingDetails.startTime,
        bookingDetails.endTime,
      )
    ) {
      throw new ConflictException('There is a booking at this time');
    }

    const { id, ...userInfo } = user;
    const newBooking = await this.bookingRepository.save({
      ...userInfo,
      ...bookingDetails,
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

    this.validateFieldExists(fieldId);

    if (field.createdBy !== userId) {
      throw new ForbiddenException(
        'You do not have permission to view bookings',
      );
    }
  }

  private buildBaseQuery(readBookingDto: ReadOwnerBookingDto | ReadBookingDto) {
    const query = this.bookingRepository
      .createQueryBuilder('booking')
      .innerJoinAndSelect('booking.field', 'field');

    if ('fieldId' in readBookingDto) {
      query.where('field.id = :fieldId', {
        fieldId: readBookingDto.fieldId,
      });
    }

    if (readBookingDto.startTime && readBookingDto.endTime) {
      query
        .andWhere("booking.startTime >= :startTime at time zone '-07'", {
          startTime: readBookingDto.startTime,
        })
        .andWhere("booking.endTime <= :endTime at time zone '-07'", {
          endTime: readBookingDto.endTime,
        });
    }

    return query;
  }

  private applyStatusFilter(
    query: SelectQueryBuilder<BookingEntity>,
    status?: string[],
  ) {
    if (status && status.length > 0) {
      query.andWhere('booking.status IN (:...status)', { status });
    }
  }

  async getBookingsByFieldId(
    user: ReadUserDTO,
    readBookingDto: ReadOwnerBookingDto,
  ) {
    this.validateFieldAccess(user.id, readBookingDto.fieldId);
    const query = this.buildBaseQuery(readBookingDto);
    this.applyStatusFilter(query, readBookingDto.status);
    return query.getMany();
  }

  async getUserBooking(user: ReadUserDTO, readBookingDto: ReadBookingDto) {
    const query = this.buildBaseQuery(readBookingDto);
    query.andWhere('booking.createdBy = :userId', { userId: user.id });

    this.applyStatusFilter(query, readBookingDto.status);

    return query.getMany();
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
