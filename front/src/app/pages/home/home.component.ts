import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {v4 }from "uuid";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private router:Router){}


  goToRoom =()=>{
    this.router.navigate(["/",v4()])
  }
}
