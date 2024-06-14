import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/service/base.service';
import { Repository } from 'typeorm';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { KeycloakService } from 'src/modules/auth/api/auth';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectMapper()
    private readonly classMapper: Mapper,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly keycloakService: KeycloakService,
  ) {
    super(userRepository);
  }

  async updateProfile(id: string, data: UpdateUserDto) {
    const userExist = await this.userRepository.findOne({
      where: [{ id: id }],
    });
    if (!userExist) {
      return {
        statusCode: 404,
        status: 'Error',
        message: 'User not exists',
      };
    }

    const dataToken = await this.keycloakService.getAccessTokenRealms();

    const dataBody = {
      attributes: {
        phone: data.phone,
        FullName: data.name,
      },
    };
    await this.keycloakService.updateUserKeyCloak(
      id,
      dataBody,
      dataToken.access_token,
    );
    await this.userRepository.update(id, data);
    return {
      statusCode: 200,
      status: 'Success',
      message: 'Updated successfully',
      data,
    };
  }
}
