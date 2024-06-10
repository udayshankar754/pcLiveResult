import { Routes } from '@angular/router';
import { PchomeDataComponent } from './pages/pchome-data/pchome-data.component';

export const routes: Routes = [
    {
        path : '',
        redirectTo : 'home',
        pathMatch : 'full'
    },
    {
        path : 'home',
        component : PchomeDataComponent
    }
];
