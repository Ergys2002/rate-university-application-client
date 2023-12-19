import {Component, OnInit} from '@angular/core';
import {SingleCourseService} from "../../../services/single-course.service";
import {ActivatedRoute} from "@angular/router";
import {CoursesService} from "../../../services/courses.service";
import {Course} from "../../../models/course.model";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit{

  singleCourse!: Course;

  isStudentEnrolled: Object = false;

  constructor(private courseService: CoursesService, private  router: ActivatedRoute
  ,private singleCourseService: SingleCourseService) {

  }

  ngOnInit() {
    const id:string = this.router.snapshot.paramMap.get('id') || '';
    this.courseService.getCourseById(id).subscribe({
      next: result => {
        this.singleCourse = result;
        }
    });

  }

  isEnrolled(courseId:string,userEmail:string){
    this.singleCourseService.isEnrolled(courseId,userEmail);
    this.isStudentEnrolled = this.singleCourseService.isStudentEnrolled;
  }

}
