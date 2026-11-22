import { Component } from '@angular/core';
import { IonButton,IonContent,IonHeader,IonTitle,IonToolbar } from '@ionic/angular/standalone';
import { DemoDataService } from '../../core/services/demo-data.service';
import { AppNavigationComponent } from '../../shared/components/app-navigation.component';
@Component({standalone:true,imports:[IonButton,IonContent,IonHeader,IonTitle,IonToolbar,AppNavigationComponent],template:`
<ion-header><ion-toolbar><ion-title>Solicitudes</ion-title></ion-toolbar></ion-header><ion-content class="ion-padding"><div class="page"><h2>Primeros mensajes</h2>
@for(r of data.requests();track r.id){<section class="panel"><strong>{{data.person(r.fromId)?.name}} → {{data.person(r.toId)?.name}}</strong><p>{{r.text}}</p><small>Estado: {{r.status}}</small>
@if(r.status==='pending' && r.toId==='demo'){<div><ion-button (click)="data.respond(r.id,true)">Aceptar</ion-button><ion-button color="medium" fill="outline" (click)="data.respond(r.id,false)">Rechazar</ion-button></div>}</section>}
</div></ion-content><app-navigation />`,styles:[`.page{max-width:650px;margin:auto}.panel{border:1px solid #ddd;border-radius:12px;padding:16px;margin:12px 0}`]})
export class RequestsPage {constructor(readonly data:DemoDataService){}}
