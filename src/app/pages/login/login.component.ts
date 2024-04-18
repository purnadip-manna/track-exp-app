import {
  GoogleSigninButtonModule,
  SocialAuthService,
} from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [GoogleSigninButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  user: any;
  constructor(
    private authService: SocialAuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;      
      this.http
        .post<any>(`${environment.API_URL}/login/google`, {
          idToken: user.idToken,
        })
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
