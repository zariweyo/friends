import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonFooter,IonToolbar,IonButtons,IonButton } from '@ionic/angular/standalone';
@Component({selector:'app-navigation',standalone:true,imports:[RouterLink,IonFooter,IonToolbar,IonButtons,IonButton],template:`<ion-footer><ion-toolbar><ion-buttons slot="start"><ion-button routerLink="/discover">Buscar</ion-button><ion-button routerLink="/requests">Solicitudes</ion-button><ion-button routerLink="/chats">Chats</ion-button><ion-button routerLink="/profile">Perfil</ion-button><ion-button routerLink="/settings">Ajustes</ion-button></ion-buttons></ion-toolbar></ion-footer>`})
export class AppNavigationComponent {}
