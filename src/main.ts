import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { appRoutes } from './app/app.routes';
import { AppComponent } from './app/app.component';
bootstrapApplication(AppComponent, { providers: [provideIonicAngular(), provideRouter(appRoutes)] }).catch(console.error);
