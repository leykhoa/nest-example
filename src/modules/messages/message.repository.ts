import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageEntity } from './entity/message.entity';
import { CreateMessageDto } from './dto/createMessage.dto';

@Injectable()
export class MessageRepository {
  constructor(
    @InjectRepository(MessageEntity)
    private messageRepository: Repository<MessageEntity>,
  ) {}

  create(data: CreateMessageDto) {
    const messageEntity = this.messageRepository.create(data);
    return this.messageRepository.save(messageEntity);
  }
  delete() {}
}
