import { NestFactory } from '@nestjs/core';
import config from 'src/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  await app.listen(Number(config.server.port), '0.0.0.0');
}
bootstrap();
