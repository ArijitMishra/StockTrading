import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ContactModel } from '../contactModel';
import { ContactService } from '../contact.service';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  contactModels!: ContactModel[];
  contactModel!: ContactModel;
  Name: String = '';
  Gender: String = '';
  Contact!: Number;
  Dob: String = '';
  Account: String = '';
  Address: String = '';
  Email: String = '';
  Password: String = '';

  constructor(private contactService: ContactService,private route: ActivatedRoute, private router: Router) { }
  hidden_Name!: any;
  async registration() {

    if (this.Name == '' || this.Contact == undefined || this.Gender == '' || this.Dob == '' || this.Account == '' || this.Address == '' || this.Email == '' || this.Password == '') {
      alert("Fill All Details");
    }
    else {
      if (!(this.Password.length >= 12)) {
        alert("Password must be 12 characters or more than 12 characters");
      }
      else {
        const newContact = {
          Name: this.Name,
          Gender: this.Gender,
          Contact: this.Contact,
          Dob: this.Dob,
          Account: this.Account,
          Address: this.Address,
          Email: this.Email,
          Password: this.Password
        }
        ;(await this.contactService.addContact(newContact)).subscribe(contactModel => {

          if(!contactModel.err)
          {
              alert("User already exists !!");
              this.router.navigate(['landing-page']);
          }
          else
          {  
            localStorage.setItem('token',contactModel.token_key);
            localStorage.UserName=contactModel.name;
            this.router.navigate(['dashboard/'+contactModel.name]);
          }
         
       
          /*if(!contactModel)
          {
            alert("Email Already Exist !!");
            
          }
          else
          {
            alert("Registered Successfully !!");
            this.router.navigate(['landing-page']);
          }*/
        })
      }
    }
  }



  ngOnInit(): void {
  }

}
