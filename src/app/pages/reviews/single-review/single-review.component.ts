import {Component, OnInit} from '@angular/core';
import {SingleReviewService} from "../../../services/single-review.service";
import {SingleCourseService} from "../../../services/single-course.service";
import {Course} from "../../../models/course.model";
import {ReviewModel} from "../../../models/review.model";
import {UserDetails} from "../../../models/user.model";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-single-review',
  templateUrl: './single-review.component.html',
  styleUrls: ['./single-review.component.css']
})
export class SingleReviewComponent implements OnInit{

  reviews : any;
  singleCourse!: Course;
  p : number = 1;
  loggedInUser: UserDetails | any;
  constructor(
    private singleReviewService:SingleReviewService,
    private authService: AuthService
    ) {
  }

  ngOnInit() {
    this.singleReviewService.getReviewByCourseId().subscribe(
      data=>{
        this.reviews = data;}
    )
  }

}
