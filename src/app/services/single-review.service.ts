import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {UserDetails} from "../models/user.model";
import {AuthService} from "./auth.service";
import {Course} from "../models/course.model";
import {ActivatedRoute} from "@angular/router";
import {SingleCourseService} from "./single-course.service";
import {CoursesService} from "./courses.service";

@Injectable({
  providedIn: 'root'
})
export class SingleReviewService {

  loggedInUser: UserDetails | any;
  reviews = {};
  singleCourse!: Course;

  constructor(
    private http: HttpClient
  ) { }

   getReviewByCourseId() {
    console.log(this.singleCourse.id);
     return this.http.get(
       environment.apiBaseUrl + "reviews/c/" + this.singleCourse.id);
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
        window.location.reload();
        console.log('Save review successful', response);
        if (response == true){
          alert("Review submited!");
        }
        else if (response == false){
          alert("Failed to submit review!");
        }
      },
      (error) => {
        console.error('Error in post request', error);
      }
    );
  }

}
