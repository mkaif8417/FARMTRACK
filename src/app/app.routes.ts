import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { Dashboard } from './dashboard/dashboard';
import { Camera } from './camera/camera';
import { Crops } from './crops/crops';
import { Map } from './map/map';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'dashboard', component: Dashboard },
  { path: 'camera', component: Camera },
  { path: 'crops', component: Crops },
  { path: 'map', component: Map },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: '**', redirectTo: '' }
];