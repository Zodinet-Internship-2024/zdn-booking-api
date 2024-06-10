/* istanbul ignore file */
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  createMap,
  forMember,
  ignore,
  // forMember,
  // ignore,
  // mapFrom,
  Mapper,
  // MappingProfile,
} from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { ReadUserDTO } from '../dto/read-user-dto';
import { CreateAuthDto } from 'src/modules/auth/dto/create-auth.dto';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        User,
        ReadUserDTO,
        // forMember((dest) => dest.password, ignore()),
      );
      createMap(
        mapper,
        CreateAuthDto,
        User,
        forMember((dest) => dest.id, ignore()),
      );
    };
  }
}
