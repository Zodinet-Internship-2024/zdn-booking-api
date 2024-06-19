import {
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { AutoMap } from '@automapper/classes';
import { UploadImageDto } from 'src/common/dto/upload-image.dto';
import { CreateLocationDto } from 'src/modules/location/dto/create-location.dto';

export class CreateSportFieldDto {
  @AutoMap()
  @IsString()
  name: string;

  @AutoMap()
  @IsPositive()
  quantity: number;

  @AutoMap()
  @IsString()
  @MinLength(10)
  @MaxLength(11)
  phone: string;

  @AutoMap()
  @IsString()
  startTime: string;

  @AutoMap()
  @IsString()
  endTime: string;

  @AutoMap()
  @IsPositive()
  price: number;

  @AutoMap()
  @IsString()
  @MaxLength(65535)
  rule: string;

  @AutoMap()
  @IsString()
  sportFieldType: string;

  @AutoMap()
  @IsString()
  owner: string;

  @IsOptional()
  location: CreateLocationDto | string;

  @IsOptional()
  sportFieldImages: UploadImageDto[];

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  createdBy: string;
}
