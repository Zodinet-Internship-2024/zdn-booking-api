import { Transform, Type } from 'class-transformer';
import { IsArray, IsDate, IsEnum, IsOptional } from 'class-validator';
import { BookingStatus } from '../entities/booking.entity';

export class ReadBookingDto {
  @IsDate()
  @Type(() => Date)
  startTime: Date;

  @IsDate()
  @Type(() => Date)
  endTime: Date;

  @IsOptional()
  @IsArray()
  @IsEnum(BookingStatus, { each: true, message: 'Invalid status' })
  @Transform(({ value }) => value?.split(','))
  status?: BookingStatus[];
}
