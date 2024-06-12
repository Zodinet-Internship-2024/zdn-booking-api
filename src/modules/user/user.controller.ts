import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './service/user.service';
import { API_BEARER_AUTH } from 'src/constants/constants';
@ApiTags('user')
@Controller('user')
@ApiBearerAuth(API_BEARER_AUTH)
export class UserController {
  constructor(private readonly userService: UserService) {}
}
