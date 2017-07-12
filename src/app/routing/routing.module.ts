import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import {AccueilComponent} from '../component/accueil/accueil.component'
import {MetierComponent} from '../component/metier/metier.component'


const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'accueil',  component: AccueilComponent },
  { path: 'metier',  component: MetierComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class RoutingModule { }
