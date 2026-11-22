import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton,IonContent,IonHeader,IonTitle,IonToolbar } from '@ionic/angular/standalone';
import { DemoDataService } from '../../core/services/demo-data.service';
import { AppNavigationComponent } from '../../shared/components/app-navigation.component';
import { AppPageActionsComponent } from '../../shared/components/app-page-actions.component';
@Component({standalone:true,imports:[FormsModule,IonButton,IonContent,IonHeader,IonTitle,IonToolbar,AppNavigationComponent,AppPageActionsComponent],template:`
<ion-header><ion-toolbar><ion-title>Mi perfil</ion-title></ion-toolbar></ion-header><ion-content class="ion-padding"><div class="page"><app-page-actions/>
<div class="profile-intro"><span class="section-kicker">TU ESPACIO</span><h2>Tu mejor versión.</h2><p>Una foto, lo esencial y toda tu autenticidad.</p></div><p>Rol de prueba: <strong>{{data.demoRole()}}</strong></p><label>Simular rol<select [ngModel]="data.demoRole()" (ngModelChange)="data.demoRole.set($event)"><option value="user">user</option><option value="moderator">moderator</option><option value="admin">admin</option></select></label><p><small>Este selector existe solo para probar pantallas. No representa autorización real.</small></p><p>Solo una fotografía. Sin biografía extensa.</p>
<div class="photo-wrap"><img class="photo" [src]="photo" alt="Foto de perfil de prueba" /><span>✦</span></div>
<label>URL de la foto<input [(ngModel)]="photo" /></label><label>Nombre<input [(ngModel)]="name" /></label>
<label>Edad<input type="number" min="18" [(ngModel)]="age" /></label>
<label>Sexo<select [(ngModel)]="sex"><option value="woman">Mujer</option><option value="man">Hombre</option><option value="other">Otro</option></select></label>
<label>Población (GPS simulado)<select [(ngModel)]="cityId">@for(c of data.cities;track c.id){<option [value]="c.id">{{c.name}}</option>}</select></label>
<ion-button expand="block" [disabled]="!name.trim() || age < 18" (click)="save()">Guardar cambios (demo)</ion-button><h2>Mis valoraciones</h2><p>⭐ {{data.ratingStats('demo').count ? data.ratingStats('demo').average.toFixed(1) : 'Sin valorar'}} de 5 · {{data.ratingStats('demo').count}} valoraciones recibidas</p>@for(r of data.ratingsReceived();track r.id){<div class="rating"><strong>{{data.person(r.fromId)?.name ?? 'Usuario'}}</strong> · {{r.stars}} ★</div>}@if(!data.ratingsReceived().length){<p>Todavía no has recibido valoraciones.</p>}</div></ion-content><app-navigation />`,
styles:[`.page{max-width:600px}.profile-intro{background:linear-gradient(120deg,#f0edff,#fff0ec);border-radius:24px;padding:25px;margin:10px 0 18px}.profile-intro h2{font-size:29px;letter-spacing:-1px;margin:12px 0}.profile-intro p{color:#7c7d91}.photo-wrap{position:relative;width:160px;margin:22px auto}.photo{display:block;width:160px;height:160px;object-fit:cover;border-radius:50%;border:5px solid #fff;box-shadow:0 12px 30px rgba(77,68,141,.12)}.photo-wrap span{position:absolute;right:0;bottom:6px;background:#6556e8;color:white;border:3px solid #fff;border-radius:50%;width:40px;height:40px;display:grid;place-items:center}.rating{margin:10px 0}`]})
export class ProfilePage {
 name='';age=25;sex='woman';cityId='sevilla';photo='';
 constructor(readonly data:DemoDataService){const p=data.person('demo');if(p){this.name=p.name;this.age=p.age;this.sex=p.sex;this.cityId=p.cityId;this.photo=p.photo;}}
 save(){this.data.people.update(p=>p.map(x=>x.id==='demo'?{...x,name:this.name,age:this.age,sex:this.sex,cityId:this.cityId,photo:this.photo}:x));alert('Perfil actualizado (solo en memoria).');}
}
