// src/app/lecturer.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../environments/environment";
import { LecturerModel } from '../models/lecturer.model';

@Injectable({
  providedIn: 'root'
})
export class LecturerService {

  constructor(private httpClient: HttpClient) {}
  getAllLecturers(): Observable<LecturerModel[]> {
    return this.httpClient.get<LecturerModel[]>(environment.apiBaseUrl + 'lecturers');
  }
}
