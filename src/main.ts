import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AppInterceptor } from './app.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalInterceptors(new AppInterceptor())
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ||2001);
}
bootstrap();
