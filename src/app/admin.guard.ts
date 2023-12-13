import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth/components/auth.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export const AdminGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('access_token');
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.getUserData().pipe(
    map((user) => {
      if (user && user.role === 'admin') {
        return true;
      }else if(user && user.role === 'owner'){
        router.navigate(['user-vet']);
        return false;
      }else {
        router.navigate(['user-account']);
        return false;
      }
    }),
    catchError((error) => {
      console.error(error);
      router.navigate(['login']);
      return of(false);
    })
  );
};