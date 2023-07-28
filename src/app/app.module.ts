import { NgModule  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AdminComponent } from './admin/admin.component';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { RouterModule } from '@angular/router';
import routerConfig from './routerConfig';

import { AuthenticationService } from './service/authentication.service';

// import http which connect with API
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { JwtInterceptor } from './helper/jwt.interceptor';
import { ErrorInterceptor } from './helper/error.interceptor';

import { Jwt } from 'jsonwebtoken';

// import user and admin guard
import { AdminGuardService } from './helper/admin-auth-guard'
import { UserGuardService } from './helper/user-auth-guard'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    RouterModule.forRoot(routerConfig),
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AdminGuardService,
    UserGuardService


  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private authenticationService: AuthenticationService){}
 }
