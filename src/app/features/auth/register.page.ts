import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonButton, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AuthService } from '../../core/services/auth.service';
import { DemoDataService } from '../../core/services/demo-data.service';
@Component({standalone:true,imports:[FormsModule,RouterLink,IonButton,IonContent,IonHeader,IonTitle,IonToolbar],template:`
<ion-header><ion-toolbar><ion-title>Crear perfil</ion-title></ion-toolbar></ion-header><ion-content class="ion-padding">
<div class="page"><h2>Registro de prueba</h2><p>El acceso real por Firebase se conectará después.</p>
<label>Nombre<input [(ngModel)]="name" placeholder="Tu nombre" /></label>
<label>Edad<input [(ngModel)]="age" type="number" min="18" /></label>
<label>Sexo<select [(ngModel)]="sex"><option value="woman">Mujer</option><option value="man">Hombre</option><option value="other">Otro</option></select></label>
<label>Población (GPS simulado)<select [(ngModel)]="cityId">@for(c of data.cities;track c.id){<option [value]="c.id">{{c.name}}</option>}</select></label>
<label>Foto única (URL demo)<input [(ngModel)]="photo" /></label>
<ion-button expand="block" [disabled]="!name.trim() || age < 18" (click)="save()">Crear perfil y entrar</ion-button>
<ion-button fill="clear" routerLink="/login">Volver al login</ion-button></div></ion-content>`,
styles:[`.page{max-width:500px;margin:auto}`]})
export class RegisterPage {
 name='';age=25;sex='woman';cityId='sevilla';photo='https://i.pravatar.cc/320?img=47';
 constructor(readonly data:DemoDataService,private auth:AuthService){}
 async save(){this.data.people.update(p=>p.map(x=>x.id==='demo'?{...x,name:this.name,age:this.age,sex:this.sex,cityId:this.cityId,photo:this.photo}:x));await this.auth.login();}
}
