/* istanbul ignore file */
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { FieldEntity } from '../entities/field.entity';
import { ReadFieldDto } from '../dto/read-field.dto';
import { CreateFieldDto } from '../dto/create-field.dto';
import { UpdateFieldDto } from '../dto/update-field.dto';
import { SportFieldEntity } from 'src/modules/sport-field/entities/sport-field.entity';

@Injectable()
export class FieldProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, FieldEntity, ReadFieldDto);
      createMap(mapper, CreateFieldDto, FieldEntity);
      createMap(
        mapper,
        UpdateFieldDto,
        FieldEntity,
        forMember(
          (destination) => destination.name,
          mapFrom((source) => source.name),
        ),
        forMember(
          (destination) => destination.sportField,
          mapFrom((source) => {
            if (source.sportField) {
              const sportField = new SportFieldEntity();
              sportField.id = source.sportField;
              return sportField;
            }
            return undefined;
          }),
        ),
      );
    };
  }
}
