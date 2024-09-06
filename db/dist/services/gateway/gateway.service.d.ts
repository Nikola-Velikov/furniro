import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class GatewayService implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private clients;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    sendEmailPayloadToClients(payload: any): void;
}
