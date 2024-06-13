import { PartialType } from '@nestjs/mapped-types';
import { CreateFieldDto } from './create-field.dto';

export class ReadFieldDto extends PartialType(CreateFieldDto) {}
