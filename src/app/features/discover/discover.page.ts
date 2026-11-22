import { Component,signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton,IonContent,IonHeader,IonTitle,IonToolbar } from '@ionic/angular/standalone';
import { DemoDataService,Person } from '../../core/services/demo-data.service';
import { AppNavigationComponent } from '../../shared/components/app-navigation.component';
import { AppPageActionsComponent } from '../../shared/components/app-page-actions.component';
@Component({standalone:true,imports:[FormsModule,IonButton,IonContent,IonHeader,IonTitle,IonToolbar,AppNavigationComponent,AppPageActionsComponent],template:`
<ion-header><ion-toolbar><ion-title>Buscar</ion-title></ion-toolbar></ion-header><ion-content class="ion-padding"><div class="page"><app-page-actions/>
@if(selected()){<section class="panel"><ion-button fill="clear" (click)="selected.set(null)">← Volver</ion-button>
<div class="profile-hero"><img class="large" [src]="selected()!.photo" alt="Foto de ejemplo" /></div>
<h2>{{selected()!.name}}, {{selected()!.age}}</h2><p>⭐ {{data.ratingStats(selected()!.id).count ? data.ratingStats(selected()!.id).average.toFixed(1) : 'Sin valoración'}} · {{data.ratingStats(selected()!.id).count}} valoraciones</p><p>Mi valoración: {{data.myRating(selected()!.id) || 'Sin valorar'}}</p>@if(data.canRate(selected()!.id)){<p>Puedes valorar porque ambos habéis participado en una conversación aceptada.</p><div class="stars">@for(star of [1,2,3,4,5];track star){<ion-button size="small" [fill]="data.myRating(selected()!.id)===star?'solid':'outline'" (click)="data.rate(selected()!.id,star,ratingComment)">{{star}} ★</ion-button>}</div><textarea [(ngModel)]="ratingComment" placeholder="Comentario opcional (máximo 500 caracteres)" maxlength="500"></textarea>}@else{<p><small>Podrás valorar después de una conversación aceptada en la que ambos hayáis escrito.</small></p>}<p>{{data.city(selected()!.cityId)}} · {{selected()!.distanceKm}} km · {{selected()!.lastSeen}}</p>
<textarea [(ngModel)]="draft" placeholder="Escribe tu primer mensaje"></textarea>
<ion-button expand="block" [disabled]="!draft.trim()" (click)="request()">Enviar primer mensaje</ion-button>
<ion-button expand="block" fill="outline" color="medium" (click)="reject()">No es mi tipo</ion-button>
<ion-button color="danger" fill="clear" (click)="data.toggleBlocked(selected()!.id);selected.set(null)">Bloquear</ion-button><ion-button color="medium" fill="outline" (click)="reporting.set(!reporting())">Denunciar perfil</ion-button>@if(reporting()){<section class="panel"><label>Motivo<select [(ngModel)]="reportReason"><option value="harassment">Acoso</option><option value="inappropriate">Conducta inapropiada</option><option value="spam">Spam</option><option value="fake_profile">Perfil falso</option><option value="other">Otro</option></select></label><textarea [(ngModel)]="reportDetails" maxlength="1000" placeholder="Describe lo ocurrido"></textarea><ion-button (click)="submitReport()">Enviar denuncia</ion-button></section>}</section>}
@else {
<div class="hero"><div class="hero-top"><span class="section-kicker">DESCUBRE · CONECTA · CONVERSA</span><span class="hero-sparkle">✦</span></div><h2>Conoce a alguien<br/><em>especial.</em></h2><p>Personas reales, conversaciones a tu ritmo.</p><div class="hero-stats"><span>✧ Sin swipes</span><span>◉ A tu manera</span></div></div>
<div class="heading"><div><span class="section-kicker">CERCA DE TI</span><h2>Descubre personas <span class="result-count">{{data.discover().length}}</span></h2></div><ion-button fill="outline" (click)="filters.set(!filters())">⚙ Filtros</ion-button></div>
@if(filters()){<section class="panel"><h3>Filtros de búsqueda</h3>
<label>Sexo<select multiple [ngModel]="data.search().sexes" (ngModelChange)="change('sexes',$event)"><option value="woman">Mujeres</option><option value="man">Hombres</option><option value="other">Otros</option></select></label>
<label>Orientación<select [ngModel]="data.search().orientation" (ngModelChange)="change('orientation',$event)"><option value="any">Todas</option><option value="heterosexual">Heterosexual</option><option value="homosexual">Homosexual</option><option value="bisexual">Bisexual</option></select></label>
<label>Edad mínima<input type="number" [ngModel]="data.search().minAge" (ngModelChange)="change('minAge',+$event)" /></label>
<label>Edad máxima<input type="number" [ngModel]="data.search().maxAge" (ngModelChange)="change('maxAge',+$event)" /></label>
<label>Distancia máxima (km)<input type="number" [ngModel]="data.search().distance" (ngModelChange)="change('distance',+$event)" /></label><label>Valoración media mínima<select [ngModel]="data.search().minStars" (ngModelChange)="change('minStars',+$event)">@for(n of [0,1,2,3,4,5];track n){<option [value]="n">{{n===0?'Sin mínimo':n+' estrellas'}}</option>}</select></label><label>Mínimo de valoraciones<input type="number" min="0" [ngModel]="data.search().minRatings" (ngModelChange)="change('minRatings',+$event)" /></label>
<ion-button expand="block" fill="outline" (click)="data.secondChance.set(!data.secondChance())">{{data.secondChance()?'Ocultar descartados':'Dar otra oportunidad'}}</ion-button>
<small>La segunda oportunidad muestra perfiles que tú descartaste, pero nunca los que te rechazaron o bloqueaste.</small>
</section>}
<p class="list-hint">Explora perfiles y rompe el hielo con un mensaje. <span>Datos de prueba</span></p>
@for(person of data.discover();track person.id){<article class="person">
<img [src]="person.photo" alt="Foto de ejemplo" (click)="selected.set(person)" /><div class="details" (click)="selected.set(person)" (keydown.enter)="selected.set(person)" tabindex="0" role="button"><strong>{{person.name}}, {{person.age}}</strong><p>⌖ {{data.city(person.cityId)}} · {{person.distanceKm}} km</p><small>✦ {{person.lastSeen}} <span class="rating-pill">★ {{data.ratingStats(person.id).count ? data.ratingStats(person.id).average.toFixed(1) : 'Nuevo'}}</span></small></div>
<ion-button class="dismiss" size="small" fill="clear" color="medium" (click)="data.rejectPerson(person.id,'not_my_type')">✕</ion-button></article>}
@if(data.discover().length===0){<p>No hay más perfiles con estos filtros. Puedes ampliarlos o dar otra oportunidad a los descartados.</p>}
}</div></ion-content><app-navigation />`,
styles:[`
.hero{position:relative;overflow:hidden;border-radius:28px;padding:28px 26px 26px;background:linear-gradient(125deg,#5d52c9 0%,#7967ee 63%,#a690ff 100%);color:#fff;box-shadow:0 18px 34px rgba(97,78,218,.18);margin:8px 0 32px}
.hero:after{content:'';position:absolute;width:240px;height:240px;border:1px solid rgba(255,255,255,.24);border-radius:50%;right:-84px;top:-72px;box-shadow:0 0 0 34px rgba(255,255,255,.055),0 0 0 74px rgba(255,255,255,.035)}
.hero-top{display:flex;justify-content:space-between;align-items:center}.hero .section-kicker{color:#e8e3ff}.hero-sparkle{font-size:32px;color:#ffdbc7}
.hero h2{position:relative;z-index:1;font-size:clamp(34px,7vw,52px);line-height:1.07;letter-spacing:-2px;margin:22px 0 12px;font-weight:850}
.hero h2 em{font-style:normal;color:#ffe1d0}.hero p{color:#f0eaff;margin:0 0 24px;font-size:14px}.hero-stats{display:flex;gap:8px;flex-wrap:wrap}.hero-stats span{background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.14);padding:7px 12px;border-radius:100px;font-size:12px;font-weight:700}
.heading{display:flex;align-items:flex-end;justify-content:space-between;gap:8px;margin-bottom:10px}.heading h2{font-size:24px;margin:7px 0 0}.result-count{display:inline-flex;align-items:center;justify-content:center;background:#eceaff;color:#6556e8;border-radius:100px;font-size:13px;padding:5px 9px;vertical-align:middle}.list-hint{font-size:13px;margin:10px 0 18px}.list-hint span{opacity:.7}
.person{display:flex;align-items:center;gap:15px;background:#fff;border:1px solid #ececf4;border-radius:20px;padding:12px;margin:11px 0;box-shadow:0 5px 22px rgba(36,40,82,.035);transition:transform .2s,box-shadow .2s}.person:hover{transform:translateY(-2px);box-shadow:0 12px 30px rgba(36,40,82,.075)}.person img{width:82px;height:88px;object-fit:cover;border-radius:15px;cursor:pointer}.details{flex:1;min-width:0;cursor:pointer}.details strong{font-size:17px;letter-spacing:-.3px}.details p{margin:7px 0;color:#7c8295;font-size:13px}.details small{display:flex;align-items:center;gap:8px;color:#999db0;font-size:11px}.rating-pill{color:#b0803c;background:#fff7e8;border-radius:8px;padding:3px 7px;font-weight:700}.dismiss{--color:#a2a5b4;font-size:18px}.profile-hero{border-radius:20px;background:linear-gradient(145deg,#f3efff,#ffece6);padding:22px}.large{width:180px;height:180px;object-fit:cover;border-radius:50%;display:block;margin:4px auto;border:5px solid white;box-shadow:0 12px 28px rgba(80,70,140,.13)}
@media(max-width:390px){.hero{padding:22px 20px}.person img{width:72px;height:80px}.person{gap:10px}.details strong{font-size:15px}}
`]})
export class DiscoverPage{
 readonly selected=signal<Person|null>(null);readonly filters=signal(false);readonly reporting=signal(false);draft='';ratingComment='';reportReason:'harassment'|'inappropriate'|'spam'|'fake_profile'|'other'='inappropriate';reportDetails='';
 constructor(readonly data:DemoDataService){}
 change(key:string,value:any){this.data.search.update(s=>({...s,[key]:value}));}
 submitReport(){const p=this.selected();if(!p)return;if(this.data.report(p.id,this.reportReason,this.reportDetails)){this.reporting.set(false);this.reportDetails='';alert('Denuncia enviada para revisión (demo).');}else alert(this.data.reportError());}
 reject(){const p=this.selected();if(p)this.data.rejectPerson(p.id,'not_my_type');this.selected.set(null);}
 request(){const p=this.selected();if(!p)return;const ok=this.data.request(p.id,this.draft);if(ok){this.draft='';this.selected.set(null);}else alert('No se puede enviar la solicitud. Comprueba si ya existe una solicitud o si has alcanzado el máximo de solicitudes pendientes.');}
}
