import { Injectable } from '@angular/core';
import { io, Socket } from "socket.io-client";
// import { io, Socket } from 'socket.io-client';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket!: Socket;
  private serverUrl = environment.socket_url;

  constructor() {

   
    
  }

  connect(email: string) {
     this.socket = io(this.serverUrl, {transports: ['websocket', 'polling', 'flashsocket']});

    this.socket.on('connect', () => {
        console.log('Socket connected:', this.socket.id);
      });

    this.socket.emit("register", email);
  }

  sendCallRequest(from: string, targetEmail: string, live_token , live_channelName, live_uid, live_appId) {

    // console.log('from-call-user',from);
    // console.log('targetEmail-call-user',targetEmail);
    // console.log('live_token-call-user',live_token);
    // console.log('live_channelName-call-user',live_channelName);
    // console.log('live_uid-call-user',live_uid);
    this.socket.emit("call-user", { from, targetEmail, live_token, live_channelName, live_uid, live_appId });
  }

  acceptCall(from: string, targetEmail: string, channel: string) {
    this.socket.emit("accept-call", { from, targetEmail, channel });
  }

  rejectCall(from: string) {
    this.socket.emit("reject-call", { from });
  }

  onEvent(event: string, callback: (data: any) => void) {
    this.socket.on(event, callback);
  }
}