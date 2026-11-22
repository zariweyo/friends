import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Temporary fake authentication for the GitHub Pages prototype.
 * No credentials are checked, stored, or sent to Firebase.
 * Replace this entire implementation before production.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly loggedIn = signal(sessionStorage.getItem('friends_demo_login') === 'true');
  constructor(private readonly router: Router) {}

  async login(): Promise<void> {
    sessionStorage.setItem('friends_demo_login', 'true');
    this.loggedIn.set(true);
    await this.router.navigateByUrl('/home', { replaceUrl: true });
  }

  async logout(): Promise<void> {
    sessionStorage.removeItem('friends_demo_login');
    this.loggedIn.set(false);
    await this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
