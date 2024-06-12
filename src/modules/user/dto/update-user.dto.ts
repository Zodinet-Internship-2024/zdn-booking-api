import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { AutoMap } from '@automapper/classes';
import { UserRole } from '../entities/user.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @AutoMap()
  name?: string;

  @AutoMap()
  email?: string;

  @AutoMap()
  phone?: string;

  @AutoMap()
  role?: UserRole;

  @AutoMap()
  imageUrl?: string;
}
