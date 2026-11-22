import { Component } from '@angular/core';
import { IonHeader,IonToolbar,IonTitle,IonContent } from '@ionic/angular/standalone';
import { AppNavigationComponent } from '../../shared/components/app-navigation.component';
@Component({standalone:true,imports:[IonHeader,IonToolbar,IonTitle,IonContent,AppNavigationComponent],template:`<ion-header><ion-toolbar><ion-title>Descubrir personas</ion-title></ion-toolbar></ion-header><ion-content class="ion-padding"><h2>Descubrir personas</h2><p>Próximamente: Lista de perfiles por distancia y última conexión, sin swipe ni likes.</p></ion-content><app-navigation />`})
export class DiscoverPage {}
