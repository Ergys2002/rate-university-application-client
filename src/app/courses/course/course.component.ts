import {Component, OnInit} from '@angular/core';
import {SingleCourseService} from "../../services/single-course.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit{

  singleCourse:any;
  userEmail:any;
  constructor(private singleCourseService: SingleCourseService,private authService : AuthService) {
  }

  ngOnInit(): void {
    this.singleCourseService.getCourse().subscribe((data)=>{
      this.singleCourse = data;
    })
  }

  appendUser(courseUUID:string){
      this.userEmail = this.authService.getUser().email;
      this.singleCourse.enrollUser(this.userEmail,courseUUID);
  }

}
