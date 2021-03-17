import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  User!:any;
  Email!:any;
  Contact!: any;
  Dob!:any;
  Address!:any;
  constructor(private router: Router) { }



  ngOnInit(): void {
    if (localStorage.UserName === '') {
      this.router.navigate(['/login']);
    }
    this.User=localStorage.UserName;
    this.Email = localStorage.email
    localStorage.count=1;
  }

}
