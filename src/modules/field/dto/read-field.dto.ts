import { CreateFieldDto } from './create-field.dto';
import { IsString } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class ReadFieldDto extends CreateFieldDto {
  @AutoMap()
  @IsString()
  id: string;
}
