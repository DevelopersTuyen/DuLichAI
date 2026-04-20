import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DemoAuthService } from './demo-auth.service';
import { UserRole } from '../demo/demo-data';

export const authGuard: CanActivateFn = () => {
  const auth = inject(DemoAuthService);
  const router = inject(Router);

  return auth.isAuthenticated() ? true : router.parseUrl('/login');
};

export const guestGuard: CanActivateFn = () => {
  const auth = inject(DemoAuthService);
  const router = inject(Router);
  const user = auth.currentUser();

  return user ? router.parseUrl(auth.homePath(user.role)) : true;
};

export const roleGuard = (role: UserRole): CanActivateFn => {
  return () => {
    const auth = inject(DemoAuthService);
    const router = inject(Router);
    const user = auth.currentUser();

    if (!user) {
      return router.parseUrl('/login');
    }

    return user.role === role ? true : router.parseUrl(auth.homePath(user.role));
  };
};
