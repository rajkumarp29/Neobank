import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

/**
 * Admin guard - Only allows users with role ADMIN/MANAGER to access /admin-panel/*
 */
export const adminAuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token  = localStorage.getItem('token');

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  let role = '';
  try {
    const rawUser = localStorage.getItem('user');
    if (rawUser) {
      role = (JSON.parse(rawUser)?.role || '').toString().toUpperCase();
    }
  } catch { /* ignore */ }

  if (role === 'ADMIN' || role === 'MANAGER') {
    return true;
  }

  router.navigate(['/dashboard/home']);
  return false;
};