import { IsNotEmpty, Length } from 'class-validator';

import { ConversationEntity } from 'src/modules/conversations/entity/conversation.entity';

export class CreateMessageDto {
  @Length(500)
  message: string;
  conversation: ConversationEntity;
}
