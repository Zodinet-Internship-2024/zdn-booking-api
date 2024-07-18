import { AutoMap } from '@automapper/classes';
import { IsOptional } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class ReadUserDTO {
  @AutoMap()
  id: string;

  @AutoMap()
  name: string;

  @AutoMap()
  email: string;

  @AutoMap()
  phone: string;

  @AutoMap()
  @IsOptional()
  imageUrl?: string;

  @AutoMap()
  @IsOptional()
  role?: UserRole;
}
