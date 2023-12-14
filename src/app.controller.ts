import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UploadFile } from './common/middlewares/uploadFile.middleware';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
