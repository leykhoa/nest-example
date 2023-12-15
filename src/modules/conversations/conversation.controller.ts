import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConversationEntity } from './entity/conversation.entity';

@Controller('api/v1/conversations')
export class ConversationController {
  constructor(
    @InjectRepository(ConversationEntity)
    private conversationRepository: Repository<ConversationEntity>,
  ) {}

  @Get()
  getData() {
    return this.conversationRepository.find({
      relations: ['messages'],
      
    });
  }
}
