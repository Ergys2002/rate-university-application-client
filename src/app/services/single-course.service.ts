import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SingleCourseService {

  constructor(private http: HttpClient) { }

  getCourse(){
    return this.http.get(environment.apiBaseUrl + "courses/uuid/bb73f5f7-9912-4c75-88bf-a9cce5046b6f");
  }
}
