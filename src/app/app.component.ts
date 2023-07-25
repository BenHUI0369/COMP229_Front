import { Component, OnInit } from '@angular/core';

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

  constructor(public authenticationService: AuthenticationService){
    this.isloggingin = authenticationService.getLoginValue();
    this.loginStatus = authenticationService.getLoginStatusValue();
  }

  ngOnInit() {
    this.authenticationService.getLoginValue().subscribe((value: boolean) => {
      //console.log("app ngOnInit" + value);
      this.isloggingin = value;
    });

    this.authenticationService.getLoginStatusValue().subscribe((value: string) => {
      this.loginStatus = value;
    });
  }
    
  onClickLogout() {
    if(this.isloggingin == true && !this.loginStatus) {
      this.authenticationService.logout();
    }
  }

  

}
