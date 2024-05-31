import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AccountModule } from './account/account.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, DatabaseModule, AccountModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
