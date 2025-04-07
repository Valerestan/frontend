import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(FormsModule), provideRouter(routes)],
});

import { ProductoComponent } from './app/producto/producto.component';

bootstrapApplication(ProductoComponent).catch((err) => console.error(err));
