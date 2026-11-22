import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/guards/auth.guard';
export const appRoutes: Routes = [
{path:'',pathMatch:'full',redirectTo:'discover'},
{path:'login',canActivate:[guestGuard],loadComponent:()=>import('./features/auth/login.page').then(m=>m.LoginPage)},
{path:'register',canActivate:[guestGuard],loadComponent:()=>import('./features/auth/register.page').then(m=>m.RegisterPage)},
{path:'discover',canActivate:[authGuard],loadComponent:()=>import('./features/discover/discover.page').then(m=>m.DiscoverPage)},
{path:'requests',canActivate:[authGuard],loadComponent:()=>import('./features/requests/requests.page').then(m=>m.RequestsPage)},
{path:'chats',canActivate:[authGuard],loadComponent:()=>import('./features/chats/chats.page').then(m=>m.ChatsPage)},
{path:'profile',canActivate:[authGuard],loadComponent:()=>import('./features/profile/profile.page').then(m=>m.ProfilePage)},
{path:'settings',canActivate:[authGuard],loadComponent:()=>import('./features/settings/settings.page').then(m=>m.SettingsPage)},
{path:'**',redirectTo:'discover'}];
