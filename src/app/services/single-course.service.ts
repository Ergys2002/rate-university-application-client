import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Course} from "../models/course.model";

@Injectable({
  providedIn: 'root'
})
export class SingleCourseService {

  isStudentEnrolled:Object = false;

  public getIsStudentEnrolled(){
    return this.isStudentEnrolled;
  }

  constructor(private http: HttpClient) { }

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
          alert("You are already enrolled in this Course");
        }
        else if (response == false){
          this.enrollUser(email,courseId);
          alert("Ju sapo u regjistruat ne kurs!");
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
        console.log('enroll request successful', response);
      },
      (error) => {
        console.error('Error in post request', error);
      }
    );
  }

}
