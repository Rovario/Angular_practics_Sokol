import { Routes } from '@angular/router';
import { ListComponent } from './components/list/list';
import { DetailsComponent } from './components/details/details';

export const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: ListComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: '**', redirectTo: '/list' }
];