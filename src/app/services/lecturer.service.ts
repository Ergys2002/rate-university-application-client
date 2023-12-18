// src/app/lecturer.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../environments/environment";
import { Lecturer } from '../models/lecturer.model';
import {Course} from '../models/course.model'

@Injectable({
  providedIn: 'root'
})
export class LecturerService {

  constructor(private httpClient: HttpClient) {}

  getLecturerById(id : string):Observable<Lecturer>{
    return this.httpClient.get<Lecturer>(environment.apiBaseUrl + `lecturers/${id}`)
  }

  getAllLecturers(): Observable<Lecturer[]> {
    return this.httpClient.get<Lecturer[]>(environment.apiBaseUrl + 'lecturers');
  }

  getAllCoursesOfAlecturer(id : string): Observable<Course[]>{
    return this.httpClient.get<Course[]>(environment.apiBaseUrl + 'courses/all-courses-of-a-lecturer?id=' + id)
  }
}


