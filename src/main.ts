import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );
  const myConfig = app.get(ConfigService)

  app.use(cookieParser());

  app.setBaseViewsDir(join(__dirname, '../views'));

  app.setViewEngine('pug');

  const config = new DocumentBuilder()
  .setTitle('Test api')
  .setDescription('This is a test api')
  .setVersion('1.0')
  .addTag('API')
  .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
