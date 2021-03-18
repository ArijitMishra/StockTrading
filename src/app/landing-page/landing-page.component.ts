import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css','../../assets/css/landing-page.css']
})
export class LandingPageComponent implements OnInit {
  
  
  constructor() { }
  ngOnInit(): void {
   //It removes all localstorage that store at the time of login or register after logout
    localStorage.removeItem('token');
    localStorage.removeItem('company');
    localStorage.removeItem('UserName');
    localStorage.removeItem('graph');
    localStorage.removeItem('count');
    localStorage.removeItem('prev');
    localStorage.removeItem('email');
    localStorage.removeItem('contact');
    localStorage.removeItem('dob');
    localStorage.removeItem('address');
  }

}
