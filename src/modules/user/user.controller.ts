import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './service/user.service';
import { API_BEARER_AUTH } from 'src/constants/constants';
import { ReadUserDTO } from './dto/read-user-dto';
import { User } from 'src/decorators/user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { CreateSocialUserDto } from './dto/create-social-user.dto';
@ApiTags('user')
@UseInterceptors(TransformInterceptor)
@Controller({ path: 'user', version: '1' })
@ApiBearerAuth(API_BEARER_AUTH)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getProfile(@User() user: ReadUserDTO) {
    return await this.userService.getProfile(user);
  }

  @Patch()
  updateProfile(
    @User() user: ReadUserDTO,
    @Body() newUserProfile: UpdateUserDto,
  ) {
    return this.userService.updateProfile(user.id, newUserProfile);
  }

  @Post('/social-login')
  createSocialUser(
    @User() user: ReadUserDTO,
    @Body() createSocialUserDto: CreateSocialUserDto,
  ) {
    return this.userService.createSocialUser(user, createSocialUserDto);
  }
}
