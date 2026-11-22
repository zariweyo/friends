import { Component,signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton,IonContent,IonHeader,IonTitle,IonToolbar } from '@ionic/angular/standalone';
import { DemoDataService } from '../../core/services/demo-data.service';
import { AppNavigationComponent } from '../../shared/components/app-navigation.component';
import { AppPageActionsComponent } from '../../shared/components/app-page-actions.component';
@Component({standalone:true,imports:[FormsModule,IonButton,IonContent,IonHeader,IonTitle,IonToolbar,AppNavigationComponent,AppPageActionsComponent],template:`
<ion-header><ion-toolbar><ion-title>Conversaciones</ion-title></ion-toolbar></ion-header><ion-content class="ion-padding"><div class="page"><app-page-actions/>
@if(!selected()){<h2>Mis conversaciones</h2>
<label>Buscar conversación<input placeholder="Nombre de la persona" [ngModel]="data.chatQuery()" (ngModelChange)="data.chatQuery.set($event)" /></label>
<label><input type="checkbox" [ngModel]="data.showArchived()" (ngModelChange)="data.showArchived.set($event)" /> Mostrar conversaciones archivadas</label><label>Filtrar<select [ngModel]="data.chatFilter()" (ngModelChange)="data.chatFilter.set($event)"><option value="all">Todas</option><option value="recent">Más recientes primero (demo)</option><option value="unread">No leídas (pendiente de implementar)</option></select></label>
@for(c of data.filteredChats();track c.id){<article class="panel chat-card" (click)="selected.set(c.id)" (keydown.enter)="selected.set(c.id)" tabindex="0" role="button"><div class="chat-avatar">{{other(c.memberIds).charAt(0)}}</div><div class="chat-info"><strong>{{other(c.memberIds)}}</strong><p>{{data.activeChat(c.id)?"Conversación activa":"Archivada · solo lectura"}}</p></div><span class="chat-arrow">›</span></article>}
@if(!data.filteredChats().length){<p>No hay conversaciones para este filtro.</p>}
}
@else {<ion-button fill="clear" (click)="selected.set(null)">← Conversaciones</ion-button><h2>{{chatName()}}</h2>@if(data.activeChat(selected()!)){<ion-button fill="outline" color="medium" (click)="close()">Finalizar conversación</ion-button>}@else{<p><strong>Conversación finalizada y archivada.</strong> No se pueden enviar más mensajes.</p>}@if(data.canRate(otherId())){<section class="rating"><p>Valorar esta conversación (1–5 estrellas)</p><textarea [(ngModel)]="ratingComment" maxlength="500" placeholder="Comentario opcional"></textarea><div>@for(star of [1,2,3,4,5];track star){<ion-button size="small" [fill]="data.myRating(otherId())===star?'solid':'outline'" (click)="data.rate(otherId(),star,ratingComment)">{{star}} ★</ion-button>}</div></section>}@else{<p><small>Las valoraciones se habilitan cuando ambos habéis escrito en una conversación aceptada.</small></p>}
@for(m of data.messages();track m.id){@if(m.conversationId===selected()){<p class="bubble" [class.mine]="m.fromId==='demo'"><strong>{{data.person(m.fromId)?.name}}:</strong> {{m.text}} <small>{{m.time}}</small>@if(m.fromId!=='demo'){<ion-button size="small" fill="clear" color="medium" (click)="reportMessage(m.id,m.fromId)">Denunciar mensaje</ion-button>}</p>}}
@if(data.activeChat(selected()!)){<textarea [(ngModel)]="draft" placeholder="Escribe un mensaje"></textarea><ion-button expand="block" [disabled]="!draft.trim()" (click)="send()">Enviar</ion-button>}}
</div></ion-content><app-navigation />`,
styles:[`.chat-card{display:flex;align-items:center;gap:14px;cursor:pointer;padding:14px!important}.chat-avatar{width:52px;height:52px;display:grid;place-items:center;border-radius:17px;background:linear-gradient(135deg,#e4dfff,#ffdcd2);color:#6654d8;font-size:22px;font-weight:800}.chat-info{flex:1}.chat-info p{margin:5px 0 0;color:#8c90a4;font-size:13px}.chat-arrow{font-size:28px;color:#a6a6bc}.bubble{background:#fff;padding:14px 16px;border-radius:18px 18px 18px 5px;max-width:87%;margin:12px auto 12px 0;border:1px solid #ececf4;box-shadow:0 4px 14px rgba(40,40,90,.03)}.bubble.mine{margin-left:auto;margin-right:0;background:#eceaff;border-color:#e4e0ff;border-radius:18px 18px 5px 18px}.bubble small{display:block;margin-top:6px;font-size:10px}.rating{margin:20px 0}textarea{width:100%;min-height:76px;padding:12px}`]})
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
