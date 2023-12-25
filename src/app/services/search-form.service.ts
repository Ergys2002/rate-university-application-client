import { Injectable } from '@angular/core';
import {environment} from "../environments/environment";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Course} from "../models/course.model";
import {SweetAlertService} from "./sweet-alert.service";

@Injectable({
  providedIn: 'root'
})
export class SearchFormService {

    searchedCourses : any;

  constructor(private http:HttpClient) { }

    submitApplication(courseName: string) {

      const data = {
          courseName : courseName
      }

      const url =  environment.apiBaseUrl + "courses/search";

      this.http.post(url, data).subscribe(
          {
              next: value  => {
                  this.searchedCourses = value;
                  console.log(value);
              },
              error: error => {
                  console.log("SubmitApp Error");
                  console.error(error);
              }
          }
      );
    }
}
