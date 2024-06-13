import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/service/base.service';
import { Repository } from 'typeorm';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectMapper()
    private readonly classMapper: Mapper,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async updateProfile(id: string, data: UpdateUserDto) {
    await this.userRepository.update(id, data);
    return data;
  }
}
