import { Component,signal } from '@angular/core';
import { IonButton,IonContent,IonHeader,IonTitle,IonToolbar } from '@ionic/angular/standalone';
import { DemoDataService } from '../../core/services/demo-data.service';
import { AppNavigationComponent } from '../../shared/components/app-navigation.component';
@Component({standalone:true,imports:[IonButton,IonContent,IonHeader,IonTitle,IonToolbar,AppNavigationComponent],template:`
<ion-header><ion-toolbar><ion-title>Solicitudes</ion-title></ion-toolbar></ion-header><ion-content class="ion-padding"><div class="page"><h2>Solicitudes recibidas</h2>
@if(data.pendingIncoming().length){<div class="toolbar"><ion-button fill="outline" size="small" (click)="selectAll()">Seleccionar todas</ion-button><ion-button color="danger" [disabled]="selected().length===0" (click)="rejectSelected()">Rechazar seleccionadas ({{selected().length}})</ion-button></div>}
@for(r of data.pendingIncoming();track r.id){<section class="panel">
<input type="checkbox" [checked]="selected().includes(r.id)" (change)="toggle(r.id)" aria-label="Seleccionar solicitud" />
<div class="body"><strong>{{data.person(r.fromId)?.name}}</strong><p>{{r.text}}</p><ion-button size="small" (click)="data.respond(r.id,true);clear(r.id)">Aceptar</ion-button><ion-button size="small" color="medium" fill="outline" (click)="data.respond(r.id,false);clear(r.id)">Rechazar</ion-button></div></section>}
@if(!data.pendingIncoming().length){<p>No tienes solicitudes pendientes.</p>}
<h3>Solicitudes enviadas</h3>@for(r of data.requests();track r.id){@if(r.fromId==='demo'&&r.status==='pending'){<p>{{data.person(r.toId)?.name}} · Pendiente</p>}}
</div></ion-content><app-navigation />`,
styles:[`.page{max-width:650px;margin:auto}.panel{display:flex;gap:14px;align-items:flex-start;border:1px solid #ddd;border-radius:12px;padding:16px;margin:12px 0}.body{flex:1}.toolbar{display:flex;flex-wrap:wrap;align-items:center;gap:8px}`]})
export class RequestsPage{
 readonly selected=signal<string[]>([]);
 constructor(readonly data:DemoDataService){}
 toggle(id:string){this.selected.update(v=>v.includes(id)?v.filter(x=>x!==id):[...v,id]);}
 selectAll(){this.selected.set(this.data.pendingIncoming().map(r=>r.id));}
 clear(id:string){this.selected.update(v=>v.filter(x=>x!==id));}
 rejectSelected(){this.data.rejectMany(this.selected());this.selected.set([]);}
}
