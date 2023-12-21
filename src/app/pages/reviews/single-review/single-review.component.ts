import {Component, OnInit} from '@angular/core';
import {SingleReviewService} from "../../../services/single-review.service";
import {SingleCourseService} from "../../../services/single-course.service";
import {Course} from "../../../models/course.model";
import {UserDetails} from "../../../models/user.model";

@Component({
  selector: 'app-single-review',
  templateUrl: './single-review.component.html',
  styleUrls: ['./single-review.component.css']
})
export class SingleReviewComponent implements OnInit{

  reviews = {}
  singleCourse!: Course;

  constructor(
    private singleReviewService:SingleReviewService,
    ) {
  }

  ngOnInit(){
      this.singleReviewService.getReviewsByCourseId();
      this.reviews = this.singleReviewService.reviews;
      console.log("INSIDE single-review.component " + this.reviews);
  }

}
