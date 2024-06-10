import { ROLE } from 'src/constants/constants';

export class CreateAuthDto {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: ROLE;
}
