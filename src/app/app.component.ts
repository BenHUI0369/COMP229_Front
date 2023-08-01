import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from './service/authentication.service';
import jwt_decode from 'jwt-decode';
import { LoginLogoutService } from './helper/login-logout.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pokemondb';
  isloggingin: any;
  loginStatus: any;
  alreadyLogin: boolean = localStorage.getItem('user')? true: false;
  checkisAdmin = false;
  isAdmin2: boolean = false;



  constructor(
    public authenticationService: AuthenticationService,
    private _snackBar: MatSnackBar,
    private loginOutService: LoginLogoutService
    ){
    this.isloggingin = authenticationService.getLoginValue();
    this.loginStatus = authenticationService.getLoginStatusValue();
  }

  ngOnInit() {
    this.authenticationService.getLoginValue().subscribe((value: boolean) => {
      //console.log("app ngOnInit" + value);
      this.isloggingin = value;
      this.alreadyLogin = localStorage.getItem('user')? true: false;
    });

    this.authenticationService.getLoginStatusValue().subscribe((value: string) => {
      this.loginStatus = value;
    });


    if(this.alreadyLogin) {
      let JWT: any = localStorage.getItem('user');
      let decodeJWT: any = jwt_decode(JWT);
      let permission = decodeJWT.permission;
      if(permission === 0) {
        this.isAdmin2 = true;
      } else {
        this.isAdmin2 = false;
      }
    }
  }
    
  onClickLogout() {
    if(this.isloggingin == true && !this.loginStatus) {
      this.authenticationService.logout();
      this.loginOutService.logout();
      this.alreadyLogin  = localStorage.getItem('user')? true: false;
      this._snackBar.open("Logout successfully!", "Close", {
        duration: 1000,
        verticalPosition: 'top'
      });
    }
  }

  get isLoggingIn(): boolean {
    return this.loginOutService.isLoggedIn();
  }

  get isAdmin$(): Observable<boolean> {
    return this.loginOutService.isAdminUser$();
  }

}
