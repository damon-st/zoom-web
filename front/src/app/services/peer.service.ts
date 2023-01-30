import { Injectable } from '@angular/core';
import Peer from 'peerjs';

@Injectable({
  providedIn: 'root'
})
export class PeerService {

  peer:Peer;
  constructor() {
    this.peer = new Peer({
      host:"localhost",
      port:3001,
    })
   }
}
