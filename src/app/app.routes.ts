import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/guards/auth.guard';

export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'login', canActivate: [guestGuard], loadComponent: () => import('./features/auth/login.page').then(m => m.LoginPage) },
  { path: 'home', canActivate: [authGuard], loadComponent: () => import('./features/home/home.page').then(m => m.HomePage) },
  { path: '**', redirectTo: 'home' },
];
