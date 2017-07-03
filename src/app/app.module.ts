// import core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';



// import module  
import {RoutingModule} from './routing/routing.module'
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import component
import { AppComponent } from './app.component';
import { LogoComponent } from './logo/logo.component';
import { FooterComponent } from './footer/footer.component';
import { AccueilComponent } from './accueil/accueil.component';
import { SearchMetierComponent } from './search-metier/search-metier.component';

//import services
import { AccueilService } from './accueil.service';
import { InMemoryDataService }  from './in-memory-data.service';


@NgModule({
  declarations: [
    AppComponent,
    SearchMetierComponent,
    LogoComponent,
    FooterComponent,
    AccueilComponent
  ],
  imports: [
    RoutingModule,
    BrowserModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    HttpModule
  ],
  providers: [AccueilService,InMemoryDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }