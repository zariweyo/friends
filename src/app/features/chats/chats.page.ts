import { Component,signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton,IonContent,IonHeader,IonTitle,IonToolbar } from '@ionic/angular/standalone';
import { DemoDataService } from '../../core/services/demo-data.service';
import { AppNavigationComponent } from '../../shared/components/app-navigation.component';
@Component({standalone:true,imports:[FormsModule,IonButton,IonContent,IonHeader,IonTitle,IonToolbar,AppNavigationComponent],template:`
<ion-header><ion-toolbar><ion-title>Conversaciones</ion-title></ion-toolbar></ion-header><ion-content class="ion-padding"><div class="page">
@if(!selected()){<h2>Mis chats</h2>@for(c of data.chats();track c.id){<article class="panel" (click)="selected.set(c.id)" (keydown.enter)="selected.set(c.id)" tabindex="0" role="button"><strong>{{other(c.memberIds)}}</strong><p>Ver conversación →</p></article>}}
@else {<ion-button fill="clear" (click)="selected.set(null)">← Chats</ion-button><h2>{{chatName()}}</h2>
@for(m of data.messages();track m.id){@if(m.conversationId===selected()){<p class="bubble" [class.mine]="m.fromId==='demo'"><strong>{{data.person(m.fromId)?.name}}:</strong> {{m.text}} <small>{{m.time}}</small></p>}}
<textarea [(ngModel)]="draft" placeholder="Escribe un mensaje"></textarea><ion-button expand="block" [disabled]="!draft.trim()" (click)="send()">Enviar</ion-button>}
</div></ion-content><app-navigation />`,styles:[`.page{max-width:650px;margin:auto}.panel{padding:16px;border:1px solid #ddd;border-radius:12px;margin:12px 0;cursor:pointer}.bubble{background:#eee;padding:12px;border-radius:12px}.mine{background:#dce3ff}textarea{width:100%;min-height:70px;padding:12px}`]})
export class ChatsPage {readonly selected=signal<string|null>(null);draft='';constructor(readonly data:DemoDataService){}other(ids:string[]){return this.data.person(ids.find(x=>x!=='demo')??'')?.name??'Chat';}chatName(){return this.other(this.data.chats().find(c=>c.id===this.selected())?.memberIds??[]);}send(){const id=this.selected();if(id){this.data.send(id,this.draft);this.draft='';}}}
