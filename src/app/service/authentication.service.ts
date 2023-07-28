
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Jwt } from 'jsonwebtoken';
import { Admin } from '../model/admin.js';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private isLogin = new BehaviorSubject<any>(false);
    //private adminSubject: BehaviorSubject<Admin | null>;
    private adminSubject: BehaviorSubject<any | null>;
    //public admin: Observable<Admin | null>;
    public admin: Observable<any | null>;
    public loginStatus = new BehaviorSubject<any>('');

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        //this.adminSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('admin')!));
        this.adminSubject = new BehaviorSubject(localStorage.getItem('user'));
        this.admin = this.adminSubject.asObservable();
        if (localStorage.getItem('user')) {
            this.isLogin.next(true);
        } else {
            this.isLogin.next(false);
        }
    }

    public get adminValue() {
        return this.adminSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`http://localhost:4000/pokemons/authenticate`, { username, password })
            .pipe(map(admin => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('admin', JSON.stringify(admin));
                this.adminSubject.next(admin);
                return admin;
            }))
    }

    login_jwt2(username: string, password: string) {
        return this.http.post<any>(`http://localhost:4000/auth/login`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', user.refreshToken);
                this.adminSubject.next(user);
                return user;
            }))
    }

    login_jwt(username: string, password: string): Observable<any> {
        return this.http.post<any>(`http://localhost:4000/auth/login`, { username, password })
          .pipe(
            map(user => {
              // Store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('user', user.refreshToken);
              this.adminSubject.next(user);
              return user;
            }),
            catchError((error: HttpErrorResponse) => {
              // Handle errors here and stop sending requests to the API
              if (error.status === 401) {
                console.error('Authentication failed:', error);
                return throwError('Invalid credentials');
              } else {
                console.error('Unexpected error occurred during login:', error);
                return throwError('Something went wrong. Please try again later.');
              }
            })
          );
      }

    logout() {
        let refreshToken = localStorage.getItem('user');
        this.setLoginValue(false);
        this.setLoginStatusValue('');
        // remove user from local storage to log user out
        localStorage.removeItem('user');
        this.adminSubject.next(null);
        this.router.navigate(['/login']);
        this.http.post<any>(`http://localhost:4000/auth/logout`, {refreshToken}).pipe(
            catchError((error: HttpErrorResponse) => {
              // Handle logout errors, e.g., the 401 Unauthorized error
              console.error('Logout failed:', error);
              // Optionally, you can show an error message or perform other actions
              return throwError('Logout failed. Please try again later.');
            })
          ).subscribe();
    }

    setLoginValue(loginValue: any) {
        this.isLogin.next(loginValue);
      }

    getLoginValue(): Observable<boolean> {
        return this.isLogin.asObservable();
      }

    getLoginStatusValue(): Observable<any> {
        return this.loginStatus.asObservable();
      }

    setLoginStatusValue(loginStatusValue: any) {
        return this.loginStatus.next(loginStatusValue);
      }

}