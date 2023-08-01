import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginLogoutService {

  private isAdminSubject = new BehaviorSubject<boolean>(false);

  constructor() {
    // Check the initial authentication state when the service is initialized
    this.checkPermissions();
  }

  private checkPermissions(): void {
    const token: any = localStorage.getItem('user');
    if (token) {
      const decoded: any = jwt_decode(token);
      this.isAdminSubject.next(decoded.permission === 0);
    } else {
      this.isAdminSubject.next(false);
    }
  }

  isLoggedIn(): boolean {
    const token: any = localStorage.getItem('user');
    return !!token;
  }

  isAdminUser$(): Observable<boolean> {
    return this.isAdminSubject.asObservable();
  }

  logout(): void {
    // Clear the user token from local storage when the user logs out
    localStorage.removeItem('user');
    this.isAdminSubject.next(false);
  }
}
