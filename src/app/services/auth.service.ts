import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, map } from 'rxjs';
import { User, UserSignIn } from '../models/user.model';
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(this.getUser());

  get userSubject$() {
    return this.userSubject.asObservable();
  }
  constructor(private httpClient : HttpClient) { }


  login(request: UserSignIn){
    return this.httpClient
      .post<User>(environment.apiBaseUrl + "auth/login", request)
      .pipe(map(result => {
        if(result) {
          this.setUser(result)
          return result;
        }

        throw new Error("Could not login");
      }));
  }

  signup(request: UserSignIn){
    return this.httpClient
      .post<User>(environment.apiBaseUrl + "user/register", request)
      .pipe(map(result => {
        if(result) {
          this.setUser(result)
          return result;
        }

        throw new Error("Could not signup");
      }));
  }

  public setUser(user: User) {
    localStorage.setItem("user", JSON.stringify(user))
    this.userSubject.next(user);
  }

  public getUser(): User {
    try{
      return JSON.parse(localStorage.getItem("user") || '');
    }
    catch (e) {
      console.error("Could not parse user", e);
    }
    return {};
  }

  clearUser() {
    localStorage.removeItem("user");
    this.userSubject.next({});
  }
}
