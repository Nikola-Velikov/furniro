import { Injectable, OnModuleInit } from '@nestjs/common';
import { io, Socket } from 'socket.io-client';

@Injectable()
export class EmailListenerService implements OnModuleInit {
  private socket: Socket;

  onModuleInit() {
    // Connect to the WebSocket gateway of the first microservice
    this.socket = io('http://localhost:3000');  // Make sure this is the correct WebSocket server URL

    // Listen to the 'emailToClient' event
    this.socket.on('emailToClient', (payload) => {
      console.log(`Received email payload: ${payload.customer_email}`);
    });
  }
}
