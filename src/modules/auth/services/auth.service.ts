import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from '../dto/create-auth.dto';
import {
  createRoleUserKeyClock,
  getAccessTokenRealms,
  getRoleIdKeyClock,
  getUserIdKeyClock,
  signUpKeyClock,
} from '../api/auth';

@Injectable()
export class AuthService {
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
