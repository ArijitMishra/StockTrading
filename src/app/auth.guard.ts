import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ContactService } from './contact.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private _authService:ContactService,private _router:Router){}

  canActivate():boolean{

    if(this._authService.loggedIn()){     //This is a loggedIn function which is called from ContactService Service file.
      return true;                        //If token exists then it returns true and user is permitted to navigate on any component.
    }
    else
    {
      this._router.navigate(['/login']);    //This else is called when token doesn't exists.
      return false;
    }
  }
  
}
