import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {UserDetails, UserSignIn, UserUpdate} from "../../models/user.model";
import {CoursesService} from "../../services/courses.service";
import {Course} from "../../models/course.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SingleReviewService} from "../../services/single-review.service";
import {ReviewModel} from "../../models/review.model";
import {SweetAlertService} from "../../services/sweet-alert.service";

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
  applyForm!: FormGroup;
  selectedFile: File | null = null;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  constructor(private authService: AuthService, private swal: SweetAlertService, private coursesService: CoursesService, private reviewService: SingleReviewService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.createUpdateForm()
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

  createUpdateForm() {
    this.applyForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+(?:-[a-zA-Z]+)*$')]],
      lastname: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+(?:-[a-zA-Z]+)*$')]],
      password: ['', [Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]],
      confirmPassword: ['', [ Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }

  submitUpdatedUser() {
    if (this.applyForm.valid) {
      if (this.applyForm.get('password')?.value === this.applyForm.get('confirmPassword')?.value) {

        const userData = new UserUpdate();

        userData.firstName = this.applyForm.get('firstname')?.value;
        userData.lastName = this.applyForm.get('lastname')?.value;
        userData.password = this.applyForm.get('password')?.value;
        userData.phoneNumber = this.applyForm.get('phoneNumber')?.value;

        this.authService.submitUpdatedUser(userData, this.selectedFile).subscribe({
            next: (res: any) => {

              if (res.status === 202){
                this.authService.setUser(res)
              }
              this.swal.successNotification("User Update", "User updated successfully")
              this.applyForm.get('password')?.setValue('')
              this.applyForm.get('confirmPassword')?.setValue('')

            },
            error: (err: any) => {
              this.swal.failNotification("User Update", err.message)
            }
          }
        );
      }else {
        this.swal.failNotification("User Update", "Password and Confirm Password doesn't match")

      }
    } else {
      Object.values(this.applyForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }


  }



}
