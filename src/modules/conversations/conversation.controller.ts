import { Controller, Get, Param, Query } from '@nestjs/common';
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
  getData(@Query() query) {
    console.log(query);
    const condition = {};
    if (query.userId) {
      (condition as { where: { userId: number } }).where = {
        userId: Number(query.userId),
      };
    }
    return this.conversationRepository.find({
      relations: ['messages'],
      ...condition,
    });
  }

  @Get(':userId')
  getDataByUserId(@Param() param) {

    return this.conversationRepository.findOne({
      where: { userId: Number(param.userId) },
      relations: ['messages'],
    });
  }
}
