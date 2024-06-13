import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from '../account/account.module';
import { User } from './entities/user.entity';
import { UserProfile } from './profile/user.profile';
import { UserService } from './service/user.service';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AccountModule],
  controllers: [UserController],
  providers: [UserService, UserProfile],
  exports: [UserService],
})
export class UserModule {}
