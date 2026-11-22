import { Component,signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton,IonContent,IonHeader,IonTitle,IonToolbar } from '@ionic/angular/standalone';
import { DemoDataService } from '../../core/services/demo-data.service';
import { AppNavigationComponent } from '../../shared/components/app-navigation.component';
import { AppPageActionsComponent } from '../../shared/components/app-page-actions.component';
@Component({standalone:true,imports:[FormsModule,IonButton,IonContent,IonHeader,IonTitle,IonToolbar,AppNavigationComponent,AppPageActionsComponent],template:`
<ion-header><ion-toolbar><ion-title>Solicitudes</ion-title></ion-toolbar></ion-header><ion-content class="ion-padding"><div class="page"><app-page-actions/><span class="section-kicker">PRIMERAS IMPRESIONES</span><h2>Solicitudes recibidas <span class="meta-chip">{{data.pendingIncoming().length}}</span></h2>
@if(data.pendingIncoming().length){<div class="toolbar"><ion-button fill="outline" size="small" (click)="selectAll()">Seleccionar todas</ion-button><ion-button color="danger" [disabled]="selected().length===0" (click)="rejectSelected()">Rechazar seleccionadas ({{selected().length}})</ion-button></div>}
@for(r of data.pendingIncoming();track r.id){<section class="panel">
<input type="checkbox" [checked]="selected().includes(r.id)" (change)="toggle(r.id)" aria-label="Seleccionar solicitud" />
<div class="body"><strong>{{data.person(r.fromId)?.name}}</strong><p>⭐ {{data.ratingStats(r.fromId).count ? data.ratingStats(r.fromId).average.toFixed(1) : '—'}} ({{data.ratingStats(r.fromId).count}} valoraciones)</p><p>{{r.text}}</p><ion-button size="small" (click)="data.respond(r.id,true);clear(r.id)">Aceptar</ion-button><ion-button size="small" color="medium" fill="outline" (click)="data.respond(r.id,false);clear(r.id)">Rechazar</ion-button><ion-button size="small" fill="outline" (click)="rejectionFor.set(rejectionFor()===r.id?null:r.id)">Rechazar con mensaje</ion-button>
@if(rejectionFor()===r.id){<textarea [(ngModel)]="rejectionText" maxlength="300" placeholder="Mensaje de cortesía opcional; no admite respuesta"></textarea><ion-button size="small" (click)="rejectWithMessage(r.id)">Enviar rechazo</ion-button>}</div></section>}
@if(!data.pendingIncoming().length){<div class="empty-state">✉<h3>Todo al día</h3><p>No tienes solicitudes pendientes.</p></div>}
<h3>Solicitudes enviadas</h3><p><small>Máximo {{data.maxPendingRequests}} solicitudes activas. Puedes retirarlas mientras estén pendientes.</small></p>@for(r of data.requests();track r.id){@if(r.fromId==='demo'&&r.status==='pending'){<p>{{data.person(r.toId)?.name}} · Pendiente <ion-button size="small" fill="outline" (click)="data.withdrawRequest(r.id)">Retirar</ion-button></p>}}
</div></ion-content><app-navigation />`,
styles:[`.panel{display:flex;gap:14px;align-items:flex-start}.body{flex:1;min-width:0}.body strong{font-size:18px}.body p{color:#6f7489}.toolbar{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin:14px 0}.empty-state{font-size:26px}.empty-state h3{color:#34364d;font-size:18px;margin:10px 0}`]})
export class RequestsPage{
 readonly selected=signal<string[]>([]);
 readonly rejectionFor=signal<string|null>(null);rejectionText='';
 constructor(readonly data:DemoDataService){}
 toggle(id:string){this.selected.update(v=>v.includes(id)?v.filter(x=>x!==id):[...v,id]);}
 selectAll(){this.selected.set(this.data.pendingIncoming().map(r=>r.id));}
 clear(id:string){this.selected.update(v=>v.filter(x=>x!==id));}
 rejectWithMessage(id:string){this.data.respond(id,false,this.rejectionText);this.rejectionFor.set(null);this.rejectionText='';this.clear(id);}
 rejectSelected(){this.data.rejectMany(this.selected());this.selected.set([]);}
}
