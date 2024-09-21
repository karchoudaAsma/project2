import { NgModule } from "@angular/core"; 
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BannerComponent } from './banner/banner.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { HeroComponent } from './hero/hero.component';


import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { HttpClientModule } from '@angular/common/http';

import { ConnexionComponent } from './connexion/connexion.component';
import { InscrireComponent } from "./inscrire/inscrire.component";
import { ForfailtsComponent } from "./forfailts/forfailts.component";
import { SmartphoneComponent } from "./smartphone/smartphone.component";
import { ContratComponent } from "./contrat/contrat.component";
import { TablettesComponent } from "./tablettes/tablettes.component";
import { AccessoriesComponent } from "./accessories/accessories.component";

const appRoute: Routes =[
    /*{path:'', redirectTo:'/clientes', pathMatch: 'full'},*/
    {path:'',component:HomeComponent},
    {path:'clientes',component:ClientesComponent},
    {path:'connexion', component:ConnexionComponent},
    {path:'inscrire', component:InscrireComponent},
    {path:'hero', component:HeroComponent},
    {path:'forfaits', component:ForfailtsComponent},
    {path:'smartphone', component:SmartphoneComponent},
    {path:'tablettes', component:TablettesComponent},
    {path:'accessoires', component:AccessoriesComponent},
    {path:'contrat/:clientId/:clientName', component:ContratComponent},
 
  ]


@NgModule({
imports:[
    RouterModule.forRoot(appRoute)],
    exports:[RouterModule]
})
export class AppRoutingModule{ 

}