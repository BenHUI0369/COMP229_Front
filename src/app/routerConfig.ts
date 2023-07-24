import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './helper/auth.guard';

const appRoutes: Routes = [
    {
        path : '',
        component: LoginComponent, 
        canActivate: [AuthGuard] 
    },
    {
        path : 'main',
        component: MainComponent
    },
    {
        path : 'login',
        component: LoginComponent
    },
    {
        path : 'admin',
        component: AdminComponent
    },
];

export default appRoutes;