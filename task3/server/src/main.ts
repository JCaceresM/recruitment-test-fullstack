import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    const logger = new Logger('NestApplication');

  app.setGlobalPrefix('api/v1');
  app.enableCors();

  await app.listen(process.env.APP_PORT||3000);
  logger.log(
    `Nest application is listening on ${await app.getUrl()}`,
  );
}    
bootstrap();
