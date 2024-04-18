import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

import { HttpInterceptorFn } from '@angular/common/http';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  const authToken = localStorage.getItem('access_token');

  let authReq: any = req;

  if (authToken) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  }

  return next(authReq).pipe(
    catchError((err) => {      
      switch (err.status) {
        case 400:
          router.navigateByUrl('/error?id=0');
          break;
        case 401:
          localStorage.clear();
          router.navigateByUrl('/login');
          break;
        case 403:
          router.navigateByUrl('/error?id=3');
          break;
        case 404:
          router.navigateByUrl('/error?id=4');
          break;
        default:
          router.navigateByUrl('/error?id=x');
          break;
      }
      return throwError(err);
    })
  );
};
