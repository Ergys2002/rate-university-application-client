import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {UserDetails, UserSignIn} from "../../models/user.model";
import {CoursesService} from "../../services/courses.service";
import {Course} from "../../models/course.model";
import {FormControl, FormGroup} from "@angular/forms";
import {SingleReviewService} from "../../services/single-review.service";
import {ReviewModel} from "../../models/review.model";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  loggedInUser!: UserDetails;

  coursesOfAuthenticatedUser: Course[] = [];

  reviewsOfAuthenticatedUser: ReviewModel[] = [];

  activeTab: string = 'courses';

  newUser: UserSignIn = {};

  constructor(private authService: AuthService, private coursesService: CoursesService, private reviewService: SingleReviewService) {
  }

  ngOnInit() {
    this.authService.loggedInUser().subscribe({
      next: result => {
        this.loggedInUser = result;
      }
    });


    this.coursesService.getAllCoursesOfAuthenticatedUser().subscribe({
      next: (data: Course[]) => {
        this.coursesOfAuthenticatedUser = data;
        console.log(data)
      }
    });


    this.reviewService.getReviewsByUserEmail().subscribe({
      next: (data: ReviewModel[]) => {
        this.reviewsOfAuthenticatedUser = data;
      }
    });

    console.log(this.reviewsOfAuthenticatedUser)
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
    console.log(this.activeTab)
  }

  applyForm = new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      phoneNumber: new FormControl('')

    }
  );

  submitUpdatedUser() {
    this.authService.submitUpdatedUser(
      this.applyForm.value.firstname ?? ' ',
      this.applyForm.value.lastname ?? ' ',
      this.applyForm.value.email ?? ' ',
      this.applyForm.value.password ?? ' ',
        this.applyForm.value.phoneNumber ?? ' '
    );

    this.newUser.email = <string>this.applyForm.value.email
    this.newUser.password = <string>this.applyForm.value.password

    console.log(this.newUser)

    this.authService.update(this.newUser).subscribe(
      (res: any) => {
        console.log("success")
        this.ngOnInit()
      })
  }



}
