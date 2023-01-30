import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeerService } from 'src/app/services/peer.service';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { v4 } from 'uuid';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent  implements OnInit{

  currentStream:MediaStream|undefined;
  listUser:Array<{
    id:string,
    media:MediaStream,
  }> =[];
  roomName:string="";

  idUser:string;
  constructor(private router:ActivatedRoute,
    private webSocketSvc:WebSocketService,
    private peerSvc:PeerService){
      this.roomName = router.snapshot.paramMap.get("id")??"";
      this.idUser= v4();
      console.log(this.roomName);

    }

  ngOnInit(): void {
    this.checkMediaDevice();
    this.initPeer();
    this.initSocket();
  }

  initPeer =()=>{
    const peer = this.peerSvc.peer;
    peer.on("open",(id)=>{
      const body={
        idPeer:id,
        roomName:this.roomName,
      }
      this.idUser=id;
      console.log("id peer: ",id);
      this.webSocketSvc.joinRoom(body)
    })

    peer.on("call",(callEnter)=>{
      callEnter.answer(this.currentStream);
      callEnter.on("stream",(streamRemote)=>{
        this.addVideoUser(streamRemote,this.idUser);
      },(e:any)=>{
        console.log("ERRROR PERR: ",e);

      })
    })
  }

  initSocket=()=>{
    this.webSocketSvc.cbEvnt.subscribe(res=>{
      console.log(res);

      if(res.name =="new-user"){
        const {idPeer} =res.data;
        this.sendCall(idPeer,this.currentStream!);
      }else if(res.name =="bye-user"){
        this.listUser = this.listUser.filter(r=>r.id!=res.data.idPeer);
      }
      console.log("SOCKET: ",res);
    })
  }

  checkMediaDevice =()=>{
    if(navigator && navigator.mediaDevices){
      navigator.mediaDevices.getUserMedia({
        audio:false,
        video:true
      }).then((stream)=>{
        this.currentStream=stream;
        this.addVideoUser(this.currentStream,this.idUser);
      })
      .catch(()=>{
        console.log("ERROR NOT PERMISSION");

      })
    }else {
      console.log("ERRROR NOT MEDIA DEVICES");

    }
  }

  addVideoUser = (stream:MediaStream,idUser:string)=>{
    this.listUser.push({id:idUser,
    media:stream});
    const unique = new Set(this.listUser);
    this.listUser=[...unique];
  }

  sendCall =(idPeer:string,strema:MediaStream)=>{
      const newUserCall = this.peerSvc.peer.call(idPeer,strema);

      if(!!newUserCall){
        newUserCall.on("stream",(stream)=>{
          this.addVideoUser(stream,idPeer);
        })
      }
  }
}
