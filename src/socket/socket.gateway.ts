import {MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import {Server, Socket} from "socket.io";

@WebSocketGateway()
export class SocketGateway {
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.log('Socket server initialized');
  }

  @SubscribeMessage('message')
  onNewMessage(@MessageBody() body: any) {
    console.log(body)
    this.server.emit('onMessage',{
      msg:'new Message',
      content:body
    })
  }


  @SubscribeMessage('getRoomList')
  handleGetRoomList(client: any, data: any): void {
    this.server.emit('roomList', Array.from(this.rooms.keys()));
  }

  private rooms = new Map<string, Set<Socket>>();

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.leaveRoom(client);
  }


  @SubscribeMessage('createRoom')
  handleCreateRoom(client: Socket, roomName: string) {
    this.leaveRoom(client);
    client.join(roomName);
    this.addToRoom(roomName, client);
    this.server.to(roomName).emit('roomCreated', roomName);
    this.server.emit('roomList', Array.from(this.rooms.keys()));
  }
  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, roomName: string) {
    this.leaveRoom(client);
    client.join(roomName);
    this.addToRoom(roomName, client);
    this.server.to(roomName).emit('userJoined', client.id);
  }
  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, roomName: string) {
    this.leaveRoomByName(client, roomName);
    this.server.emit('roomList', Array.from(this.rooms.keys()));
  }

  private leaveRoomByName(client: Socket, roomName: string) {
    if (roomName) {
      client.leave(roomName);
      this.removeFromRoom(roomName, client);
      this.server.to(roomName).emit('userLeft', client.id);
    }
  }



  private leaveRoom(client: Socket) {
    Object.keys(client.rooms).forEach((room) => {
      if (room !== client.id) {
        client.leave(room);
        this.removeFromRoom(room, client);
        this.server.to(room).emit('userLeft', client.id);
      }
    });
  }

  private addToRoom(room: string, client: Socket) {
    if (!this.rooms.has(room)) {
      this.rooms.set(room, new Set());
    }
    this.rooms.get(room).add(client);
  }
  private removeFromRoom(room: string, client: Socket) {
    if (this.rooms.has(room)) {
      this.rooms.get(room).delete(client);
      if (this.rooms.get(room).size === 0) {
        this.rooms.delete(room);
      }
    }
  }


}
