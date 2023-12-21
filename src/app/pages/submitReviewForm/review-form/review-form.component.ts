import {Component, OnInit} from '@angular/core';
import {FormControl,FormGroup,ReactiveFormsModule} from "@angular/forms";
import {Course} from "../../../models/course.model";
import {SingleCourseService} from "../../../services/single-course.service";
import {UserDetails} from "../../../models/user.model";
import {AuthService} from "../../../services/auth.service";
import {CoursesService} from "../../../services/courses.service";
import {ActivatedRoute} from "@angular/router";
import {SingleReviewService} from "../../../services/single-review.service";

@Component({
  standalone: true,
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css'],
  imports: [ReactiveFormsModule]
})
export class ReviewFormComponent implements OnInit {

  loggedInUser!: UserDetails;

  constructor(
    private singleReviewService: SingleReviewService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.authService.loggedInUser().subscribe({
      next: result => {
        this.loggedInUser = result;
      }
    });
  }

  applyForm = new FormGroup({
      message: new FormControl(''),
      rating: new FormControl('')
    }
  );

  submitReview() {
    this.singleReviewService.submitReview(
      this.applyForm.value.rating ?? ' ',
      this.applyForm.value.message ?? ' ',
      this.loggedInUser.email ?? ' '
    );
  }

}
