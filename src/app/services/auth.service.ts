import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, map } from 'rxjs';
import {User, UserSignIn, UserDetails, UserUpdate} from '../models/user.model';
import {environment} from "../environments/environment";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(this.getUser());

  get userSubject$() {
    return this.userSubject.asObservable();
  }
  constructor(private httpClient : HttpClient, private router : Router) { }


  login(request: UserSignIn){
    return this.httpClient
      .post<User>(environment.apiBaseUrl + "user/login", request)
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

  loggedInUser() :  Observable<UserDetails>{
    return this.httpClient.get<UserDetails>(environment.apiBaseUrl + "user/logged-in-user")
  }


  submitUpdatedUser(req: UserUpdate, profilePhoto: File | null): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('updateUserRequest', JSON.stringify(req));
    if (profilePhoto) {
      formData.append('profilePhoto', profilePhoto);
    }

    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    });

    const url = environment.apiBaseUrl + "user/update-profile";
    return this.httpClient.put(url, formData, {headers});
  }
}
