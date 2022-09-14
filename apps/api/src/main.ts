import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { environment } from './environments';

import { ApplicationModule } from './modules/Application/module';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  
  // App settings
  app.setGlobalPrefix(environment.globalPrefix);
  
  // Swagger
  SwaggerModule.setup('docs', app,
    SwaggerModule.createDocument(app,
      new DocumentBuilder()
        .setTitle("Bluk Launcher API")
        .setDescription("API for Bluk's Launcher")
        .setVersion("v1")
        .build()  
    )
  );

  // Starting our app
  const port = process.env.PORT || 3000;
  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: ${await app.getUrl()}/${environment.globalPrefix}`
  );
}

bootstrap();
