import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './common/guards/auth.guard';
import { UploadFileCSV } from './common/middlewares/uploadCSV.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // app.useGlobalGuards(new AuthGuard());
  const uploadFileCSV = new UploadFileCSV();
  app.enableCors();
  app.use(uploadFileCSV.use.bind(uploadFileCSV));

  await app.listen(3000);
}
bootstrap();
