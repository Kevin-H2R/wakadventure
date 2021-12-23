import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require('dotenv').config()
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: "http://localhost:8080"
  });
  app.use(
    session({
      secret: 'ioghjpefnengfjvjwwopefpokgrewogpjwgpwefjwofekwefrewlgkweggewwe',
      resave: false,
      saveUninitialized: false
    })
  )
  await app.listen(3000);
}
bootstrap();
