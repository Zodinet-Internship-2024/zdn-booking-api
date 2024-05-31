import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { BookingModule } from './booking/booking.module';
import { FieldModule } from './field/field.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, BookingModule, FieldModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
