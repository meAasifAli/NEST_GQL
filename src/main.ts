import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(process.env.PORT ?? 3000);

  Logger.log(
    `Server IS listening on http://localhost:${process.env.PORT ?? 3000}/graphql 📈`,
  );
}
void bootstrap();
