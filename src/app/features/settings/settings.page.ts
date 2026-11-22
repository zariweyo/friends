import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonContent,IonHeader,IonTitle,IonToolbar,IonButton } from '@ionic/angular/standalone';
import { DemoDataService } from '../../core/services/demo-data.service';
import { AppNavigationComponent } from '../../shared/components/app-navigation.component';
import { AppPageActionsComponent } from '../../shared/components/app-page-actions.component';
@Component({standalone:true,imports:[FormsModule,IonContent,IonHeader,IonTitle,IonToolbar,IonButton,AppNavigationComponent,AppPageActionsComponent],template:`
<ion-header><ion-toolbar><ion-title>Preferencias y privacidad</ion-title></ion-toolbar></ion-header><ion-content class="ion-padding"><div class="page"><app-page-actions/>
<h2>Qué personas quiero encontrar</h2><section class="panel">
<label>Sexo buscado<select multiple [ngModel]="data.search().sexes" (ngModelChange)="updateSearch('sexes',$event)"><option value="woman">Mujeres</option><option value="man">Hombres</option><option value="other">Otros</option></select></label>
<label>Orientación sexual<select [ngModel]="data.search().orientation" (ngModelChange)="updateSearch('orientation',$event)"><option value="any">Todas</option><option value="heterosexual">Heterosexual</option><option value="homosexual">Homosexual</option><option value="bisexual">Bisexual</option></select></label>
<label>Edad mínima<input type="number" [ngModel]="data.search().minAge" (ngModelChange)="updateSearch('minAge',+$event)" /></label>
<label>Edad máxima<input type="number" [ngModel]="data.search().maxAge" (ngModelChange)="updateSearch('maxAge',+$event)" /></label>
<label>Distancia máxima (km)<input type="number" [ngModel]="data.search().distance" (ngModelChange)="updateSearch('distance',+$event)" /></label><label>Valoración media mínima<select [ngModel]="data.search().minStars" (ngModelChange)="updateSearch('minStars',+$event)">@for(n of [0,1,2,3,4,5];track n){<option [value]="n">{{n===0?'Sin mínimo':n+' estrellas'}}</option>}</select></label><label>Mínimo de valoraciones<input type="number" min="0" [ngModel]="data.search().minRatings" (ngModelChange)="updateSearch('minRatings',+$event)" /></label></section>
<h2>Quién puede escribirme</h2><p>Estos filtros son independientes de los de búsqueda.</p><section class="panel">
<label>Sexo permitido<select multiple [ngModel]="data.incoming().sexes" (ngModelChange)="updateIncoming('sexes',$event)"><option value="woman">Mujeres</option><option value="man">Hombres</option><option value="other">Otros</option></select></label>
<label>Edad mínima<input type="number" [ngModel]="data.incoming().minAge" (ngModelChange)="updateIncoming('minAge',+$event)" /></label>
<label>Edad máxima<input type="number" [ngModel]="data.incoming().maxAge" (ngModelChange)="updateIncoming('maxAge',+$event)" /></label>
<label>Distancia máxima (km)<input type="number" [ngModel]="data.incoming().distance" (ngModelChange)="updateIncoming('distance',+$event)" /></label><label>Valoración media mínima del remitente<select [ngModel]="data.incoming().minStars" (ngModelChange)="updateIncoming('minStars',+$event)">@for(n of [0,1,2,3,4,5];track n){<option [value]="n">{{n===0?'Sin mínimo':n+' estrellas'}}</option>}</select></label><label>Número mínimo de valoraciones del remitente<input type="number" min="0" [ngModel]="data.incoming().minRatings" (ngModelChange)="updateIncoming('minRatings',+$event)" /></label><p><small>En el prototipo estos requisitos filtran las solicitudes recibidas. En producción se validarán en el servidor antes de permitir enviar el mensaje.</small></p></section>
<h2>Visibilidad</h2><section class="panel"><label><input type="checkbox" [ngModel]="data.visible()" (ngModelChange)="data.visible.set($event)" /> Visible globalmente</label>
<p>Localidades donde NO apareces:</p>
@for(c of data.cities;track c.id){<label><input type="checkbox" [checked]="data.hiddenCities().includes(c.id)" (change)="data.toggleCity(c.id)" /> {{c.name}}</label>}
</section><h2>Personas bloqueadas</h2><p><small>Bloquear cierra y archiva las conversaciones existentes e impide nuevos contactos. Las denuncias y mensajes denunciados se conservan para moderación.</small></p><section class="panel">
@for(id of data.blocked();track id){<p>{{data.person(id)?.name}} <ion-button fill="clear" size="small" (click)="data.toggleBlocked(id)">Desbloquear</ion-button></p>}
@if(data.blocked().length===0){<p>No tienes personas bloqueadas.</p>}</section>
<p><small>Demo: los ajustes solo se guardan en memoria. La visibilidad y las reglas de mensajes todavía no se aplican desde un servidor.</small></p>
</div></ion-content><app-navigation />`,
styles:[`.page{max-width:650px;margin:auto}.panel{border:1px solid #ddd;border-radius:12px;padding:16px;margin-bottom:20px}h2{margin-top:24px}`]})
export class SettingsPage {
 constructor(readonly data:DemoDataService){}
 updateSearch(key:string,value:any){this.data.search.update(s=>({...s,[key]:value}));}
 updateIncoming(key:string,value:any){this.data.incoming.update(s=>({...s,[key]:value}));}
}
