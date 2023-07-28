import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

    loading = false;
    submitted = false;
    error = '';
    username: string = '';
    password: string = '';
    hide = true;
    islogin = false;
    loginStatus = '';

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private _snackBar: MatSnackBar
    ) { 
        // redirect to home if already logged in
        if (this.authenticationService.adminValue) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
      this.authenticationService.getLoginValue().subscribe((value: boolean) => {
        this.islogin = value;
      });

      this.authenticationService.getLoginStatusValue().subscribe((value: string) => {
        this.loginStatus = value;
      });
    }
    /* backup
    onSubmit(loginData: any) {
        this.submitted = true;
        this.error = '';
        this.loading = true;

          if(this.islogin == false){
            this.authenticationService.login(this.username, this.password).pipe(first()).subscribe ( (resultData:any) =>{
              this.loginStatus = resultData.status;
              if (resultData.status) {
                this.authenticationService.setLoginValue(true);
                this._snackBar.open("Login successfully!", "Close", {
                  duration: 1000,
                  verticalPosition: 'top'
                });
                this.router.navigate(['/admin']);
              } else {
                this._snackBar.open("Fail to login!", "Close", {
                  duration: 1000,
                  verticalPosition: 'top'
                });
                this.router.navigate(['/']);
                this.loading = false;
              }
            });
          } 
        
    }*/

    onSubmit(loginData: any) {
      this.submitted = true;
      this.error = '';
      this.loading = true;

        if(this.islogin == false){
          this.authenticationService.login_jwt(this.username, this.password).pipe(first()).subscribe ( (resultData:any) =>{
            this.loginStatus = resultData.permission? 'true': 'false';
            if (resultData.permission >= 0) {
              this.authenticationService.setLoginValue(true);
              this._snackBar.open("Login successfully!", "Close", {
                duration: 1000,
                verticalPosition: 'top'
              });
              // bring admin to admin page, user to main page
              if (resultData.permission !== 1) {
                this.router.navigate(['/admin']);
              } else {
                this.router.navigate(['/main']);
              }
              
            } else {
              this._snackBar.open("Fail to login!", "Close", {
                duration: 1000,
                verticalPosition: 'top'
              });
              this.router.navigate(['/']);
              this.loading = false;
            }
          });
        } 
      
  }


}
