import { AutoMap } from '@automapper/classes';
import { CreateSportFieldDto } from './create-sport-field.dto';

export class ReadSportFieldDto extends CreateSportFieldDto {
  @AutoMap()
  id: string;

  @AutoMap()
  location: string;

  @AutoMap()
  fields: string[];
}
