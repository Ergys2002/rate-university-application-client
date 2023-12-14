import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SingleCourseService {

  courseId:string = "3895715a-6944-4514-8a17-940b4d55722b";

  constructor(private http: HttpClient) { }

  getCourse(){
    return this.http.get(environment.apiBaseUrl + "courses/uuid/" + this.courseId);
  }
  setCourseId(newCourseId:string){
    this.courseId = newCourseId;
  }
}
