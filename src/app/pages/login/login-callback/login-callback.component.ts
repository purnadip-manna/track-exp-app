import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-callback',
  templateUrl: './login-callback.component.html',
  styleUrls: ['./login-callback.component.css'],
})
export class LoginCallbackComponent implements OnInit {
  constructor(private router: Router) {
    const access_token = window.location.hash.split('#access_token=')[1];
    if (access_token === null) router.navigateByUrl('/login');

    localStorage.setItem('access_token', access_token);
    const payload = this.decodeJWT(access_token);
    localStorage.setItem('name', payload.name);
    localStorage.setItem('picture', payload.picture);
    localStorage.setItem('email', payload.email);
    localStorage.setItem('isLoggedIn', 'true');
    router.navigateByUrl('/');
  }

  ngOnInit(): void {}

  decodeJWT = (token: string) => {
    return JSON.parse(atob(token.split('.')[1]));
  };
}
