import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonButton, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AuthService } from '../../core/services/auth.service';
import { AppNavigationComponent } from '../../shared/components/app-navigation.component';
@Component({ standalone:true, imports:[RouterLink,IonButton,IonContent,IonHeader,IonTitle,IonToolbar,AppNavigationComponent],
template:`<ion-header><ion-toolbar><ion-title>Friends</ion-title><ion-button slot="end" fill="clear" (click)="auth.logout()">Logout</ion-button></ion-toolbar></ion-header>
<ion-content class="ion-padding"><main class="cover"><h1>Friends</h1><p>Conoce personas. Empieza conversaciones.</p><ion-button routerLink="/discover">Descubrir personas</ion-button><ion-button fill="outline" routerLink="/settings">Mis preferencias</ion-button><p><small>Prototipo con datos ficticios · Sin Firestore</small></p></main></ion-content><app-navigation />`,
styles:[`.cover{min-height:65vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:12px}h1{font-size:3rem;margin:0}p{color:var(--ion-color-medium)}`]})
export class HomePage {constructor(readonly auth:AuthService){}}
