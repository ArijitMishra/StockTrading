import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ContactModel } from '../contactModel';
import { ContactService } from '../contact.service';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(private contactService: ContactService, private route: ActivatedRoute, private router: Router) { }
  hidden_Name!: any;
  async registration() {
//In this function we write validation code for All Fields must be filled and Contact, Password and Email follow their pattern.
    if (this.Name == '' || this.Contact == undefined || this.Gender == '' || this.Dob == '' || this.Account == '' || this.Address == '' || this.Email == '' || this.Password == '') {
      alert("Fill All Details");
    }
    else {

       let contactExp = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);        //Regular expression for contact
       /*  Valid Contacts formats:
  
       (123) 456-7890
       (123)456-7890
       123-456-7890
       123.456.7890
       1234567890
       +31636363634
       075-63546725*/
      var str_Contact = new String(this.Contact);      
      
      if (str_Contact.length === 10 && contactExp.test(str_Contact+'')) 
      {
        let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
       //Regular expression for email
        if (regexp.test("" + this.Email)) 
        {
          if (!(this.Password.length >= 12))          //password length must be 12 or above 12
          {
            alert("Password must be 12 characters or more than 12 characters!!");
          }
          else
          {
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
              ; (await this.contactService.addContact(newContact)).subscribe(contactModel => {      //Calling addContact function from ContactService.ts file
                //alert(contactModel.err);
                     if (!contactModel.err) {
                         alert("User already exists !!");                       //If user already exists then it redirect to landing page
                        this.router.navigate(['landing-page']);
                     }
                    else {  
                        localStorage.UserName = '';                         //Initializing 10 localstorage value
                        localStorage.company = '';
                        localStorage.graph = 'undefined';
                        localStorage.count = 0;
                        localStorage.prev = 'undefined';
                        localStorage.setItem('token', contactModel.token_key);
                        localStorage.UserName = contactModel.name;
                         localStorage.email = contactModel.email;
                        localStorage.dob = contactModel.dob;
                         localStorage.contact = contactModel.contact;
                         localStorage.address = contactModel.address;
                        this.router.navigate(['dashboard/' + contactModel.name]);     //Successful registration redirect to dashboard
                     }

              })
          } 
         

        }
        else
        {
          alert("Invalid Email !! ");
        }



      }
      else 
      {
        alert("Contact Length must be 10 digits and a valid telephone number!!");
      }

    }
  }



  ngOnInit(): void {
  }

}
