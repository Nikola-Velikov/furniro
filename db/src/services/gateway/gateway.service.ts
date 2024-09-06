import { Injectable } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@Injectable()
@WebSocketGateway({ cors: true }) 
export class GatewayService implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: Server;
  private clients: Set<Socket> = new Set();

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    this.clients.add(client);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.clients.delete(client);
  }

  sendEmailPayloadToClients(payload: any) {
    this.server.emit('emailToClient', payload);
  }
}
