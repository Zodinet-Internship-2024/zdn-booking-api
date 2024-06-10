import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  ValidateIf,
} from 'class-validator';

export class SignInDto {
  @ApiProperty()
  @IsEmail()
  @ValidateIf((o) => !o.phone || o.email)
  email: string;

  @ApiProperty()
  @IsPhoneNumber('VN')
  @ValidateIf((o) => !o.email || o.phone)
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
