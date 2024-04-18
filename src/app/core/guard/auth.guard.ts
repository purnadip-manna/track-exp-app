import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';

export const authGuard: CanActivateFn = (routes, state) => {
  const router = inject(Router);
  const auth = inject(AuthService);

  if (!auth.isLoggedIn()) {
    router.navigate(['login']);
    return false;
  }
  return true;
};
