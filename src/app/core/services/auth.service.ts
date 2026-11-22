import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword, FacebookAuthProvider, GoogleAuthProvider, OAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, User } from 'firebase/auth';
import { firebaseAuth, firebaseConfigured } from '../firebase/firebase.config';
export type SocialProvider = 'google'|'facebook'|'apple';
@Injectable({providedIn:'root'}) export class AuthService {
readonly user=signal<User|null>(null); readonly ready=signal(false);
constructor(private router:Router){onAuthStateChanged(firebaseAuth,u=>{this.user.set(u);this.ready.set(true);},()=>this.ready.set(true));}
private check(){if(!firebaseConfigured)throw new Error('Configura Firebase en firebase.config.ts.');}
async login(email:string,password:string){this.check();await signInWithEmailAndPassword(firebaseAuth,email,password);await this.router.navigateByUrl('/discover',{replaceUrl:true});}
async register(email:string,password:string){this.check();await createUserWithEmailAndPassword(firebaseAuth,email,password);await this.router.navigateByUrl('/discover',{replaceUrl:true});}
async socialLogin(provider:SocialProvider){this.check();const p=provider==='google'?new GoogleAuthProvider():provider==='facebook'?new FacebookAuthProvider():new OAuthProvider('apple.com');await signInWithPopup(firebaseAuth,p);await this.router.navigateByUrl('/discover',{replaceUrl:true});}
async logout(){await signOut(firebaseAuth);await this.router.navigateByUrl('/login',{replaceUrl:true});}
}
