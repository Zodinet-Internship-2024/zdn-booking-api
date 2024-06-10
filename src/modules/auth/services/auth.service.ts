import { ConflictException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { SignInDto } from '../dto/sign-in.dto';
import { UserService } from 'src/modules/user/service/user.service';
import { KeycloakService } from '../api/auth';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { User } from 'src/modules/user/entities/user.entity';
import { Account } from 'src/modules/account/entities/account.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  private keycloakHost: string;
  private realms: string;

  constructor(
    private readonly userService: UserService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectMapper() private readonly mapper: Mapper,
    private readonly keycloakService: KeycloakService,
  ) {
    this.keycloakHost = process.env.KEYCLOAK_HOST;
    this.realms = process.env.KEYCLOAK_REALMS;
  }
  async signIn(signInDto: SignInDto) {
    const formData = new URLSearchParams();
    formData.append('client_id', process.env.KEYCLOAK_CLIENT_ID);
    formData.append('client_secret', process.env.KEYCLOAK_CLIENT_SECRET);
    formData.append('username', null);
    formData.append('password', signInDto.password);
    formData.append('grant_type', 'password');

    try {
      const res = await axios.post(
        `${this.keycloakHost}/realms/${this.realms}/protocol/openid-connect/token`,
        formData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      return res.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
  async signUp(createAuthDto: CreateAuthDto) {
    const { name, email, phone, password, role, accountType } = createAuthDto;
    const userExist = await this.userService.findOne({
      where: [{ phone: phone }, { email: email }],
    });
    if (userExist) {
      return new ConflictException('Email or phone already exists');
    }

    const signUpKeyClockInfo = {
      username: email,
      enabled: true,
      email,
      attributes: {
        FullName: name,
        phone,
      },
      credentials: [
        {
          type: 'password',
          value: password,
          temporary: false,
        },
      ],
    };
    const data = await this.keycloakService.getAccessTokenRealms();
    console.log(data.access_token);
    await this.keycloakService.signUpKeyCloak(
      signUpKeyClockInfo,
      data.access_token,
    );

    const user = await this.keycloakService.getUserIdKeyCloak(
      email,
      data.access_token,
    );

    const roleUser = await this.keycloakService.getRoleIdKeyCloak(
      data.access_token,
      role,
    );

    const userRole = [
      {
        id: roleUser.id,
        name: role,
      },
    ];

    await this.keycloakService.createRoleUserKeyCloak(
      user[0].id,
      data.access_token,
      userRole,
    );
    const newUser = this.mapper.map(createAuthDto, CreateAuthDto, User);
    const createdUser = await this.userRepository.save(newUser);

    const newAccount = new Account();
    newAccount.name = accountType;
    newAccount.user = createdUser;

    this.accountRepository.save(newAccount);

    return createdUser;
  }
}
