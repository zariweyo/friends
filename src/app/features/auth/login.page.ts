import { Component, signal } from '@angular/core';
import { IonButton, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AuthService } from '../../core/services/auth.service';

@Component({
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar],
  template: `
    <ion-header><ion-toolbar><ion-title>Friends</ion-title></ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <main class="welcome">
        <h1>Friends</h1>
        <p>Conoce personas. Empieza conversaciones.</p>
        <ion-button expand="block" [disabled]="busy()" (click)="login()">Entrar</ion-button>
        <small>Acceso de demostración: sin registro ni autenticación real.</small>
      </main>
    </ion-content>
  `,
  styles: [`
    .welcome { max-width: 420px; margin: 18vh auto 0; text-align: center; }
    h1 { font-size: 3rem; margin-bottom: 0.5rem; }
    p { color: var(--ion-color-medium); margin-bottom: 2rem; }
    small { display: block; margin-top: 1.5rem; color: var(--ion-color-medium); }
  `],
})
export class LoginPage {
  readonly busy = signal(false);
  constructor(private readonly auth: AuthService) {}
  async login(): Promise<void> {
    this.busy.set(true);
    try { await this.auth.login(); }
    finally { this.busy.set(false); }
  }
}
