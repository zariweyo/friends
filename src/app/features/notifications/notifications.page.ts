import { Component } from '@angular/core';
import { IonButton,IonContent,IonHeader,IonTitle,IonToolbar } from '@ionic/angular/standalone';
import { DemoDataService } from '../../core/services/demo-data.service';
import { AppNavigationComponent } from '../../shared/components/app-navigation.component';
@Component({standalone:true,imports:[IonButton,IonContent,IonHeader,IonTitle,IonToolbar,AppNavigationComponent],template:`
<ion-header><ion-toolbar><ion-title>Notificaciones</ion-title></ion-toolbar></ion-header><ion-content class="ion-padding"><main class="page"><h2>Avisos</h2>
<ion-button fill="outline" (click)="data.markNotificationsRead()">Marcar todas como leídas</ion-button>
@for(n of data.notifications();track n.id){<section class="panel"><strong>{{n.read?'Leída':'Nueva'}} · {{n.kind}}</strong><p>{{n.text}}</p><small>{{n.createdAt}}</small></section>}
@if(!data.notifications().length){<p>No tienes avisos.</p>}
<p><small>Demo local: los avisos se generan para las acciones del usuario de prueba. Las notificaciones entre cuentas y las push llegarán con el backend.</small></p>
</main></ion-content><app-navigation />`,styles:[`.page{max-width:650px;margin:auto}.panel{border:1px solid #ddd;border-radius:12px;padding:14px;margin:12px 0}`]})
export class NotificationsPage{constructor(readonly data:DemoDataService){}}
