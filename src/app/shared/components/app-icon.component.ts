import { Component,Input } from '@angular/core';
@Component({selector:'app-icon',standalone:true,template:`
<svg xmlns="http://www.w3.org/2000/svg" [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
@switch(name){
@case('search'){<circle cx="10.8" cy="10.8" r="7.2"/><path d="m16.3 16.3 5 5"/>}
@case('requests'){<rect x="3" y="4" width="18" height="16" rx="4"/><path d="M7.5 9h9M7.5 13h6"/><path d="m15.8 16.1 1.3 1.3 2.1-2.1"/>}
@case('chat'){<path d="M20 11.5a8 8 0 0 1-8 8c-1.2 0-2.3-.25-3.35-.72L4 20l1.3-4.25A8 8 0 1 1 20 11.5Z"/><path d="M8.5 11.5h7"/>}
@case('bell'){<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4"/>}
@case('user'){<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>}
@case('settings'){<circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1 1.2 1.2-2.4 2.4-1.2-1.2a8 8 0 0 1-2.1.9V21h-3.4v-2.6a8 8 0 0 1-2.1-.9l-1.2 1.2-2.4-2.4 1.2-1.2a8 8 0 0 1-.9-2.1H3.6V9.6h2.6a8 8 0 0 1 .9-2.1L5.9 6.3l2.4-2.4 1.2 1.2a8 8 0 0 1 2.1-.9V1.6H15v2.6a8 8 0 0 1 2.1.9l1.2-1.2 2.4 2.4-1.2 1.2a8 8 0 0 1 .9 2.1H23V13h-2.6a8 8 0 0 1-1 2Z" transform="translate(-1 1) scale(.97)"/>}
@case('refresh'){<path d="M20 7v5h-5"/><path d="M4.7 16a8 8 0 0 0 14.5 1.1M19.3 8A8 8 0 0 0 4.8 6.9"/><path d="M4 12V7h5"/>}
@case('shield'){<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>}
@case('filter'){<path d="M4 7h16M7 12h10M10 17h4"/><circle cx="8" cy="7" r="2" fill="currentColor" stroke="none"/>}
@case('arrow'){<path d="M5 12h14m-6-6 6 6-6 6"/>}
@case('pin'){<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>}
@case('star'){<path d="m12 2 3.1 6.3 7 .9-5 5 .9 7-6-3.4-6 3.4.9-7-5-5 7-.9Z"/>}
@case('heart'){<path d="M20.8 5.7a5.2 5.2 0 0 0-7.4 0L12 7.1l-1.4-1.4a5.2 5.2 0 0 0-7.4 7.4L12 21l8.8-8a5.2 5.2 0 0 0 0-7.3Z"/>}
}
</svg>`})
export class AppIconComponent{@Input() name='search';@Input() size=24;}
