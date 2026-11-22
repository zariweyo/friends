import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth, firebaseConfigured } from '../firebase/firebase.config';
const isLoggedIn=async():Promise<boolean>=>{if(!firebaseConfigured)return false;if(firebaseAuth.currentUser)return true;return new Promise(resolve=>{let done=false;const off=onAuthStateChanged(firebaseAuth,u=>{if(!done){done=true;resolve(!!u);queueMicrotask(off);}},()=>resolve(false));});};
export const authGuard:CanActivateFn=async()=>await isLoggedIn()||inject(Router).parseUrl('/login');
export const guestGuard:CanActivateFn=async()=>!await isLoggedIn()||inject(Router).parseUrl('/discover');
