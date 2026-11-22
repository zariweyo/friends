import { Component } from '@angular/core';
import { IonHeader,IonToolbar,IonTitle,IonContent } from '@ionic/angular/standalone';
import { AppNavigationComponent } from '../../shared/components/app-navigation.component';
@Component({standalone:true,imports:[IonHeader,IonToolbar,IonTitle,IonContent,AppNavigationComponent],template:`<ion-header><ion-toolbar><ion-title>Privacidad y preferencias</ion-title></ion-toolbar></ion-header><ion-content class="ion-padding"><h2>Privacidad y preferencias</h2><p>Próximamente: Filtros independientes, bloqueos y visibilidad por localidad.</p></ion-content><app-navigation />`})
export class SettingsPage {}
