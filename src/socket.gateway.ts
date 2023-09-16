import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage, MessageBody
} from '@nestjs/websockets';
import {Server, Socket} from 'socket.io';

@WebSocketGateway()
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;

    afterInit(server: Server) {
        console.log('Socket server initialized');
    }

    handleConnection(client: Socket, ...args: any[]) {
        console.log(`Client connected: ${client.id}`);

        // Send a welcome message to the client
        client.emit('message', 'Welcome to the server!');

        // Broadcast new connection to all clients
        this.server.emit('message', `User ${client.id} connected`);
        this.server.emit('newMessage', `User ${client.id} connected`);
    }

    @SubscribeMessage('newMessage')
    onNewMessage(@MessageBody() body: any) {
        console.log(body)
        this.server.emit('onMessage',{
            msg:'new Message',
            content:body
        })
    }
    @SubscribeMessage('message')
    handleMessage(client: Socket, @MessageBody() data: string) {
        this.server.emit('message', ` says: ${data}`);
    }
    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
    }
}