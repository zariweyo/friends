import { Component } from '@angular/core';
import { RouterLink,RouterLinkActive } from '@angular/router';
import { DemoDataService } from '../../core/services/demo-data.service';
import { IonFooter,IonToolbar,IonButtons,IonButton } from '@ionic/angular/standalone';
@Component({selector:'app-navigation',standalone:true,imports:[RouterLink,RouterLinkActive,IonFooter,IonToolbar,IonButtons,IonButton],template:`
<ion-footer><ion-toolbar><ion-buttons class="nav">
<ion-button (click)="refresh()" title="Recargar página">Actualizar</ion-button>
<ion-button routerLink="/discover" routerLinkActive="active">Buscar</ion-button>
<ion-button routerLink="/requests" routerLinkActive="active">Solicitudes</ion-button>
<ion-button routerLink="/chats" routerLinkActive="active">Conversaciones</ion-button>
<ion-button routerLink="/profile" routerLinkActive="active">Perfil</ion-button>
<ion-button routerLink="/settings" routerLinkActive="active">Ajustes</ion-button>
@if(data.canModerate()){<ion-button routerLink="/moderation" routerLinkActive="active">Moderación</ion-button>}
</ion-buttons></ion-toolbar></ion-footer>`,
styles:[`.nav{display:flex;width:100%;justify-content:space-around;overflow-x:auto}.nav ion-button{font-size:11px;margin:0}.active{font-weight:bold;text-decoration:underline}`]})
export class AppNavigationComponent{constructor(readonly data:DemoDataService){}
 refresh():void{window.location.reload();}}
