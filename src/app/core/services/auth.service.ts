import { Injectable,signal } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({providedIn:'root'})
export class AuthService{
 readonly loggedIn=signal(sessionStorage.getItem('friends_demo_login')==='true');
 constructor(private readonly router:Router){}
 async login(){sessionStorage.setItem('friends_demo_login','true');this.loggedIn.set(true);await this.router.navigateByUrl('/discover',{replaceUrl:true});}
 async logout(){sessionStorage.removeItem('friends_demo_login');this.loggedIn.set(false);await this.router.navigateByUrl('/login',{replaceUrl:true});}
}
