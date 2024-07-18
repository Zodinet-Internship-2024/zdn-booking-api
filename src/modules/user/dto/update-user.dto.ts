import { AutoMap } from '@automapper/classes';
import { IsOptional, IsPhoneNumber, IsString, IsUrl } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @AutoMap()
  @IsUrl()
  imageUrl?: string;

  @IsOptional()
  @AutoMap()
  @IsString()
  name?: string;

  @IsOptional()
  @AutoMap()
  @IsPhoneNumber('VN')
  phone?: string;
}
