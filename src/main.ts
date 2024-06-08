import { config } from 'dotenv'

import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './app/AllExceptionsFilter';

config()
const swaggerConfig = new DocumentBuilder()
  .setTitle('Customer City Swagger')
  .setDescription('Customer City - Technical Assessment')
  .setVersion('1.0')
  .addTag('tasks')
  .build();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appAdapter = app.get(HttpAdapterHost);
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig);

  app
    .useGlobalPipes(new ValidationPipe({
      stopAtFirstError: true,
    }))
    .useGlobalFilters(new AllExceptionsFilter(appAdapter))
    .enableCors()

  SwaggerModule.setup('/', app, swaggerDoc);
  await app.listen(process.env.PORT);
}

bootstrap();
