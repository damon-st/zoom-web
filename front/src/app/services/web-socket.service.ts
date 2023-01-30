import { EventEmitter, Injectable } from '@angular/core';
import {Socket}from "ngx-socket-io";
@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  events = ["new-user","bye-user"];
  cbEvnt:EventEmitter<any>=new EventEmitter();
  constructor(private socket:Socket) {
    this.listener();
  }


  listener=()=>{
    this.events.forEach(e=>{
      this.socket.on(e,(data:any)=>this.cbEvnt.emit({
        name:e,
        data
      }));
    })
  }

  joinRoom=(data:any)=>{
    this.socket.emit("join",data);
  }
}
