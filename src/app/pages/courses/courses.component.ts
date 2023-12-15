import {Component, OnInit} from '@angular/core';
import {CoursesService} from "../../services/courses.service";
import {SingleCourseService} from "../../services/single-course.service";
import {Router} from "@angular/router";
import {Course} from "../../models/course.model";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit{
  p : number = 1;
  pageOfCourses: Course[] = [];

  constructor(private coursesService:CoursesService,private singleCourseService:SingleCourseService, private router: Router) {
  }

  ngOnInit(): void {
    this.coursesService.getCoursePage().subscribe({
      next : (data: Course[]) => {
        this.pageOfCourses = data;
        console.log(data)
      }});
  }



}
