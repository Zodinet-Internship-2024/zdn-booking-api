import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UserModule } from '../user/user.module';
import { AccountModule } from '../account/account.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../account/entities/account.entity';
import { User } from '../user/entities/user.entity';
import { KeycloakService } from './api/auth';

@Module({
  controllers: [AuthController],
  providers: [AuthService, KeycloakService],
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Account, User]),
    AccountModule,
    UserModule,
  ],
})
export class AuthModule {}
