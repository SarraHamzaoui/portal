import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {

  public message: string = '';
  public messages: string[] = [];

  constructor(private chatService: ChatService) {

  }

  ngOnInit(): void {
    this.chatService.onMessage((msg: string) => {
      this.messages.push(msg);
    });
  }

  public sendMessage() {
    this.chatService.sendMessage(this.message);
    this.messages.push(this.message);
    this.message = '';
  }

  public listMessages() {

  }

}

