import { IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { CreateBookingDto } from './create-booking.dto';

export class CreateOwnerBookingDto extends CreateBookingDto {
  @IsPhoneNumber('VN')
  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  name: string;
}
