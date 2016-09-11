// import { provideRouter, RouterConfig } from '@angular/router';
import { Routes, RouterModule } from '@angular/router';

import { SifarniciRoutes } from './sifarnici/sifarnici-routes';
import { BiaRoutes } from './bia/bia.routes';
import { ProcenaRizikaRoutes } from './procena-rizika/procena-rizika.routes';

import { HomeComponent } from './home/home.component';
import { VrednostiComponent } from './vrednosti/vrednosti.component';

import { PretnjeRanjivostiComponent } from './pretnje-ranjivosti/pretnje-ranjivosti.component';
import {MereComponent} from "./mere/mere.component";

export const routes: Routes = [
    ...SifarniciRoutes, // ... je ES6 spread operator
    ...BiaRoutes,
    ...ProcenaRizikaRoutes,
    { path: '', component: HomeComponent },
    { path: 'vrednosti', component: VrednostiComponent },

    // Spoj sa pretnjama i ranjivostima
    { path: 'pretnje-ranjivosti', component: PretnjeRanjivostiComponent },
    { path: 'mere', component: MereComponent }
];
//                                                   Za HashLocationStrategy (default je HTML5 PathLocationStrategy)
export const routing = RouterModule.forRoot(routes, { useHash: true });

// export const APP_ROUTER_PROVIDERS = [
//   provideRouter(routes)
// ];

