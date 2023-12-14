import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './entity/message.entity';
import { MessageGateway } from './message.gateway';
import { MessageRepository } from './message.repository';
import { MessageService } from './message.service';

@Module({
  controllers: [MessageController],
  imports: [TypeOrmModule.forFeature([MessageEntity])],
  providers:[MessageGateway, MessageRepository, MessageService],
})
export class MessageModule {}
