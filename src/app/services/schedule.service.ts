import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ScheduleData} from "../models/schedule.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private httpClient : HttpClient) { }

  getScheduleData():Observable<ScheduleData[]> {
    return this.httpClient.get<ScheduleData[]>(environment.apiBaseUrl + "schedule");
  }
}
