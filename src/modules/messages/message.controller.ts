import { Controller, Get, Post } from '@nestjs/common';
import { MessageEntity } from './entity/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('api/v1/messages')
export class MessageController {
  constructor(
    @InjectRepository(MessageEntity)
    private messageRepository: Repository<MessageEntity>,
  ) {}
  @Get()
  getData() {
    return this.messageRepository.find({
      relations: ["user", "conversation"]
    });
  }

  @Post()
  createMessage() {}
}
