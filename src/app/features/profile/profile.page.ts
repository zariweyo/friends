import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton,IonContent,IonHeader,IonTitle,IonToolbar } from '@ionic/angular/standalone';
import { DemoDataService } from '../../core/services/demo-data.service';
import { AppNavigationComponent } from '../../shared/components/app-navigation.component';
@Component({standalone:true,imports:[FormsModule,IonButton,IonContent,IonHeader,IonTitle,IonToolbar,AppNavigationComponent],template:`
<ion-header><ion-toolbar><ion-title>Mi perfil</ion-title></ion-toolbar></ion-header><ion-content class="ion-padding"><div class="page">
<h2>Perfil minimalista</h2><p>Solo una fotografía. Sin biografía extensa.</p>
<img class="photo" [src]="photo" alt="Foto de perfil de prueba" />
<label>URL de la foto<input [(ngModel)]="photo" /></label><label>Nombre<input [(ngModel)]="name" /></label>
<label>Edad<input type="number" min="18" [(ngModel)]="age" /></label>
<label>Sexo<select [(ngModel)]="sex"><option value="woman">Mujer</option><option value="man">Hombre</option><option value="other">Otro</option></select></label>
<label>Población (GPS simulado)<select [(ngModel)]="cityId">@for(c of data.cities;track c.id){<option [value]="c.id">{{c.name}}</option>}</select></label>
<ion-button expand="block" [disabled]="!name.trim() || age < 18" (click)="save()">Guardar cambios (demo)</ion-button><h2>Mis valoraciones</h2><p>⭐ {{data.ratingStats('demo').count ? data.ratingStats('demo').average.toFixed(1) : 'Sin valorar'}} de 5 · {{data.ratingStats('demo').count}} valoraciones recibidas</p>@for(r of data.ratingsReceived();track r.id){<div class="rating"><strong>{{data.person(r.fromId)?.name ?? 'Usuario'}}</strong> · {{r.stars}} ★</div>}@if(!data.ratingsReceived().length){<p>Todavía no has recibido valoraciones.</p>}</div></ion-content><app-navigation />`,
styles:[`.page{max-width:500px;margin:auto}.photo{display:block;width:150px;height:150px;object-fit:cover;border-radius:16px;margin:20px auto}`]})
export class ProfilePage {
 name='';age=25;sex='woman';cityId='sevilla';photo='';
 constructor(readonly data:DemoDataService){const p=data.person('demo');if(p){this.name=p.name;this.age=p.age;this.sex=p.sex;this.cityId=p.cityId;this.photo=p.photo;}}
 save(){this.data.people.update(p=>p.map(x=>x.id==='demo'?{...x,name:this.name,age:this.age,sex:this.sex,cityId:this.cityId,photo:this.photo}:x));alert('Perfil actualizado (solo en memoria).');}
}
