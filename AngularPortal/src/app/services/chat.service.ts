import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

const backendUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket: Socket;

  constructor() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.socket = io(backendUrl, {
      query: {
        userId: userData._id,
      },
      transports: ['websocket'],
    });

    this.socket.on('connect_error', (err) => {
      console.error('Socket connection error:', err);
    });
  }

  public sendMessage(data: any) {
    this.socket.emit('sendMessage', data);
  }

  public receiveMessage(): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on('receiveMessage', (data: any) => {
        subscriber.next(data);
      });
      return () => {
        this.socket.off('receiveMessage');
      };
    });
  }

  public typing(): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on('typing', (data: any) => {
        subscriber.next(data);
      });
      return () => {
        this.socket.off('receiveMessage');
      };
    });
  }

  public stopTyping(): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on('stopTyping', (data: any) => {
        subscriber.next(data);
      });
      return () => {
        this.socket.off('receiveMessage');
      };
    });
  }

  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
