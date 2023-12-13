import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  constructor(private httpClient: HttpClient) { }

  getNumberOfInstructors(): Observable<any>{
    return this.httpClient.get(environment.apiBaseUrl + "lecturers/number-of-lecturers");
  }
  getNumberOfCourses(): Observable<any>{
    return this.httpClient.get(environment.apiBaseUrl + "courses/number-of-courses");
  }

  getNumberOfStudents(): Observable<any>{
    return this.httpClient.get(environment.apiBaseUrl + "students/number-of-students");
  }

}
