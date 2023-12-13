import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {CoursesComponent} from "./courses/courses.component";
import {LecturerComponent} from "./lecturers/lecturer/lecturer.component";
import {MyProfileComponent} from "./my-profile/my-profile.component";
import {LecturersComponent} from "./lecturers/lecturers.component";


const routes: Routes = [
  {path: '', redirectTo: 'home-page', pathMatch: 'full'},
  {path: 'home-page', component:HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'courses', component: CoursesComponent},
  {path: 'lecturer', component: LecturerComponent},
  {path: 'lecturers', component: LecturersComponent},
  {path: 'my-profile', component: MyProfileComponent}
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
