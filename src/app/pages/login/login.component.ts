import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {error} from "@angular/compiler-cli/src/transformers/util";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  //todo fix ngOnInit
  ngOnInit() {
      this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe({
      next: result => {this.router.navigateByUrl("/home-page")},
      error : err => { this.snackBar.open("Invalid Email or Password", 'Close', {
        duration: 3000,
        horizontalPosition : 'end',
        verticalPosition : 'top',
        panelClass: ['bg-danger']
      });
      }
    })

  }



}
