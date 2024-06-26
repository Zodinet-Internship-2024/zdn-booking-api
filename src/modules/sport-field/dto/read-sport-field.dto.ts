import { AutoMap } from '@automapper/classes';
import { CreateSportFieldDto } from './create-sport-field.dto';
import { ReadSportFieldImageDto } from './sport-field-image/read-sport-field-image.dto';
import { Field } from 'multer';

export class ReadSportFieldDto extends CreateSportFieldDto {
  @AutoMap()
  id: string;

  @AutoMap()
  fields: Field[];

  @AutoMap()
  fieldIds: string[];

  // @AutoMap()
  // location: LocationEntity;

  @AutoMap()
  sportFieldImages: ReadSportFieldImageDto[];
}
