import { PartialType } from '@nestjs/mapped-types';
import { CreateFieldDto } from './create-field.dto';
import { AutoMap } from '@automapper/classes';

export class UpdateFieldDto extends PartialType(CreateFieldDto) {
  @AutoMap()
  updatedBy?: string;
}
