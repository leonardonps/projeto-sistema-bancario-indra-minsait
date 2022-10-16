import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

function mudarCor(){
    let chk = document.getElementById('chk');
  
    
    chk?.addEventListener('change', ()=>{
      document.body.classList.toggle('dark');
    })}