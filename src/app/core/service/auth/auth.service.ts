import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn():boolean{
    return (localStorage.getItem("access_token"))?true:false;
  }
}
