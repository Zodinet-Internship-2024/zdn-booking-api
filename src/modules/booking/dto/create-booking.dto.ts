import { BookingStatus } from 'src/modules/booking/entities/booking.entity';
export class CreateBookingDto {
  id: number;
  phone: string;
  fullName: string;
  fieldId: string;
  startTime: Date;
  endTime: Date;
  amount: number;
  createBy: string;
  status: BookingStatus;
}
