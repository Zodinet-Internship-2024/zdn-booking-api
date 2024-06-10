// import { MiddlewareConsumer, Module } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import typeorm from './configs/typeorm.config';

import { HttpExceptionFilter } from './common/error/http-exception.filter';
import { UpdateValuesMissingErrorFilter } from './common/error/exception-filter';

import { UserModule } from './modules/user/user.module';
import { AccountModule } from './modules/account/account.module';
import { SportFieldModule } from './modules/sport-field/sport-field.module';
import { FieldModule } from './modules/field/field.module';
import { BookingModule } from './modules/booking/booking.module';
import { LocationModule } from './modules/location/location.module';
import { MailModule } from './modules/mail/mail.module';
import { AuthModule } from './modules/auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    UserModule,
    AccountModule,
    SportFieldModule,
    FieldModule,
    BookingModule,
    LocationModule,
    MailModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: UpdateValuesMissingErrorFilter,
    },
  ],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(UserMiddleware).forRoutes('*');
  // }
}
