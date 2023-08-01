import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserGuardService implements CanActivate {
  constructor(private router: Router) {}



  canActivate(): boolean {
    const token: any = localStorage.getItem('user');
    // Redirect to login page
    if (!token) {
      this.router.navigate(['login']);
      return false;
    }
    const decoded: any = jwt_decode(token);
    const permission = decoded.permission;
    // Logic that allow website access - localStorage.getItem('user')
    if (permission >= 0) {
      //this.router.navigate(['/main']);
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

}