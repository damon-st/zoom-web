import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-botton',
  templateUrl: './menu-botton.component.html',
  styleUrls: ['./menu-botton.component.scss']
})
export class MenuBottonComponent {

  menu:Array<{name:string,icon:string}> =[
    {
      name:"Muted",
      icon:"uil uil-microphone"
    },
    {
      name:"Home",
      icon:"uil uil-estate"
    },
    {
      name:"Shared",
      icon:"uil uil-share"
    },
  ]
}
