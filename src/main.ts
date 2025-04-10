import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { registerLocaleData } from '@angular/common';
import localeEsMX from '@angular/common/locales/es-MX';

registerLocaleData(localeEsMX);
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
