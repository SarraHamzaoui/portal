import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  providers: [ChatService],
})
export class ChatComponent implements OnInit, OnDestroy {
  public message: string = '';
  public messages: any[] = [];
  public userData: any = JSON.parse(localStorage.getItem('userData') || '{}');
  public typing: boolean = false;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.receiveMessage().subscribe(
      (data) => {
        console.log(data);
        this.messages.push(data);
      },
      (error) => {
        console.error('Error receiving message:', error);
      }
    );
  }

  ngOnDestroy(): void {
    this.chatService.disconnect();
  }

  public sendMessage() {
    const data = {
      message: this.message,
      username: this.userData.username,
      email: this.userData.email,
      role: this.userData.role,
    };
    this.chatService.sendMessage(data);
    this.messages.push(data);
    this.message = '';
  }

  onchange() {
    this.typing = true;
    this.chatService.typing();
  }
}
