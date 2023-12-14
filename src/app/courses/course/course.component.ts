import {Component, OnInit} from '@angular/core';
import {SingleCourseService} from "../../services/single-course.service";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit{

  singleCourse:any;

  constructor(private singleCourseService: SingleCourseService) {
  }

  ngOnInit(): void {
    this.singleCourseService.getCourse().subscribe((data)=>{
      this.singleCourse = data;
    })
  }

}
