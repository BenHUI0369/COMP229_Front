import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './helper/auth.guard';
import { AdminGuardService } from './helper/admin-auth-guard';
import { UserGuardService } from './helper/user-auth-guard';
import { EditFormComponent } from './edit-form/edit-form.component';
import { RegisterComponent } from './register/register.component';

const appRoutes: Routes = [
    {
        path : '',
        component: MainComponent, 
        canActivate: [AuthGuard] 
    },
    {
        path : 'main',
        component: MainComponent,
        canActivate: [UserGuardService]
    },
    {
        path : 'login',
        component: LoginComponent
    },
    {
        path : 'admin',
        component: AdminComponent,
        canActivate: [AdminGuardService]
    },
    {
        path : 'edit',
        component: EditFormComponent
    },
    {
        path : 'reg',
        component: RegisterComponent
    }
];

export default appRoutes;