import { Component,signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton,IonContent,IonHeader,IonTitle,IonToolbar } from '@ionic/angular/standalone';
import { DemoDataService,Person } from '../../core/services/demo-data.service';
import { AppNavigationComponent } from '../../shared/components/app-navigation.component';
@Component({standalone:true,imports:[FormsModule,IonButton,IonContent,IonHeader,IonTitle,IonToolbar,AppNavigationComponent],template:`
<ion-header><ion-toolbar><ion-title>Buscar</ion-title></ion-toolbar></ion-header><ion-content class="ion-padding"><div class="page">
@if(selected()){<section class="panel"><ion-button fill="clear" (click)="selected.set(null)">← Volver</ion-button>
<img class="large" [src]="selected()!.photo" alt="Foto de ejemplo" />
<h2>{{selected()!.name}}, {{selected()!.age}}</h2><p>⭐ {{data.ratingStats(selected()!.id).count ? data.ratingStats(selected()!.id).average.toFixed(1) : 'Sin valoración'}} · {{data.ratingStats(selected()!.id).count}} valoraciones</p><p>Mi valoración: {{data.myRating(selected()!.id) || 'Sin valorar'}}</p>@if(data.canRate(selected()!.id)){<p>Puedes valorar porque ambos habéis participado en una conversación aceptada.</p><div class="stars">@for(star of [1,2,3,4,5];track star){<ion-button size="small" [fill]="data.myRating(selected()!.id)===star?'solid':'outline'" (click)="data.rate(selected()!.id,star,ratingComment)">{{star}} ★</ion-button>}</div><textarea [(ngModel)]="ratingComment" placeholder="Comentario opcional (máximo 500 caracteres)" maxlength="500"></textarea>}@else{<p><small>Podrás valorar después de una conversación aceptada en la que ambos hayáis escrito.</small></p>}<p>{{data.city(selected()!.cityId)}} · {{selected()!.distanceKm}} km · {{selected()!.lastSeen}}</p>
<textarea [(ngModel)]="draft" placeholder="Escribe tu primer mensaje"></textarea>
<ion-button expand="block" [disabled]="!draft.trim()" (click)="request()">Enviar primer mensaje</ion-button>
<ion-button expand="block" fill="outline" color="medium" (click)="reject()">No es mi tipo</ion-button>
<ion-button color="danger" fill="clear" (click)="data.toggleBlocked(selected()!.id);selected.set(null)">Bloquear</ion-button></section>}
@else {
<div class="heading"><h2>Personas cerca de ti</h2><ion-button fill="outline" (click)="filters.set(!filters())">Filtros</ion-button></div>
@if(filters()){<section class="panel"><h3>Filtros de búsqueda</h3>
<label>Sexo<select multiple [ngModel]="data.search().sexes" (ngModelChange)="change('sexes',$event)"><option value="woman">Mujeres</option><option value="man">Hombres</option><option value="other">Otros</option></select></label>
<label>Orientación<select [ngModel]="data.search().orientation" (ngModelChange)="change('orientation',$event)"><option value="any">Todas</option><option value="heterosexual">Heterosexual</option><option value="homosexual">Homosexual</option><option value="bisexual">Bisexual</option></select></label>
<label>Edad mínima<input type="number" [ngModel]="data.search().minAge" (ngModelChange)="change('minAge',+$event)" /></label>
<label>Edad máxima<input type="number" [ngModel]="data.search().maxAge" (ngModelChange)="change('maxAge',+$event)" /></label>
<label>Distancia máxima (km)<input type="number" [ngModel]="data.search().distance" (ngModelChange)="change('distance',+$event)" /></label><label>Valoración media mínima<select [ngModel]="data.search().minStars" (ngModelChange)="change('minStars',+$event)">@for(n of [0,1,2,3,4,5];track n){<option [value]="n">{{n===0?'Sin mínimo':n+' estrellas'}}</option>}</select></label><label>Mínimo de valoraciones<input type="number" min="0" [ngModel]="data.search().minRatings" (ngModelChange)="change('minRatings',+$event)" /></label>
<ion-button expand="block" fill="outline" (click)="data.secondChance.set(!data.secondChance())">{{data.secondChance()?'Ocultar descartados':'Dar otra oportunidad'}}</ion-button>
<small>La segunda oportunidad muestra perfiles que tú descartaste, pero nunca los que te rechazaron o bloqueaste.</small>
</section>}
<p>Sin swipe · Distancia aproximada · Datos de prueba</p>
@for(person of data.discover();track person.id){<article class="person">
<img [src]="person.photo" alt="Foto de ejemplo" (click)="selected.set(person)" /><div class="details" (click)="selected.set(person)" (keydown.enter)="selected.set(person)" tabindex="0" role="button"><strong>{{person.name}}, {{person.age}}</strong><p>{{data.city(person.cityId)}} · {{person.distanceKm}} km</p><small>{{person.lastSeen}} · ⭐ {{data.ratingStats(person.id).count ? data.ratingStats(person.id).average.toFixed(1) : '—'}} ({{data.ratingStats(person.id).count}})</small></div>
<ion-button size="small" fill="clear" color="medium" (click)="data.rejectPerson(person.id,'not_my_type')">Descartar</ion-button></article>}
@if(data.discover().length===0){<p>No hay más perfiles con estos filtros. Puedes ampliarlos o dar otra oportunidad a los descartados.</p>}
}</div></ion-content><app-navigation />`,
styles:[`.page{max-width:650px;margin:auto}.heading{display:flex;align-items:center;justify-content:space-between}.person{display:flex;align-items:center;gap:10px;border-bottom:1px solid #ddd;padding:12px 0}.person img{width:68px;height:68px;object-fit:cover;border-radius:12px;cursor:pointer}.details{flex:1;cursor:pointer}.details p{margin:4px 0}.large{width:180px;height:180px;object-fit:cover;border-radius:16px;display:block;margin:12px auto}.panel{padding:12px;border:1px solid #ddd;border-radius:12px}textarea{width:100%;min-height:90px;padding:12px}`]})
export class DiscoverPage{
 readonly selected=signal<Person|null>(null);readonly filters=signal(false);draft='';ratingComment='';
 constructor(readonly data:DemoDataService){}
 change(key:string,value:any){this.data.search.update(s=>({...s,[key]:value}));}
 reject(){const p=this.selected();if(p)this.data.rejectPerson(p.id,'not_my_type');this.selected.set(null);}
 request(){const p=this.selected();if(!p)return;const ok=this.data.request(p.id,this.draft);if(ok){this.draft='';this.selected.set(null);}else alert('No se puede enviar otra solicitud a este perfil.');}
}
