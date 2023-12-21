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
    private http: HttpClient,
    private authService: AuthService,
    private  router: ActivatedRoute,
    private courseService: CoursesService,
  ) { }

  getReviewsByCourseId(){
    this.http.get(environment.apiBaseUrl + "reviews/c/" + this.singleCourse.id)
      .subscribe(
        (data)=>{
          this.reviews = data;
          console.log("INSIDE SINGLE REVIEW SERVIE : " + data);
        }
      )
  }

  submitReview(rating:string,message:string,email:string){
    console.log(rating);
    console.log(message);
    console.log(this.singleCourse.id + "CourseId");
    console.log(email
      + "LoginUser");
  }

}
