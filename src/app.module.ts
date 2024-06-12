// import { MiddlewareConsumer, Module } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import typeorm from './configs/typeorm.config';

import { HttpExceptionFilter } from './common/error/http-exception.filter';
import { UpdateValuesMissingErrorFilter } from './common/error/exception.filter';
import { AllExceptionsFilter } from './common/error/all-exception.filter';

import { UserModule } from './modules/user/user.module';
import { AccountModule } from './modules/account/account.module';
import { SportFieldModule } from './modules/sport-field/sport-field.module';
import { FieldModule } from './modules/field/field.module';
import { BookingModule } from './modules/booking/booking.module';
import { LocationModule } from './modules/location/location.module';
import { MailModule } from './modules/mail/mail.module';
import { FirebaseModule } from './modules/firebase/firebase.module';
import { AuthModule } from './modules/auth/auth.module';
import { TYPE_ORM_CONFIG } from './constants/constants';
import {
  AuthGuard,
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
} from 'nest-keycloak-connect';
import { keycloakConfig } from './configs/keycloak-connection.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get(TYPE_ORM_CONFIG),
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    KeycloakConnectModule.register(keycloakConfig),
    UserModule,
    AccountModule,
    SportFieldModule,
    FieldModule,
    BookingModule,
    LocationModule,
    MailModule,
    FirebaseModule,
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
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(UserMiddleware).forRoutes('*');
  // }
}
