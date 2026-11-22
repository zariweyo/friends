import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton,IonContent,IonHeader,IonTitle,IonToolbar } from '@ionic/angular/standalone';
import { DemoDataService,ReportStatus,UserRole } from '../../core/services/demo-data.service';
import { AppNavigationComponent } from '../../shared/components/app-navigation.component';
import { AppPageActionsComponent } from '../../shared/components/app-page-actions.component';
@Component({standalone:true,imports:[FormsModule,IonButton,IonContent,IonHeader,IonTitle,IonToolbar,AppNavigationComponent,AppPageActionsComponent],template:`
<ion-header><ion-toolbar><ion-title>Moderación</ion-title></ion-toolbar></ion-header><ion-content class="ion-padding"><main class="page"><app-page-actions/>
@if(!data.canModerate()){<h2>Acceso restringido</h2><p>Solo moderadores y administradores pueden consultar denuncias.</p>}
@else{<h2>Panel de denuncias</h2><p>Rol actual: {{data.demoRole()}} · Entorno de prueba</p>
<label>Estado<select [(ngModel)]="filter"><option value="all">Todas</option><option value="pending">Pendientes</option><option value="reviewing">En revisión</option><option value="resolved">Resueltas</option><option value="dismissed">Desestimadas</option></select></label>
@for(r of data.reports();track r.id){@if(filter==='all'||filter===r.status){<section class="panel"><strong>{{data.person(r.reporterId)?.name}} denuncia a {{data.person(r.targetId)?.name}}</strong><p>Motivo: {{r.reason}} · Estado: {{r.status}}</p><p>{{r.details}}</p>@if(r.messageId){<p>Mensaje denunciado: {{r.messageId}}</p>}<label>Resolución<input [(ngModel)]="resolutions[r.id]" placeholder="Nota interna" /></label><ion-button size="small" (click)="review(r.id,'reviewing')">Revisando</ion-button><ion-button size="small" (click)="review(r.id,'resolved')">Resolver</ion-button><ion-button size="small" color="medium" fill="outline" (click)="review(r.id,'dismissed')">Desestimar</ion-button></section>}}
@if(data.demoRole()==='admin'){<h2>Roles de usuarios</h2><p>Solo los administradores pueden cambiar roles.</p>@for(p of data.people();track p.id){@if(p.id!=='demo'){<section class="panel"><strong>{{p.name}}</strong><select [ngModel]="data.role(p.id)" (ngModelChange)="setRole(p.id,$event)"><option value="user">user</option><option value="moderator">moderator</option><option value="admin">admin</option></select></section>}}}
}
</main></ion-content><app-navigation />`,
styles:[`.page{max-width:650px;margin:auto}.panel{border:1px solid #ddd;border-radius:12px;padding:14px;margin:12px 0}`]})
export class ModerationPage{
 filter='all';resolutions:Record<string,string>={};
 constructor(readonly data:DemoDataService){}
 review(id:string,status:ReportStatus){this.data.reviewReport(id,status,this.resolutions[id]??'');}
 setRole(id:string,role:UserRole){this.data.setRole(id,role);}
}
