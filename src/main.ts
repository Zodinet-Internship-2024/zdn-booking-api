import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { HttpExceptionFilter } from './common/error/http-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { UpdateValuesMissingErrorFilter } from './common/error/exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new UpdateValuesMissingErrorFilter(),
  );

  app.enableVersioning({
    type: VersioningType.URI,
  });

  const config = new DocumentBuilder()
    .setTitle('Booking-App')
    .setDescription('The booking API description')
    .setVersion('1.0')
    .addTag('booking')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(5000);
}

bootstrap();
