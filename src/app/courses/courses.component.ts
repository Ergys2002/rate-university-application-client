import {Component, OnInit} from '@angular/core';
import {CoursesService} from "../services/courses.service";
import {SingleCourseService} from "../services/single-course.service";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit{
  p : number = 1;
  pageOfCourses:any;

  constructor(private coursesService:CoursesService,private singleCourseService:SingleCourseService) {
  }

  ngOnInit(): void {
    this.coursesService.getCoursePage().subscribe((data)=>{
      this.pageOfCourses = data;
    })
  }
  onClick(userId:string){
      this.singleCourseService.setCourseId(userId);
  }
}
