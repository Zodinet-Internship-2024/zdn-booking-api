import { Body, Controller, HttpCode, Inject, Post, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Public } from 'nest-keycloak-connect';
import { API_BEARER_AUTH } from 'src/constants/constants';
import { SignInDto } from '../dto/sign-in.dto';
import { AuthService } from '../services/auth.service';

@Controller({ path: '/auth', version: '1' })
@ApiTags('auth')
@ApiBearerAuth(API_BEARER_AUTH)
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(200)
  @Public()
  async signIn(
    @Res({ passthrough: true }) response: Response,
    @Body() signInDto: SignInDto,
  ) {
    const data = await this.authService.signIn(signInDto);
    response
      .cookie('access_token', data.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      })
      .json(data);
  }
}
