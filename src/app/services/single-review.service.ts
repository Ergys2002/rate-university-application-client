import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {UserDetails} from "../models/user.model";
import {AuthService} from "./auth.service";
import {Course} from "../models/course.model";
import {ActivatedRoute} from "@angular/router";
import {SingleCourseService} from "./single-course.service";
import {CoursesService} from "./courses.service";
import Swal from "sweetalert2";
import {SweetAlertService} from "./sweet-alert.service";

@Injectable({
  providedIn: 'root'
})
export class SingleReviewService {

  loggedInUser: UserDetails | any;
  reviews = {};
  singleCourse!: Course;

  constructor(
    private http: HttpClient,
    private sweetAlertService:SweetAlertService
  ) { }

   getReviewByCourseId() {
    console.log(this.singleCourse.id);
     return this.http.get(
       environment.apiBaseUrl + "reviews/course-reviews/" + this.singleCourse.id);
   }

  submitReview(rating:string,message:string,email:string){
    const data = {
      courseId : this.singleCourse.id,
      email : email,
      rating: rating,
      message: message
    }
    console.log(data);
    const url =  environment.apiBaseUrl + "reviews/save-review";

    this.http.post(url, data).subscribe(
      (response) => {
          this.sweetAlertService.successNotification("Save Review","You just reviewed our course!");
          setTimeout(() => {
              window.location.reload();
          }, 2000);
        console.log('Save review successful', response);
      },
        (error) => {
            if (error.status === 409) {
                this.sweetAlertService.failNotification("Save Review","You have reviewed this course before!");
                console.log('HTTP Status: Conflict (409)');
                // Handle Forbidden error
            } else if (error.status === 406) {
                this.sweetAlertService.infoNotification("Save Review","Only enrolled students can submit a review");
                console.log('HTTP Status: Not Acceptable (406)');
                // Handle Not Acceptable error
            } else {
                console.log('Other HTTP Status:', error.status);
                // Handle other errors if needed
            }
        }
    );
  }
}
