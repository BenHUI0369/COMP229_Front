import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {
  constructor(
    private router: Router,
    private _snackBar: MatSnackBar
    ) {}

  canActivate(): boolean {
    const token: any = localStorage.getItem('user');
    const decoded: any = jwt_decode(token);
    const permission = decoded.permission;

    if (permission === 0) {
      return true;
    }
    this._snackBar.open("You don't have Admin permission!", "Close", {
        duration: 1000,
        verticalPosition: 'top'
      });
    return false;
  }
}