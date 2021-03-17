import { Component, OnInit } from '@angular/core';
import { ContactModel } from '../contactModel';
import { ContactService } from '../contact.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { url } from '../api';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  User!: any;

  Company!: any;
  Stocks!: any;
  Price!: any;
  Total_Price!: any;


  constructor(private http: HttpClient, private contactService: ContactService, private route: ActivatedRoute, private router: Router) { }

  payment() {

    if (this.Stocks == undefined) {
      alert("Select No. of Stocks");
      return;
    }
    const paymentDetails = {
      Stocks: this.Stocks
    }

    this.http.get(url.api + "realTime/" + this.Company).subscribe((response: any) => {
      //alert(response);
      this.Price = parseFloat(response["price"]);
      this.Total_Price = (parseFloat("" + this.Price * this.Stocks)).toFixed(2);
      console.log(this.Price);
      console.log(this.Total_Price);
      (<HTMLInputElement>document.getElementById("btnExcel")).disabled = false;
      (<HTMLInputElement>document.getElementById("btnExcel1")).disabled = false;

    });

  }
  pay() {
    let url1 =url.pay + "paywithpaytm?amount=" + this.Total_Price;
    window.open(url1, "_blank");
    
  }


  ngOnInit(): void {

    if (localStorage.UserName === '') {
      this.router.navigate(['/login']);
    }
  
    //alert(localStorage.company);
    this.User = localStorage.UserName;
    this.Company = localStorage.company;
    //alert(this.Company);
    localStorage.count = 1;

  }

}
