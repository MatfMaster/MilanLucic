import { provideRouter, RouterConfig } from '@angular/router';

import { ProcenaRizikaVrsteVrednostiComponent } from './procena-rizika-vrste-vrednosti.component';
import { ProcenaRizikaVrednostiComponent } from './procena-rizika-vrednosti.component';

export const ProcenaRizikaRoutes: RouterConfig = [
  { path: 'procena-rizika-vrste-vrednosti', component: ProcenaRizikaVrsteVrednostiComponent },
  { path: 'procena-rizika-vrednosti', component: ProcenaRizikaVrednostiComponent }
  
];