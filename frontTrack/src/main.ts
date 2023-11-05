import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

window['CESIUM_BASE_URL'] = '/assets/cesium/';
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));