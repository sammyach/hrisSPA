import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private currentUserTokenSubject: BehaviorSubject<string>;
  // public currentToken: Observable<string>;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
   baseUrl = environment.apiUrl;
  constructor(private http: HttpClient, private router: Router) {
    // this.currentUserTokenSubject = new BehaviorSubject<string>(localStorage.getItem('token'));
    // this.currentToken = this.currentUserTokenSubject.asObservable();

    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    console.log('current user in auth service', this.currentUser);

  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
}

  // public get currentUserTokenValue(): string {
  //   return this.currentUserTokenSubject.value;
  // }

  login(username: string, password: string){
    return this.http.post(`${this.baseUrl}/users/authenticate`, { username, password })
        .pipe(map((res: any) => {
          const user = res;
          console.log('usr', user);

          // localStorage.setItem('token', result.token);
          // this.currentUserTokenSubject.next(result.token);
          // //return token;
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        }));
  }

  logout(){
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    // localStorage.removeItem('token');
    // this.currentUserTokenSubject.next(null);
    this.router.navigate(['login']);
  }

  loggedIn(){
    return this.currentUserValue && this.currentUserValue.token;
    // const token = localStorage.getItem('token');
    // return token; // for now;later we will decode token and check for expiration
  }

  isUser(){
    this.currentUser
    .subscribe(res => {
      if (res.role === 'USER'){
        return true;
      }
    });

    return false;
  }

  isManager(){
    this.currentUser
    .subscribe(res => {
      if (res.role === 'MANAGER'){
        return true;
      }
    });
    return false;
  }

  isAdmin(){
    this.currentUser
    .subscribe(res => {
      if (res.role === 'ADMIN'){
        return true;
      }
    });
    return false;
  }
}
