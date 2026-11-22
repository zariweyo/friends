import { Component } from '@angular/core';
import { IonHeader,IonToolbar,IonTitle,IonContent } from '@ionic/angular/standalone';
import { AppNavigationComponent } from '../../shared/components/app-navigation.component';
@Component({standalone:true,imports:[IonHeader,IonToolbar,IonTitle,IonContent,AppNavigationComponent],template:`<ion-header><ion-toolbar><ion-title>Solicitudes</ion-title></ion-toolbar></ion-header><ion-content class="ion-padding"><h2>Solicitudes</h2><p>Próximamente: Aceptar o rechazar primeros mensajes.</p></ion-content><app-navigation />`})
export class RequestsPage {}
