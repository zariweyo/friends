import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DemoDataService } from '../../core/services/demo-data.service';
import { AppIconComponent } from './app-icon.component';
@Component({selector:'app-page-actions',standalone:true,imports:[RouterLink,AppIconComponent],template:`
<div class="actions" aria-label="Acciones rápidas">
<a routerLink="/settings" title="Preferencias y privacidad" aria-label="Ajustes"><app-icon name="settings" [size]="19"/></a>
@if(data.canModerate()){<a routerLink="/moderation" title="Moderación" aria-label="Moderación"><app-icon name="shield" [size]="19"/></a>}
<button type="button" title="Actualizar página" aria-label="Actualizar página" (click)="refresh()"><app-icon name="refresh" [size]="19"/></button>
</div>`,styles:[`.actions{display:flex;align-items:center;justify-content:flex-end;gap:8px;max-width:760px;margin:0 auto 6px}.actions a,.actions button{border:1px solid #e9e8f4;background:white;color:#777b93;border-radius:13px;width:40px;height:40px;display:flex;align-items:center;justify-content:center;cursor:pointer;text-decoration:none}.actions a:hover,.actions button:hover{background:#f2f0ff;color:#6556e8}`]})
export class AppPageActionsComponent{constructor(readonly data:DemoDataService){}refresh(){window.location.reload();}}
