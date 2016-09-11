import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);

// import { bootstrap }    from '@angular/platform-browser-dynamic';
// import { HTTP_PROVIDERS } from '@angular/http';

// import { disableDeprecatedForms, provideForms } from '@angular/forms';

// // Za HashLocationStrategy 
// import { provide } from '@angular/core';
// import { LocationStrategy, HashLocationStrategy } from '@angular/common';

// import { APP_ROUTER_PROVIDERS } from './app.routes';
// import { AppComponent } from './app.component';
// import { GlobalService} from './global.service';

// // Add all operators to Observable
// import 'rxjs/Rx';

// bootstrap(AppComponent, [
//     disableDeprecatedForms(),
//     provideForms(),
//     GlobalService,
//     HTTP_PROVIDERS,
//     APP_ROUTER_PROVIDERS,
//     provide(Window, { useValue: window }),
//     provide(LocationStrategy, {useClass: HashLocationStrategy})  // Za HashLocationStrategy
// ]);