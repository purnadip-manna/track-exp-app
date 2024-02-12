import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('access_token');
    if (token) {
      request = request.clone({
        headers: request.headers
          .set('Authorization', 'Bearer ' + token)
      });
    }
    return next.handle(request).pipe(
      catchError(err => {
        switch(err.status){
          case 400:
            this.router.navigateByUrl('/error?id=0');
            break;
          case 401:
            localStorage.clear();
            this.router.navigateByUrl('/login');
            break;
          case 403:
            this.router.navigateByUrl('/error?id=3');
            break;
          case 404:
            this.router.navigateByUrl('/error?id=4');
            break;
          default:
            this.router.navigateByUrl('/error');
            break;
        }
        return throwError(err);
      })
    );
  }
}
