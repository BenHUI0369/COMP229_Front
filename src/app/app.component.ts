import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from './service/authentication.service';

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


  constructor(
    public authenticationService: AuthenticationService,
    private _snackBar: MatSnackBar
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
  }
    
  onClickLogout() {
    if(this.isloggingin == true && !this.loginStatus) {
      this.authenticationService.logout();
      this.alreadyLogin  = localStorage.getItem('user')? true: false;
      this._snackBar.open("Logout successfully!", "Close", {
        duration: 1000,
        verticalPosition: 'top'
      });
    }
  }

  

}
