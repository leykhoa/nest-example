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
import 'dotenv/config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/users/user.module';
import { ConversationModule } from './modules/conversations/conversation.module';
import { MessageModule } from './modules/messages/message.module';
import { EventsModule } from './modules/events/event.module';
import { AppGateway } from './app.gateway';

import { AppController } from './app.controller';
import { CategoryEntity } from './modules/category.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { CategoryModule } from './modules/Category/category.module';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: 'leykhoaqk@gmail.com',
          pass: 'sqmc ofjh fvzu tmsj',
        },
      },
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    ProductModule,
    UserModule,
    AuthModule,
    ConversationModule,
    MessageModule,
    EventsModule,
    CategoryModule,
    OrderModule,
    TypeOrmModule.forFeature([CategoryEntity]),
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
