import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AdminComponent } from './admin/admin.component';

const appRoutes: Routes = [
    {
        path : 'login',
        component: LoginComponent
    },
    {
        path : 'main',
        component: MainComponent
    },
    {
        path : 'admin',
        component: AdminComponent
    },
];

export default appRoutes;