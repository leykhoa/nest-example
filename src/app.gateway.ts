import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class AppGateway {
  // @SubscribeMessage('message')
  // handleMessage(@MessageBody() data: any): any {
  //   console.log('Data', data);

  //   return data;
  // }
}
