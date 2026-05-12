import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { ListitemsComponent } from './listitems/listitems';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'saved', component: ListitemsComponent }
];