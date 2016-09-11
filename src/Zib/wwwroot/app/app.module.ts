import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { ReactiveFormsModule } from '@angular/forms';

//import { REACTIVE_FORM_DIRECTIVES, FormBuilder, Validators } from '@angular/forms';

import { HttpModule } from '@angular/http';
// import { ROUTER_DIRECTIVES } from '@angular/router';

import { AppComponent }  from './app.component';
import { routing } from './app.routes';

import { ToasterContainerComponent, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';

import { SHARED_COMPONENTS } from './shared/shared-components';
import { SIFARNICI } from './sifarnici/sifarnici';
import { BiaComponent } from './bia/bia/bia.component';
import { DobavljaciComponent } from './bia/dobavljaci/dobavljaci.component';
import { ProcenaRizikaVrsteVrednostiComponent } from './procena-rizika/procena-rizika-vrste-vrednosti.component';
import { ProcenaRizikaVrednostiComponent } from './procena-rizika/procena-rizika-vrednosti.component';
import { HomeComponent } from './home/home.component';
import { VrednostiComponent } from './vrednosti/vrednosti.component';
import { PretnjeRanjivostiComponent } from './pretnje-ranjivosti/pretnje-ranjivosti.component';
import { MereComponent } from './mere/mere.component';
import { PotvrdiBrisanjeModalComponent } from './shared/components/modal/potvrdi-brisanje-modal.component';

import {GlobalService} from './global.service';

@NgModule({
    // module dependencies
    imports: [ 
        BrowserModule, 
        HttpModule, 
        FormsModule, 
        ReactiveFormsModule,
        routing 
    ],

    // components and directives
    declarations: [ 
        AppComponent, 
        ToasterContainerComponent,
        SHARED_COMPONENTS,
        SIFARNICI, 
        PotvrdiBrisanjeModalComponent, 
        BiaComponent, DobavljaciComponent, HomeComponent, VrednostiComponent,
        ProcenaRizikaVrsteVrednostiComponent, ProcenaRizikaVrednostiComponent,
        PretnjeRanjivostiComponent, MereComponent
    ],

    // root component   
    bootstrap: [ AppComponent ],   

    // services  
    providers: [ GlobalService ]                    
})
export class AppModule { }
