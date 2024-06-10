import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { SignInDto } from '../dto/sign-in.dto';
import { UserService } from 'src/modules/user/service/user.service';

@Injectable()
export class AuthService {
  private keycloakHost: string;
  private realms: string;

  constructor(private readonly userService: UserService) {
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
}
