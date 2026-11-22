import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonButton,IonContent,IonHeader,IonTitle,IonToolbar } from '@ionic/angular/standalone';
import { AuthService } from '../../core/services/auth.service';
@Component({standalone:true,imports:[RouterLink,IonButton,IonContent,IonHeader,IonTitle,IonToolbar],template:`
<ion-header><ion-toolbar><ion-title>Friends</ion-title></ion-toolbar></ion-header>
<ion-content class="ion-padding"><main class="welcome"><h1>Friends</h1><p>Conoce personas. Empieza conversaciones.</p><ion-button expand="block" (click)="auth.login()">Entrar (demo)</ion-button><ion-button expand="block" fill="outline" routerLink="/register">Crear perfil (demo)</ion-button><small>Sin autenticación real ni Firebase.</small></main></ion-content>`,
styles:[`.welcome{max-width:420px;margin:18vh auto 0;text-align:center}h1{font-size:3rem}small{display:block;margin-top:20px;color:var(--ion-color-medium)}`]})
export class LoginPage{constructor(readonly auth:AuthService){}}
