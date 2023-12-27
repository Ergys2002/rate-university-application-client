import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, map } from 'rxjs';
import { User, UserSignIn, UserDetails } from '../models/user.model';
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


  submitUpdatedUser(firstname:string, lastname:string, email:string, password:string, phoneNumber:string, confirmPassword:string){

    if (password === confirmPassword ){

      const data = {
        firstname: firstname,
        lastname: lastname,
        email : email,
        phoneNumber : phoneNumber,
        password : password,
      }

      const url =  environment.apiBaseUrl + "user/update-profile";

      this.httpClient.put(url, data).subscribe(
        (response) => {

          this.setUser(response)

          this.Notification("Profile Updated","You just updated your profile!","success");
          setTimeout(() => {
          }, 2000);


          if (response == true){
            this.setUser(response)
            alert("UserUpdate request submited!");
          }
          else if (response == false){
            alert("Failed to submit review!");
          }
        },

        (error) => {
          if (error.status === 400) {
            this.Notification("Could not update","There is an existing user with this email","error");
            // Handle Forbidden error
          }
          else {
            console.log('Other HTTP Status:', error.status);
            // Handle other errors if needed
          }
        }
      );
    }

    else{
      this.Notification("Error","Password and Confirm password do not match","error");

      setTimeout(() => {
        this.router.navigateByUrl("/my-profile")
      }, 2000);
    }
  }

  Notification(title:string,message:string,type ?: string) {
    if (type === undefined) {
      // @ts-ignore
      Swal.call('Info', title, message,'success');
    }
    // @ts-ignore
    Swal.call('Info', title, message,type);
  }
}
