import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { PROVIDER } from 'src/constants/constants';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { ReadUserDTO } from '../dto/read-user-dto';
import { AccountService } from 'src/modules/account/account.service';

@Injectable()
export class UserService {
  constructor(
    @InjectMapper()
    private readonly classMapper: Mapper,
    @Inject(PROVIDER.USER_REPOSITORY)
    private readonly userRepository: Repository<User>,
    private readonly accountService: AccountService,
  ) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    console.log(user);

    try {
      return this.classMapper.map(user, User, ReadUserDTO);
    } catch (ex) {
      throw new Error(`findAll error: ${ex.message}.`);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
