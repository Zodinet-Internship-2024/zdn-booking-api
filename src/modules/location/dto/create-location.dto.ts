import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLocationDto {
  @IsOptional()
  @IsString()
  sportFieldId?: string;

  @AutoMap()
  @IsOptional()
  @IsString()
  provinceId?: string;

  @AutoMap()
  @IsOptional()
  @IsString()
  districtId?: string;

  @AutoMap()
  @IsOptional()
  @IsString()
  wardId?: string;

  @IsString()
  @IsNotEmpty()
  addressDetail: string;

  @AutoMap()
  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @AutoMap()
  @IsNumber()
  @IsNotEmpty()
  latitude: number;
}
