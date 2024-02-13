import { SocialAuthService } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: any;
  loggedIn: any;

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private authService: SocialAuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
      console.log('Login Successful');
      console.log(user);
      this.http
        .post<any>('http://localhost:8080/api/v1/login/google',{idToken: user.idToken})
        .subscribe((data) => {
          const access_token = data.idToken;
          localStorage.setItem('access_token', access_token);
          const payload = this.decodeJWT(access_token);
          localStorage.setItem('name', payload.name);
          localStorage.setItem('picture', payload.picture);
          localStorage.setItem('email', payload.email);
          localStorage.setItem('isLoggedIn', 'true');
          this.router.navigateByUrl('/');
        });
    });
  }

  decodeJWT = (token: string) => {
    return JSON.parse(atob(token.split('.')[1]));
  };
}
