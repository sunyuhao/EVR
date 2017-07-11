// import core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule,JsonpModule  } from '@angular/http';

import { FormsModule } from '@angular/forms';


// import module  
import {RoutingModule} from './routing/routing.module'
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ScrollbarDirective } from './scrollbar.directive';
// import component
import { AppComponent } from './app.component';
import { LogoComponent } from './logo/logo.component';
import { FooterComponent } from './footer/footer.component';
import { AccueilComponent } from './accueil/accueil.component';
import { SearchMetierComponent } from './search-metier/search-metier.component';

//import services
import { AccueilService } from './accueil.service';
import { InMemoryDataService }  from './in-memory-data.service';
import { MetierComponent } from './metier/metier.component';




@NgModule({
  declarations: [
    AppComponent,
    SearchMetierComponent,
    LogoComponent,
    FooterComponent,
    AccueilComponent,
    MetierComponent,
    ScrollbarDirective,
    
  ],
  imports: [
    RoutingModule,
    BrowserModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    HttpModule,
    JsonpModule,
    FormsModule
  ],
  providers: [AccueilService,InMemoryDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
