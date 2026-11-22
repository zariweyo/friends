import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton,IonContent,IonHeader,IonTitle,IonToolbar } from '@ionic/angular/standalone';
import { DemoDataService,Person } from '../../core/services/demo-data.service';
import { AppNavigationComponent } from '../../shared/components/app-navigation.component';
@Component({standalone:true,imports:[FormsModule,IonButton,IonContent,IonHeader,IonTitle,IonToolbar,AppNavigationComponent],template:`
<ion-header><ion-toolbar><ion-title>Buscar personas</ion-title></ion-toolbar></ion-header><ion-content class="ion-padding"><div class="page">
<h2>Personas cerca de ti</h2><p>Sin swipe · Orden aproximado por distancia · Datos demo</p>
@if(selected()){<section class="panel"><ion-button fill="clear" (click)="selected.set(null)">← Volver</ion-button>
<img class="large" [src]="selected()!.photo" alt="Foto de ejemplo" />
<h2>{{selected()!.name}}, {{selected()!.age}}</h2><p>{{data.city(selected()!.cityId)}} · {{selected()!.distanceKm}} km · {{selected()!.lastSeen}}</p>
<textarea [(ngModel)]="draft" placeholder="Escribe tu primer mensaje"></textarea>
<ion-button expand="block" [disabled]="!draft.trim()" (click)="request()">Enviar solicitud de conversación</ion-button>
<ion-button color="danger" fill="outline" (click)="data.toggleBlocked(selected()!.id);selected.set(null)">Bloquear persona</ion-button></section>}
@else {
@for(person of data.discover();track person.id){<article class="person" (click)="selected.set(person)" (keydown.enter)="selected.set(person)" tabindex="0" role="button">
<img [src]="person.photo" alt="Foto de ejemplo" /><div><strong>{{person.name}}, {{person.age}}</strong><p>{{data.city(person.cityId)}} · {{person.distanceKm}} km</p><small>{{person.lastSeen}}</small></div><span>›</span></article>}
@if(data.discover().length===0){<p>No hay resultados con estos filtros. Puedes cambiarlos en Ajustes.</p>}
}</div></ion-content><app-navigation />`,
styles:[`.page{max-width:650px;margin:auto}.person{display:flex;align-items:center;gap:16px;border-bottom:1px solid #ddd;padding:12px;cursor:pointer}.person img{width:76px;height:76px;object-fit:cover;border-radius:12px}.person div{flex:1}.person p{margin:5px 0}.large{width:180px;height:180px;object-fit:cover;border-radius:16px;display:block;margin:12px auto}.panel{padding:12px}textarea{width:100%;min-height:90px;padding:12px}`]})
export class DiscoverPage {
 readonly selected=signal<Person|null>(null);draft='';
 constructor(readonly data:DemoDataService){}
 request(){const p=this.selected();if(!p)return;this.data.request(p.id,this.draft);this.draft='';this.selected.set(null);alert('Solicitud enviada (solo demo).');}
}
