import { Component } from '@angular/core';
import { RouterLink,RouterLinkActive } from '@angular/router';
import { DemoDataService } from '../../core/services/demo-data.service';
import { IonFooter,IonToolbar } from '@ionic/angular/standalone';
import { AppIconComponent } from './app-icon.component';
@Component({selector:'app-navigation',standalone:true,imports:[RouterLink,RouterLinkActive,IonFooter,IonToolbar,AppIconComponent],template:`
<ion-footer class="app-bottom-nav">
<ion-toolbar>
<nav class="nav" aria-label="Navegación principal">
<a routerLink="/discover" routerLinkActive="active" aria-label="Buscar personas"><app-icon name="search"/><span>Buscar</span></a>
<a routerLink="/requests" routerLinkActive="active" aria-label="Solicitudes"><span class="icon-wrap"><app-icon name="requests"/>@if(data.pendingIncoming().length){<i class="dot"></i>}</span><span>Solicitudes</span></a>
<a routerLink="/chats" routerLinkActive="active" aria-label="Conversaciones"><app-icon name="chat"/><span>Chats</span></a>
<a routerLink="/notifications" routerLinkActive="active" aria-label="Notificaciones"><span class="icon-wrap"><app-icon name="bell"/>@if(data.unreadNotifications()){<i class="count">{{data.unreadNotifications()}}</i>}</span><span>Avisos</span></a>
<a routerLink="/profile" routerLinkActive="active" aria-label="Mi perfil"><app-icon name="user"/><span>Perfil</span></a>
</nav>
</ion-toolbar></ion-footer>`,
styles:[`
:host{display:block}
.app-bottom-nav{position:fixed;bottom:0;left:0;right:0;z-index:100;box-shadow:0 -7px 30px rgba(31,32,77,.065)}
.app-bottom-nav ion-toolbar{--background:rgba(255,255,255,.97);--border-width:0;--min-height:70px;--padding-start:0;--padding-end:0}
.nav{display:flex;align-items:stretch;justify-content:space-around;max-width:740px;margin:auto;padding:7px 8px calc(6px + env(safe-area-inset-bottom,0px));gap:3px}
.nav a{position:relative;flex:1;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:5px;min-height:54px;border-radius:16px;text-decoration:none;color:#9295a8;font-size:10px;font-weight:700;transition:background .2s,color .2s}
.nav a.active{color:#6556e8;background:#f2f0ff}
.nav a app-icon{height:24px}
.icon-wrap{position:relative;display:flex}
.count{position:absolute;right:-12px;top:-8px;background:#f17e87;color:white;min-width:17px;height:17px;border-radius:100px;padding:2px 4px;font-size:10px;font-style:normal;text-align:center}
.dot{position:absolute;right:-5px;top:-2px;background:#f17e87;width:8px;height:8px;border-radius:50%;border:2px solid white}
@media(min-width:740px){.app-bottom-nav{left:50%;right:auto;width:740px;transform:translateX(-50%);border-radius:20px 20px 0 0;overflow:hidden}}
`]})
export class AppNavigationComponent{constructor(readonly data:DemoDataService){}}
