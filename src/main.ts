import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './common/guards/auth.guard';
import { UploadFileCSV } from './common/middlewares/uploadCSV.middleware';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const config = new DocumentBuilder()
    .setTitle('NestJS-example')
    .setDescription('API test')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  // Thêm middleware upload file CSV
  const uploadFileCSV = new UploadFileCSV();
  app.use(uploadFileCSV.use.bind(uploadFileCSV));
  await app.listen(3000);
}
bootstrap();
