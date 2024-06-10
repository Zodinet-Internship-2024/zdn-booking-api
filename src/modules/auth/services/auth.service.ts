import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import axios from 'axios';
import { UserService } from 'src/modules/user/service/user.service';
import { SignInDto } from '../dto/sign-in.dto';

@Injectable()
export class AuthService {
  private keycloakHost: string;
  private realms: string;

  constructor(private readonly userService: UserService) {
    this.keycloakHost = process.env.KEYCLOAK_HOST;
    this.realms = process.env.KEYCLOAK_REALMS;
  }
  async signIn(signInDto: SignInDto) {
    await this.populateEmailIfPhoneProvided(signInDto);

    const formData = this.createSignInFormData(signInDto);

    try {
      const response = await this.requestKeycloakToken(formData);
      return response.data;
    } catch (error) {
      console.error('Error during sign-in:', error);
      return new UnauthorizedException('Invalid credentials');
    }
  }

  async populateEmailIfPhoneProvided(signInDto: SignInDto) {
    if (signInDto.phone && !signInDto.email) {
      const user = await this.userService.findOne({
        where: { phone: signInDto.phone },
      });
      if (!user) {
        return new NotFoundException('User not found');
      }

      signInDto.email = user.email;
    }

    return signInDto;
  }

  private createSignInFormData(signInDto: SignInDto): URLSearchParams {
    const formData = new URLSearchParams();
    formData.append('client_id', process.env.KEYCLOAK_CLIENT_ID);
    formData.append('client_secret', process.env.KEYCLOAK_CLIENT_SECRET);
    formData.append('username', signInDto.email);
    formData.append('password', signInDto.password);
    formData.append('grant_type', 'password');
    return formData;
  }

  private async requestKeycloakToken(formData: URLSearchParams) {
    return axios.post(
      `${this.keycloakHost}/realms/${this.realms}/protocol/openid-connect/token`,
      formData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
  }
}
