import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket = io('http://localhost:3000');

  constructor() { }

  public sendMessage(message: string) {
    this.socket.emit('message', message);
  }

  public listMessages() {

  }


  public onMessage(callback: (message: string) => void) {
    this.socket.on('response', (data) => {
      callback(data.message); // Transmission au composant
    });
  }
}






