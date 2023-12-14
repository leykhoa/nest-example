import { Module } from '@nestjs/common';
import { ConversationController } from './conversation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationEntity } from './entity/conversation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConversationEntity])],
  controllers: [ConversationController],
  providers: [],
})
export class ConversationModule {}
