import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AccountModule } from './account/account.module';
import { SportFieldModule } from './sport-field/sport-field.module';
import { FieldModule } from './field/field.module';
import { BookingModule } from './booking/booking.module';
import { LocationModule } from './location/location.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    UserModule,
    AccountModule,
    SportFieldModule,
    FieldModule,
    BookingModule,
    LocationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
