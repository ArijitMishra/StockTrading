import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {
  User!:any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    if (localStorage.UserName === '') {     //If user not login then it navigate to login page
      this.router.navigate(['/login']);
    }
    this.User=localStorage.UserName;        //If user exits then it store it's name to localstorage 
    localStorage.count=1;
  }

}
