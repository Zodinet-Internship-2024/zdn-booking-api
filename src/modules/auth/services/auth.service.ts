import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { SignInDto } from '../dto/sign-in.dto';
import { UserService } from 'src/modules/user/service/user.service';
import {
  createRoleUserKeyClock,
  getAccessTokenRealms,
  getRoleIdKeyClock,
  getUserIdKeyClock,
  signUpKeyClock,
} from '../api/auth';
import { CreateAuthDto } from '../dto/create-auth.dto';

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
  async signUp(createAuthDto: CreateAuthDto) {
    const { name, email, phone, password, role } = createAuthDto;

    const signUpKeyCloak = {
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
    const data = await getAccessTokenRealms();

    const dataKeyCloak = await signUpKeyClock(
      signUpKeyCloak,
      data.access_token,
    );

    const user = await getUserIdKeyClock(email, data.access_token);
    console.log(dataKeyCloak);
    const roleUser = await getRoleIdKeyClock(data.access_token, role);

    const userRole = {
      id: roleUser.id,
      name: role,
    };
    const dataRoleUser = await createRoleUserKeyClock(
      user.id,
      data.access_token,
      userRole,
    );
    console.log(dataRoleUser);
    return dataKeyCloak;
  }
}
