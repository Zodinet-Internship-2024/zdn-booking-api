import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignInDto } from '../dto/sign-in.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateAuthDto } from '../dto/create-auth.dto';

@Controller({ path: '/auth', version: '1' })
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(200)
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
  @Post('/sign-up')
  signUp(@Body() createAuthDto: CreateAuthDto) {
    console.log(createAuthDto);
    return this.authService.signUp(createAuthDto);
  }
}
