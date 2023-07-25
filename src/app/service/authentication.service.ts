
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Admin } from '../model/admin.js';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private isLogin = new BehaviorSubject<any>(false);
    private adminSubject: BehaviorSubject<Admin | null>;
    public admin: Observable<Admin | null>;
    public loginStatus = new BehaviorSubject<any>('');

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.adminSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('admin')!));
        this.admin = this.adminSubject.asObservable();
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

    logout() {
        this.setLoginValue(false);
        this.setLoginStatusValue('');
        // remove user from local storage to log user out
        localStorage.removeItem('admin');
        this.adminSubject.next(null);
        this.router.navigate(['/login']);
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