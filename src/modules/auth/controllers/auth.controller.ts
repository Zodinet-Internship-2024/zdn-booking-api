import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { SignInDto } from '../dto/sign-in.dto';
import { AuthService } from '../services/auth.service';
import { Unprotected } from 'nest-keycloak-connect';
import { API_BEARER_AUTH } from 'src/constants/constants';

@Controller({ path: '/auth', version: '1' })
@ApiTags('auth')
@ApiBearerAuth(API_BEARER_AUTH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(200)
  async signIn(
    @Res({ passthrough: true }) response: Response,
    @Body() signInDto: SignInDto,
  ) {
    const data = await this.authService.signIn(signInDto);
    response
      .cookie('access_token', data.access_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      })
      .json(data);
  }
}
