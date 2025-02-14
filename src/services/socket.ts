import { io, Socket } from "socket.io-client";

export class SocketService {
  private socket: Socket;
  private static instance: SocketService;

  private constructor() {
    const socketUrl = `${window.location.protocol}//${window.location.hostname}:8080`;
    this.socket =  io(socketUrl);

    this.socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    this.socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    this.socket.on("error", (error) => {
      console.error("WebSocket error:", error);
    });
  }

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  public getSocket(): Socket {
    return this.socket;
  }
}
