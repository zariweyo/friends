import { Component } from '@angular/core';
import { IonButton, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AuthService } from '../../core/services/auth.service';

@Component({
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Friends</ion-title>
        <ion-button slot="end" fill="clear" (click)="logout()">Logout</ion-button>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <main class="cover">
        <h1>Friends</h1>
        <p>Bienvenido a Friends</p>
      </main>
    </ion-content>
  `,
  styles: [`
    .cover { min-height: 60vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
    h1 { font-size: 3rem; margin: 0; }
    p { color: var(--ion-color-medium); }
  `],
})
export class HomePage {
  constructor(private readonly auth: AuthService) {}
  async logout(): Promise<void> { await this.auth.logout(); }
}
