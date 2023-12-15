import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Observable} from "rxjs";
import {Course} from "../models/course.model";
import {CoursesComponent} from "../pages/courses/courses.component";

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor(private http:HttpClient) { }

  getCoursePage(): Observable<Course[]>{
    return this.http.get<Course[]>(environment.apiBaseUrl + "courses");
  }

  getCourseById(id : string):Observable<Course>{
    return this.http.get<Course>(environment.apiBaseUrl + "courses/details?id=" + id)
  }

}
