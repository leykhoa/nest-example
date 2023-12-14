import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/createMessage.dto';
import { MessageRepository } from './message.repository';

@Injectable()
export class MessageService {
  constructor(private messageRepository: MessageRepository) {}

  async createMessage(data: CreateMessageDto) {
    return await this.messageRepository.create(data);
  }
}
