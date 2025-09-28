import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  console.log(`Running in ${process.env.NODE_ENV} mode`);
  const app = await NestFactory.create(AppModule);
  app.enableCors({
      origin: ['http://localhost:4200'],
      methods: 'GET,POST', 
      credentials: true,
  })
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(process.env.PORT ?? 3000);
  console.log(`
🔊  Application is running on: \x1b[34mhttp://localhost:${process.env.PORT ?? 3000}\x1b[0m
    `);
}
bootstrap();
