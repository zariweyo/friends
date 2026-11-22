import { Component,signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton,IonContent,IonHeader,IonTitle,IonToolbar } from '@ionic/angular/standalone';
import { DemoDataService } from '../../core/services/demo-data.service';
import { AppNavigationComponent } from '../../shared/components/app-navigation.component';
@Component({standalone:true,imports:[FormsModule,IonButton,IonContent,IonHeader,IonTitle,IonToolbar,AppNavigationComponent],template:`
<ion-header><ion-toolbar><ion-title>Conversaciones</ion-title></ion-toolbar></ion-header><ion-content class="ion-padding"><div class="page">
@if(!selected()){<h2>Mis conversaciones</h2>
<label>Buscar conversación<input placeholder="Nombre de la persona" [ngModel]="data.chatQuery()" (ngModelChange)="data.chatQuery.set($event)" /></label>
<label><input type="checkbox" [ngModel]="data.showArchived()" (ngModelChange)="data.showArchived.set($event)" /> Mostrar conversaciones archivadas</label><label>Filtrar<select [ngModel]="data.chatFilter()" (ngModelChange)="data.chatFilter.set($event)"><option value="all">Todas</option><option value="recent">Más recientes primero (demo)</option><option value="unread">No leídas (pendiente de implementar)</option></select></label>
@for(c of data.filteredChats();track c.id){<article class="panel" (click)="selected.set(c.id)" (keydown.enter)="selected.set(c.id)" tabindex="0" role="button"><strong>{{other(c.memberIds)}}</strong><p>{{data.activeChat(c.id)?"Activa":"Finalizada · solo lectura"}} · Ver conversación →</p></article>}
@if(!data.filteredChats().length){<p>No hay conversaciones para este filtro.</p>}
}
@else {<ion-button fill="clear" (click)="selected.set(null)">← Conversaciones</ion-button><h2>{{chatName()}}</h2>@if(data.activeChat(selected()!)){<ion-button fill="outline" color="medium" (click)="close()">Finalizar conversación</ion-button>}@else{<p><strong>Conversación finalizada y archivada.</strong> No se pueden enviar más mensajes.</p>}@if(data.canRate(otherId())){<section class="rating"><p>Valorar esta conversación (1–5 estrellas)</p><textarea [(ngModel)]="ratingComment" maxlength="500" placeholder="Comentario opcional"></textarea><div>@for(star of [1,2,3,4,5];track star){<ion-button size="small" [fill]="data.myRating(otherId())===star?'solid':'outline'" (click)="data.rate(otherId(),star,ratingComment)">{{star}} ★</ion-button>}</div></section>}@else{<p><small>Las valoraciones se habilitan cuando ambos habéis escrito en una conversación aceptada.</small></p>}
@for(m of data.messages();track m.id){@if(m.conversationId===selected()){<p class="bubble" [class.mine]="m.fromId==='demo'"><strong>{{data.person(m.fromId)?.name}}:</strong> {{m.text}} <small>{{m.time}}</small>@if(m.fromId!=='demo'){<ion-button size="small" fill="clear" color="medium" (click)="reportMessage(m.id,m.fromId)">Denunciar mensaje</ion-button>}</p>}}
@if(data.activeChat(selected()!)){<textarea [(ngModel)]="draft" placeholder="Escribe un mensaje"></textarea><ion-button expand="block" [disabled]="!draft.trim()" (click)="send()">Enviar</ion-button>}}
</div></ion-content><app-navigation />`,
styles:[`.page{max-width:650px;margin:auto}.panel{padding:16px;border:1px solid #ddd;border-radius:12px;margin:12px 0;cursor:pointer}.bubble{background:#eee;padding:12px;border-radius:12px}.mine{background:#dce3ff}textarea{width:100%;min-height:70px;padding:12px}`]})
export class ChatsPage{
 readonly selected=signal<string|null>(null);draft='';ratingComment='';
 constructor(readonly data:DemoDataService){}
 other(ids:string[]){return this.data.person(ids.find(x=>x!=='demo')??'')?.name??'Chat';}
 otherId(){return this.data.chats().find(c=>c.id===this.selected())?.memberIds.find(x=>x!=='demo')??'';}
 chatName(){return this.other(this.data.chats().find(c=>c.id===this.selected())?.memberIds??[]);}
 reportMessage(messageId:string,fromId:string){const details=prompt('Describe el motivo de la denuncia (demo):');if(details===null)return;if(this.data.report(fromId,'inappropriate',details,messageId))alert('Denuncia enviada para revisión.');else alert(this.data.reportError());}
 close(){const id=this.selected();if(id&&confirm('¿Finalizar esta conversación? Quedará archivada y no se podrán enviar más mensajes.'))this.data.closeChat(id);}
 send(){const id=this.selected();if(id){this.data.send(id,this.draft);this.draft='';}}
}
