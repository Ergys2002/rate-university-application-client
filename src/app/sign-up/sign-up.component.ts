import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {AuthInterceptor} from "../interceptors/auth.interceptor";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{
  signUpForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.signUpForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      birthDate: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    })
  }

  onSubmit() {
    this.authService.signup(this.signUpForm.value).subscribe(
      (res: any) => {
        this.router.navigateByUrl('/home-page');
      });

  }

}
