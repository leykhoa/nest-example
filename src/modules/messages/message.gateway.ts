import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';
import { CreateMessageDto } from './dto/createMessage.dto';
import { MessageService } from './message.service';
import { ConversationEntity } from '../conversations/entity/conversation.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessageGateway {
  @WebSocketServer()
  server: Server;
  constructor(private messageService: MessageService) {}

  @SubscribeMessage('sendMessageToAdmin')
  async sendMessageToAdmin(
    @MessageBody()  data: CreateMessageDto,
  ) {

    console.log(data);
    const message = await this.messageService.createMessageFromUser(data);
    this.server
    .to(`user-room-${data.conversation.id}`)
    .emit('messageFromAdmin');
    this.server.emit('messageToAdmin');
  }

  @SubscribeMessage('sendMessageToUser')
  async sendMessageToUser(@MessageBody() data: CreateMessageDto) {
    const message = await this.messageService.createMessageFromAdmin(data);
    this.server
      .to(`user-room-${data.conversation.id}`)
      .emit('messageFromAdmin');

    this.server.emit('messageToAdmin');
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody() data: { conversationId: number },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(333, data);
    client.join(`user-room-${data.conversationId}`);
  }
}
