import { Component } from '@angular/core';
import { IonHeader,IonToolbar,IonTitle,IonContent } from '@ionic/angular/standalone';
import { AppNavigationComponent } from '../../shared/components/app-navigation.component';
@Component({standalone:true,imports:[IonHeader,IonToolbar,IonTitle,IonContent,AppNavigationComponent],template:`<ion-header><ion-toolbar><ion-title>Conversaciones</ion-title></ion-toolbar></ion-header><ion-content class="ion-padding"><h2>Conversaciones</h2><p>Próximamente: Chats después de aceptar una solicitud.</p></ion-content><app-navigation />`})
export class ChatsPage {}
