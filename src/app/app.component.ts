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

  constructor(public authenticationService: AuthenticationService){
    this.isloggingin = authenticationService.getLoginValue();
  }

  ngOnInit() {
    this.authenticationService.getLoginValue().subscribe((value: boolean) => {
      this.isloggingin = value;

      if(this.isloggingin == true) {
        this.authenticationService.logout();
      }

    });
  }

  

}
