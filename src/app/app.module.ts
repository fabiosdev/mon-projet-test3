import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MonPremierComponent } from './mon-premier/mon-premier.component';
import { AppareilComponent } from './appareil/appareil.component';
import { FormsModule } from '@angular/forms';
import { AppareilService } from './services/appareil.service';
import { AuthService } from './services/auth.service';
import { AuthComponent } from './auth/auth.component';
import { AppareilViewComponent } from './appareil-view/appareil-view.component';
import { RouterModule, Routes } from '@angular/router';
import { SingleAppareilComponent } from './single-appareil/single-appareil.component';

const appRoutes: Routes = [
  { path: 'appareils', component: AppareilViewComponent },
  { path: 'appareils/:id', component: SingleAppareilComponent},
  { path: 'auth', component: AuthComponent },
  { path: '', component: AppareilViewComponent }
  // L'utilisation des 2 points avant un fragment de route déclare ce fragment comme étant un paramètre (tous les chemins de type appareils/* seront renvoyés vers SingleAppareilComponent)
  // Le path correspond au string qui viendra après le / dans l'url : sur le serveur local, le premier path ici correspond  donc à localhost:4200/appareils
  // Ensuite le component correspond au component que l'on veut afficher lorsque l'utilisateur navigue au path choisi
  // Le path vide correspond à localhost:4200 ou à la racine du site. Il permettra à l'appli de ne pas planter lors d'un refresh
];

@NgModule({
  declarations: [
    AppComponent,
    MonPremierComponent,
    AppareilComponent,
    AuthComponent,
    AppareilViewComponent,
    SingleAppareilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AppareilService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }