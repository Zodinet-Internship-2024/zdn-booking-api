import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { getAccessTokenRealms, signUpKeyClock } from '../api/auth';

@Injectable()
export class AuthService {
  async signUp(createAuthDto: CreateAuthDto) {
    const { name, email, phone, password } = createAuthDto;
    const signUpKeyCloak = {
      username: email,
      enabled: true,
      attributes: {
        FullName: name,
        phone,
      },
      credentials: {
        type: 'password',
        value: password,
        temporary: false,
      },
    };
    const data = await getAccessTokenRealms();
    const dataKeyCloak = await signUpKeyClock(
      signUpKeyCloak,
      data.access_token,
    );
    console.log(dataKeyCloak);
    return data;
  }
}
