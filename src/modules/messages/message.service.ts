import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/createMessage.dto';
import { MessageRepository } from './message.repository';

@Injectable()
export class MessageService {
  constructor(private messageRepository: MessageRepository) {}

  async createMessageFromAdmin(data: CreateMessageDto) {
    const newMessage = {
      userId: Number(data.conversation.userId),
      isSender: false,
      message: data.message,
      conversationId: data.conversation.id,
    };

    try {
      const message = await this.messageRepository.create(newMessage);
      console.log(message);
      return message;
    } catch (error) {}
  }


  async createMessageFromUser(data: CreateMessageDto) {
    const newMessage = {
      userId: Number(data.conversation.userId),
      isSender: true,
      message: data.message,
      conversationId: data.conversation.id,
    };

    try {
      const message = await this.messageRepository.create(newMessage);
      return message;
    } catch (error) {}
  }
}
