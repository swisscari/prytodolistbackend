import { config } from 'dotenv'

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

config()
const swaggerConfig = new DocumentBuilder()
  .setTitle('Customer City Swagger')
  .setDescription('Customer City - Technical Assessment')
  .setVersion('1.0')
  .addTag('tasks')
  .build();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig);

  app.useGlobalPipes(new ValidationPipe({
    stopAtFirstError: true,
  }))

  SwaggerModule.setup('/', app, swaggerDoc);
  await app.listen(process.env.PORT);
}

bootstrap();
