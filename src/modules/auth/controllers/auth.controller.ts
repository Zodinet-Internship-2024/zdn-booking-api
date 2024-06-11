import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { SignInDto } from '../dto/sign-in.dto';
import { AuthService } from '../services/auth.service';

@Controller({ path: '/auth', version: '1' })
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(200)
  async signIn(
    @Res({ passthrough: true }) response: Response,
    @Body() signInDto: SignInDto,
  ) {
    const { access_token } = await this.authService.signIn(signInDto);
    response.cookie('access_token', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    return { access_token };
  }
}
