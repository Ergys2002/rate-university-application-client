import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http:HttpClient) { }

  getCoursePage(){
    return this.http.get(environment.apiBaseUrl + "courses/page/1");
  }

  getCoursePage2(){
    return this.http.get(environment.apiBaseUrl + "courses/page/2");
  }

  getCoursePage3(){
    return this.http.get((environment.apiBaseUrl + "courses/page/3"))
  }
}
