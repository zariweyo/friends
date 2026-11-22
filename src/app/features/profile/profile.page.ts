import { Component } from '@angular/core';
import { IonHeader,IonToolbar,IonTitle,IonContent,IonButton } from '@ionic/angular/standalone';
import { AppNavigationComponent } from '../../shared/components/app-navigation.component';
import { AuthService } from '../../core/services/auth.service';
@Component({standalone:true,imports:[IonHeader,IonToolbar,IonTitle,IonContent,IonButton,AppNavigationComponent],template:`<ion-header><ion-toolbar><ion-title>Mi perfil</ion-title></ion-toolbar></ion-header><ion-content class="ion-padding"><h2>Mi perfil</h2><p>Próximamente: Foto única, nombre, edad, población y sexo.</p><ion-button fill="outline" (click)="auth.logout()">Cerrar sesión</ion-button></ion-content><app-navigation />`})
export class ProfilePage {constructor(readonly auth:AuthService){}}
