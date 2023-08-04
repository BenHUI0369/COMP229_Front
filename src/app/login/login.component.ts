import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { catchError, first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '../service/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterComponent } from '../register/register.component';
import { MatDialog } from '@angular/material/dialog';
import { throwError } from 'rxjs';

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
        private _snackBar: MatSnackBar,
        private formBuilder: FormBuilder,
        private dialog: MatDialog
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
    
    onSubmit(loginData: any) {
      this.submitted = true;
      this.error = '';
      this.loading = true;
  
      if (this.islogin == false) {
        this.authenticationService.login_jwt(this.username, this.password)
          .pipe(
            first(),
            catchError(error => {
              // Handle login error, e.g., show an error message to the user
              console.error('Login failed:', error);
              this._snackBar.open('Wrong username or password', 'Close', {
                duration: 3000,
                verticalPosition: 'top'
              });
              this.loading = false;
              return throwError('Login failed');
            })
          )
          .subscribe(resultData => {
            this.loginStatus = resultData.permission ? 'true' : 'false';
            if (resultData.permission >= 0) {
              // Handle successful login
              this.authenticationService.setLoginValue(true);
              this._snackBar.open('Login successfully!', 'Close', {
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
              // Handle login failure
              this._snackBar.open('Fail to login!', 'Close', {
                duration: 1000,
                verticalPosition: 'top'
              });
              this.router.navigate(['/']);
            }
            this.loading = false;
          });
      }
    }

  openRegistrationDialog() {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '500px', // Set the width of the dialog
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle any actions after the dialog is closed (if needed)
      console.log('Dialog closed');
    });
  }

  visitor() {
    const username = 'user';
    const password = 'user';

    this.authenticationService.login_jwt(username, password)
    .pipe(
      first(),
      catchError(error => {
        // Handle login error, e.g., show an error message to the user
        console.error('Login failed:', error);
        this._snackBar.open('Wrong username or password', 'Close', {
          duration: 3000,
          verticalPosition: 'top'
        });
        this.loading = false;
        return throwError('Login failed');
      })
    )
    .subscribe(resultData => {
      this.loginStatus = resultData.permission ? 'true' : 'false';
      if (resultData.permission >= 0) {
        // Handle successful login
        this.authenticationService.setLoginValue(true);
        this._snackBar.open('Welcome visitor!', 'Close', {
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
        // Handle login failure
        this._snackBar.open('Fail to login!', 'Close', {
          duration: 1000,
          verticalPosition: 'top'
        });
        this.router.navigate(['/']);
      }
      this.loading = false;
    });
  }

}
