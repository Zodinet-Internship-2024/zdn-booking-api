import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignInDto } from '../dto/sign-in.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller({ path: '/auth', version: '1' })
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(200)
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}
