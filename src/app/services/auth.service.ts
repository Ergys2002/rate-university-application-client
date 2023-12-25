import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, map } from 'rxjs';
import { User, UserSignIn, UserDetails } from '../models/user.model';
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
      .post<User>(environment.apiBaseUrl + "user/login", request)
      .pipe(map(result => {
        console.log(result)
        if(result) {
          this.setUser(result)
          return result;
        }
        throw new Error("Could not login");
      }));
  }

  update(request: UserSignIn){
    return this.httpClient
      .put<User>(environment.apiBaseUrl + "user/update-profile", request)
      .pipe(map(result => {
        console.log(result)
        if(result) {
          this.setUser(result)
          return result;
        }
        throw new Error("Could not update");
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


  submitUpdatedUser(firstname:string, lastname:string, email:string, password:string, phoneNumber:string){

    const data = {
      firstname: firstname,
      lastname: lastname,
      email : email,
      password : password,
      phoneNumber : phoneNumber
    }

    const url =  environment.apiBaseUrl + "user/update-profile";

    this.httpClient.put(url, data).subscribe(
      (response) => {

        if (response == true){
          alert("UserUpdate request submited!");
        }
        else if (response == false){
          alert("Failed to submit review!");
        }
      },
      (error) => {
        console.error('Error in put request', error);
      }

    );
  }
}
