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
import {SweetAlertService} from "../../../services/sweet-alert.service";

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

  averageRating !: any;

  constructor(private courseService: CoursesService,
              private  router: ActivatedRoute,
              private singleCourseService: SingleCourseService,
              private authService: AuthService,
              private singleReviewService: SingleReviewService,
              private swal: SweetAlertService
              ) {

  }

  ngOnInit() {
    const id:string = this.router.snapshot.paramMap.get('id') || '';
    this.courseService.getCourseById(id).subscribe({
      next: result => {
        this.singleCourse = result;
        this.singleReviewService.singleCourse = result;
        this.getLecturerById();
        this.getAverageRating();
        }
    });
    this.getLoggedUser();
  }

  getAverageRating(){
    this.singleCourseService.getAverageRating(this.singleCourse.id).subscribe(
      {
        next: value => this.averageRating = value
      }
    )
    console.log("GetAverageRating")
  }

  get starArray() {
    return Array(this.singleCourse.courseRating).fill(0).map((_, index) => index);
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
    return this.isStudentEnrolled;
  }

  enrollUser(){
      this.singleCourseService.enrollUser(this.loggedInUser.email,this.singleCourse.id);
    setTimeout(() => {
      this.ngOnInit()
    }, 1000);

  }


  dropOut(){
    this.singleCourseService.dropOutOfCourse(this.loggedInUser.email,this.singleCourse.id);
    setTimeout(() => {
      this.ngOnInit()
    }, 1000);
  }

}
