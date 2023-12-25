import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from "sweetalert2";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {SweetAlertService} from "../../services/sweet-alert.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private swal: SweetAlertService
  ) {}

  ngOnInit() {
    this.createSignUpForm();
  }

  createSignUpForm() {
    this.signUpForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+(?:-[a-zA-Z]+)*$')]],
      lastname: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+(?:-[a-zA-Z]+)*$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]],
      birthDate: ['', Validators.required],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{10}$')
        ]
      ]
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      this.authService.signup(this.signUpForm.value).subscribe({
        next: (res: any) => {
          this.swal.successNotification("Sign Up", "Signed up succesfully")
          setTimeout(() => {
            this.router.navigateByUrl('/home-page');
          }, 1000);
        },
        error: err => {
          this.swal.failNotification("Sign Up", "User is already registered")
        }
        }
      );
    } else {
      Object.values(this.signUpForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }


}
