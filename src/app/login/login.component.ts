import { Component, OnInit } from '@angular/core';
import { ContactModel } from '../contactModel';
import { ContactService } from '../contact.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  contactModels!: ContactModel[];
  contactModel!: ContactModel;
  Email!: String;
  Password!: String;

  constructor(private contactService: ContactService, private route: ActivatedRoute, private router: Router) { }

  async login123() {
    //console.log(this.Email+" "+this.Password);
    const newContact = {
      Email: this.Email,
      Password: this.Password
    }

      ; (await this.contactService.login(newContact)).subscribe(contactModel => {
        if (!contactModel.err) {
          alert("Invalid Credentials");
          this.router.navigate(['landing-page']);
        }
        else {
          localStorage.UserName = '';
          localStorage.company = '';
          localStorage.graph = 'undefined';
          localStorage.count = 0;
          localStorage.prev = 'undefined';

          localStorage.setItem('token', contactModel.token_key);
          localStorage.UserName = contactModel.name;
          localStorage.address = contactModel.address;
          localStorage.dob = contactModel.dob;
          localStorage.email = contactModel.email;
          localStorage.contact = contactModel.contact;        


          this.router.navigate(['dashboard/' + contactModel.name]);
        }
      })


  }



  ngOnInit() {

  }

}
