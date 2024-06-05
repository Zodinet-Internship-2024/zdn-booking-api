import { AutoMap } from '@automapper/classes';

export class ReadUserDTO {
  @AutoMap()
  id: string;

  @AutoMap()
  name: string;

  @AutoMap()
  email: string;

  @AutoMap()
  phone: string;
}
