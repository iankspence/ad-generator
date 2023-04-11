import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: 'http://localhost:4200', credentials: true } })
export class ReviewGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    handleConnection(client: any) {
        console.log('Client connected:', client.id);
    }

    handleDisconnect(client: any) {
        console.log('Client disconnected:', client.id);
    }
}
