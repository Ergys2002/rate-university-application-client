import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Course} from "../models/course.model";
import Swal from 'sweetalert2';
import {SweetAlertService} from "./sweet-alert.service";

@Injectable({
  providedIn: 'root'
})
export class SingleCourseService {

  isStudentEnrolled:Object = false;

  constructor(private http: HttpClient
  ,private sweetAlertService:SweetAlertService) { }

  getLecturerById(id : string){
    return this.http.get(environment.apiBaseUrl + "lecturers/" + id);
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

    this.http.post(url, data).subscribe(
      (response) => {
        console.log('Post request successful', response);
        if (response == true){
            this.sweetAlertService.successNotification("Enroll Request","You are already enrolled in this Course")
        }
        else {
            this.sweetAlertService.successNotification("Enroll Request","You are not enrolled in this course!");
        }
        this.isStudentEnrolled = response;
      },
      (error) => {
        console.error('Error in post request', error);
      }
    );
  }

  enrollUser(email:string,courseId:string){
    const data = {
      email : email,
      courseId : courseId
    }
    const url =  environment.apiBaseUrl + "courses/enroll";

    this.http.post(url, data).subscribe(
      (response) => {
          this.sweetAlertService.successNotification("Enroll Request","You enrolled in this course!");
          setTimeout(() => {
              // Reload the window
              window.location.reload();
          }, 2000);
        console.log('enroll request successful', response);
      },
      (error) => {
        console.error('Error in post request', error);
      }
    );
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
          setTimeout(() => {
              // Reload the window
              window.location.reload();
          }, 2000);
        console.log('dropCourse request successful', response);
      },
      (error) => {
        console.error('Error in post request', error);
      }
    );
  }
}
