import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express'; 

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
 
  app.useStaticAssets(join(__dirname, '..', 'uploads'));
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  const config = new DocumentBuilder()
    .setTitle('Products API')
    .setDescription('API documentation for the Product service')
    .setVersion('1.0')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
