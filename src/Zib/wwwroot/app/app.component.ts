import { Component } from '@angular/core';
// import { ROUTER_DIRECTIVES } from '@angular/router';

import { ToasterContainerComponent, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';


import {MenuComponent} from './menu/menu.component';
import {GlobalService} from './global.service';

import { SIFARNICI } from './sifarnici/sifarnici';
import { BIA } from './bia/bia';
import { HomeComponent } from './home/home.component';
import { VrednostiComponent } from './vrednosti/vrednosti.component';
import { PretnjeRanjivostiComponent } from './pretnje-ranjivosti/pretnje-ranjivosti.component';

import { ProcenaRizikaVrsteVrednostiComponent } from './procena-rizika/procena-rizika-vrste-vrednosti.component';
import { ProcenaRizikaVrednostiComponent } from './procena-rizika/procena-rizika-vrednosti.component';
import {MereComponent} from "./mere/mere.component";

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
    directives: [
        // ROUTER_DIRECTIVES, 
        // ToasterContainerComponent,
        MenuComponent
    ],
    providers: [
        ToasterService
        //      ROUTER_PROVIDERS, GlobalService - prebaceno u main.ts
    ]
    // precompile: [
    //     SIFARNICI, HomeComponent, VrednostiComponent, BIA, PretnjeRanjivostiComponent,
    //     ProcenaRizikaVrednostiComponent, ProcenaRizikaVrsteVrednostiComponent, MereComponent
    //     ]  // rc4
})


export class AppComponent {

    constructor(private global: GlobalService, private toasterService: ToasterService) {
    }

    ngAfterViewInit() {
        //this.toasterService.pop('success', 'Args Title', 'Args Body');
    }

    public toasterconfig: ToasterConfig = new ToasterConfig({
        showCloseButton: true,
        tapToDismiss: true,
        timeout: 3000
    });
}