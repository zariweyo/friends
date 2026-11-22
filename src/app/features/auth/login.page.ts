import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonButton,IonContent,IonHeader,IonTitle,IonToolbar } from '@ionic/angular/standalone';
import { AuthService } from '../../core/services/auth.service';
@Component({standalone:true,imports:[RouterLink,IonButton,IonContent,IonHeader,IonTitle,IonToolbar],template:`
<ion-header><ion-toolbar><ion-title>Friends</ion-title></ion-toolbar></ion-header>
<ion-content class="ion-padding"><main class="welcome"><div class="welcome-mark">✦</div><span class="section-kicker">CONEXIONES REALES</span><h1>Friends<span>.</span></h1><p>Menos deslizar. Más conectar.<br/>Descubre personas y empieza una conversación de verdad.</p><ion-button expand="block" (click)="auth.login()">Entrar (demo)</ion-button><ion-button expand="block" fill="outline" routerLink="/register">Crear perfil (demo)</ion-button><small>Sin autenticación real ni Firebase.</small></main></ion-content>`,
styles:[`.welcome{max-width:440px;margin:clamp(35px,12vh,110px) auto 0;text-align:center;background:#fff;border:1px solid #eeedf5;border-radius:30px;padding:42px 28px;box-shadow:0 20px 70px rgba(55,52,105,.06)}.welcome-mark{display:grid;place-items:center;width:74px;height:74px;border-radius:24px;margin:0 auto 25px;background:linear-gradient(135deg,#6556e8,#9c8afa);color:white;font-size:38px;box-shadow:0 14px 26px rgba(101,86,232,.2)}h1{font-size:clamp(45px,12vw,62px);font-weight:850;letter-spacing:-3px;margin:12px 0}h1 span{color:#f18f84}.welcome p{color:#81869a;line-height:1.7;margin:0 0 28px}small{display:block;margin-top:20px;color:#9699a9}`]})
export class LoginPage{constructor(readonly auth:AuthService){}}
