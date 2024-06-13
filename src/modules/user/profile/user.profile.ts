/* istanbul ignore file */
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  createMap,
  forMember,
  ignore,
  mapFrom,
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
import { CreateUserDto } from '../dto/create-user.dto';

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
      createMap(
        mapper,
        User,
        CreateUserDto,
        forMember(
          (destination: CreateUserDto) => destination.name,
          mapFrom((source: User) => source.name),
        ),
        forMember(
          (destination: CreateUserDto) => destination.email,
          mapFrom((source: User) => source.email),
        ),
        forMember(
          (destination: CreateUserDto) => destination.phone,
          mapFrom((source: User) => source.phone),
        ),
        forMember(
          (destination: CreateUserDto) => destination.role,
          mapFrom((source: User) => source.role),
        ),
        forMember(
          (destination: CreateUserDto) => destination.imageUrl,
          mapFrom((source: User) => source.imageUrl),
        ),
      );
    };
  }
}
