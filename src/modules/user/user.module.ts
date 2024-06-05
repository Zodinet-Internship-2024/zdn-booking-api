import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './user.controller';
import { userProviders } from './service/user.providers';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AccountModule } from '../account/account.module';
import { UserProfile } from './profile/user.profile';

@Module({
  imports: [TypeOrmModule.forFeature([User]), DatabaseModule, AccountModule],
  controllers: [UserController],
  providers: [...userProviders, UserService, UserProfile],
})
export class UserModule {}
