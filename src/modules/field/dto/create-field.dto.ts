import { AutoMap } from '@automapper/classes';
import {
  // IsDate,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
export class CreateFieldDto {
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  sportField: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  createdBy: string;
}
