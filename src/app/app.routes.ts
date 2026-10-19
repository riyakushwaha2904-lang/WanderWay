
import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Destinations } from './pages/destinations/destinations';
import { Packages } from './pages/packages/packages';
import { Booking } from './pages/booking/booking';
import { Contact } from './pages/contact/contact';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'destinations', component: Destinations },
  { path: 'packages', component: Packages },
  { path: 'booking', component: Booking },
  { path: 'contact', component: Contact },
  { path: '**', redirectTo: '' }
];


