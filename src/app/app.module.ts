import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SearchMetierComponent } from './search-metier/search-metier.component';
import { LogoComponent } from './logo/logo.component';
import { FooterComponent } from './footer/footer.component';
import { AccueilComponent } from './accueil/accueil.component';
import {RoutingModule} from './routing/routing.module'

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
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
