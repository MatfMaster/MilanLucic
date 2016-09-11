import { provideRouter, RouterConfig } from '@angular/router';

import { VrsteVrednostiComponent } from './vrste-vrednosti/vrste-vrednosti.component';
import { PretnjeComponent } from './pretnje/pretnje.component';
import { RanjivostiComponent } from './ranjivosti/ranjivosti.component';
import { OrganizacioneCelineComponent } from './organizacioneCeline/organizacione-celine.component';
import { VlasniciVrednostiComponent } from './vlasniciVrednosti/vlasnici-vrednosti.component';
import { IntenzitetPretnjiComponent } from './intenzitet-pretnji/intenzitet-pretnji.component';
import { IntenzitetRanjivostiComponent } from './intenzitet-ranjivosti/intenzitet-ranjivosti.component';

export const SifarniciRoutes: RouterConfig = [
  { path: 'vrstevrednosti', component: VrsteVrednostiComponent },
  { path: 'pretnje', component: PretnjeComponent },
  { path: 'ranjivosti', component: RanjivostiComponent },
  { path: 'organizacioneceline', component: OrganizacioneCelineComponent },
  { path: 'vlasnicivrednosti', component: VlasniciVrednostiComponent },
  { path: 'intenzitetPretnji', component: IntenzitetPretnjiComponent },
  { path: 'intenzitetRanjivosti', component: IntenzitetRanjivostiComponent }
  
];