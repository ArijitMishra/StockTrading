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
    if (localStorage.UserName === '') {
      this.router.navigate(['/login']);
    }
    this.User=localStorage.UserName;
    localStorage.count=1;
  }

}
