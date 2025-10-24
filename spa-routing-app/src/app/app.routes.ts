import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Product } from './pages/product/product';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'product/:id', component: Product },
  { 
    path: 'admin', 
    loadChildren: () => import('./pages/admin/admin').then(m => m.adminRoutes)
  },
  { path: '**', redirectTo: '' }
];