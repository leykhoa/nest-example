import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { ProductModule } from './modules/products/product.module';
import { UploadFile } from './common/middlewares/uploadFile.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeOrm.config';
import { ProductEntity } from './modules/products/entity/product.entity';
import 'dotenv/config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/users/user.module';
import { UserEntity } from './modules/users/entity/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { ConversationModule } from './modules/conversations/conversation.module';
import { MessageModule } from './modules/messages/message.module';
import { EventsModule } from './modules/events/event.module';
import { AppGateway } from './app.gateway';
import { PDFModule } from './modules/pdf/pdf.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ProductModule,
    UserModule,
    AuthModule,
    ConversationModule,
    MessageModule,
    EventsModule,
    PDFModule,
  ],
  controllers: [AppController],
  providers: [AppGateway],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UploadFile)
      .forRoutes(
        { path: 'product', method: RequestMethod.POST },
        { path: 'product', method: RequestMethod.PUT },
        { path: 'product', method: RequestMethod.GET },
      );
  }
}
