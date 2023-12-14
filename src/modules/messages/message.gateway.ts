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

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessageGateway {
  @WebSocketServer()
  server: Server;
  constructor(private messageService: MessageService) {}

  @SubscribeMessage('messages')
  createMessage(@MessageBody() data: CreateMessageDto) {
    try {
      this.messageService.createMessage(data);
    } catch (error) {
      console.log(11, error);
    }
  }

  @SubscribeMessage('sendMessageToAdmin')
  async sendMessageToAdmin(
    @MessageBody() data: { conversationId: number; data: any },
  ) {
    console.log(1111, data);

    this.server
      .to(`admin-room`)
      .emit('messageFromUser', {
        conversationId: data.conversationId,
        message: data.data,
      });
  }

  @SubscribeMessage('sendMessageToUser')
  async sendMessageToUser(
    @MessageBody() data: { conversationId: number; data: any },
  ) {
    console.log(222, data);
    this.server
      .to(`user-room-${data.conversationId}`)
      .emit('messageFromAdmin', { message: data.data });
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
