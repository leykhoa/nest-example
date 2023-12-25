import { Repository } from "typeorm";
import { ConversationEntity } from "./entity/conversation.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";



@Injectable()
export class MessageRepository {
  constructor(
    @InjectRepository(ConversationEntity)
    private messageRepository: Repository<ConversationEntity>,
  ) {}

  update(data: {
  }) {
    const messageEntity = this.messageRepository.create(data);
    return this.messageRepository.save(messageEntity);
  }
  delete() {}
}
