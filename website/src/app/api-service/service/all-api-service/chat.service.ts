import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ChatService {

	private socket: Socket;
	public userdata:any;
	private url = environment.socket_url; // your server local path
    // private url = 'http://68.178.200.197:3000';

    // serverUrl = environment.api_url;

	constructor() {

		// alert(this.url);

		this.socket = io(this.url, {transports: ['websocket', 'polling', 'flashsocket']});

		this.socket.on('connect', () => {
	      console.log('Socket connected:', this.socket.id);
	    });

		this.userdata = JSON.parse(<string>localStorage.getItem("chatapp_user_data"));
		if(this.userdata){
			this.socket.emit('login',{userId:this.userdata['userid']});
		}
	    // console.log('this userdata', this.userdata['userid']);
		

		// this.socket.emit('alluserlist');
	}

	joinRoom(data): void {
		this.socket.emit('join', data);
	}

	sendMessage(data): void {
		this.socket.emit('message', data);
	}

	getMessage(): Observable<any> {
		return new Observable<{user: string, message: string, profile_image: string}>(observer => {
			this.socket.on('new message', (data) => {
				observer.next(data);
			});

			return () => {
				this.socket.disconnect();
			}
		});
	}

	getStorage() {
		const storage: string = localStorage.getItem('chats');
		return storage ? JSON.parse(storage) : [];
	}

	setStorage(data) {
		localStorage.setItem('chats', JSON.stringify(data));
	}

}
