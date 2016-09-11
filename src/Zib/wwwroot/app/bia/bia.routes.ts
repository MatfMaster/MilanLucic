import { provideRouter, RouterConfig } from '@angular/router';

import { DobavljaciComponent } from './dobavljaci/dobavljaci.component';
import { BiaComponent } from './bia/bia.component';

export const BiaRoutes: RouterConfig = [
  { path: 'bia', component: BiaComponent },
  { path: 'dobavljaci', component: DobavljaciComponent }
  
];