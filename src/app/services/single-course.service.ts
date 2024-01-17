import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Course} from "../models/course.model";
import Swal from 'sweetalert2';
import {SweetAlertService} from "./sweet-alert.service";
import {Lecturer} from "../models/lecturer.model";
import {Observable} from "rxjs";
import {b, em} from "@fullcalendar/core/internal-common";

@Injectable({
  providedIn: 'root'
})
export class SingleCourseService {

  isStudentEnrolled:Object = false;
  enrolled: boolean = false;

  constructor(private http: HttpClient
  ,private sweetAlertService:SweetAlertService) { }

  getLecturerById(id : string): Observable<Lecturer>{
    return this.http.get<Lecturer>(environment.apiBaseUrl + "lecturers/" + id);
  }

  getAverageRating(courseId: string){
    return this.http.get(environment.apiBaseUrl + "reviews/get-average-rating/" + courseId);
  }




  isEnrolled(courseId:string,email:string){
      const data = {
        courseId : courseId,
        email : email
      }
      const url =  environment.apiBaseUrl + "courses/isEnrolled";

    this.http.post(url, data).subscribe({
      next: res =>{
        if (res == true) {
          this.enrolled = true;
        }
        this.isStudentEnrolled = res;
      }
    });

    return this.enrolled;
  }

  enrollUser(email:string,courseId:string){
    const data:{email: string, courseId: string} = {
      email : email,
      courseId : courseId
    }

    const url =  environment.apiBaseUrl + "courses/enroll";

    if (!this.isEnrolled(courseId,email)) {
      this.http.post(url, data).subscribe();
      this.sweetAlertService.successNotification("Enroll Request", "Enrolled successfully");
      console.log("On Enroll service" + data.email)
    } else {
      this.sweetAlertService.failNotification("Enroll Request" , "You are already enrolled");
    }
  }

  dropOutOfCourse(email:string,courseId:string){
    const data = {
      email : email,
      courseId : courseId
    }
    const url =  environment.apiBaseUrl + "drop-course";

    this.http.post(url, data).subscribe(
      (response) => {
          this.sweetAlertService.successNotification("Course Dropout","You dropped out of course");
        console.log('dropCourse request successful', response);
      },
      (error) => {
        console.error('Error in post request', error);
      }
    );
  }
}
