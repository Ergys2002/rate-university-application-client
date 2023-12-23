import {Component, OnInit} from '@angular/core';
import {SingleCourseService} from "../../../services/single-course.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CoursesService} from "../../../services/courses.service";
import {Course} from "../../../models/course.model";
import {AuthService} from "../../../services/auth.service";
import {UserDetails} from "../../../models/user.model";
import {FormControl,FormGroup,ReactiveFormsModule} from "@angular/forms";
import {SingleReviewService} from "../../../services/single-review.service";
import {Lecturer} from "../../../models/lecturer.model";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent implements OnInit{

  singleCourse!: Course;

  isStudentEnrolled: Object = false;

  loggedInUser: UserDetails | any;

  lecturer !: Lecturer;

  constructor(private courseService: CoursesService,
              private  router: ActivatedRoute,
              private singleCourseService: SingleCourseService,
              private authService: AuthService,
              private singleReviewService: SingleReviewService,
              ) {

  }

  ngOnInit() {
    const id:string = this.router.snapshot.paramMap.get('id') || '';
    this.courseService.getCourseById(id).subscribe({
      next: result => {
        this.singleCourse = result;
        this.singleReviewService.singleCourse = result;
        this.getLecturerById();
        }
    });
    this.getLoggedUser();
  }

  getLecturerById(){
      this.singleCourseService.getLecturerById(this.singleCourse.lecturerId).subscribe({
        next :(data : Lecturer) => {
          this.lecturer = data;
          console.log("Lecturer "+data)
        }}
      )
  }

  getLoggedUser(){
    this.authService.loggedInUser().subscribe({
      next: (result : UserDetails) => {
        this.loggedInUser = result;
      }
    });

    console.log('prove')
    console.log('Logged in user: '+this.loggedInUser)
  }


  isEnrolled(){
    this.singleCourseService.isEnrolled(this.singleCourse.id,this.loggedInUser.email);
    this.isStudentEnrolled = this.singleCourseService.isStudentEnrolled;
  }


  dropOut(){
    this.singleCourseService.dropOutOfCourse(this.loggedInUser.email,this.singleCourse.id);
  }


}
