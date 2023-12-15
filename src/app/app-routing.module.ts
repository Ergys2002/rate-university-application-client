import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./pages/home/home.component";
import {CoursesComponent} from "./pages/courses/courses.component";
import {LecturerComponent} from "./pages/lecturers/lecturer/lecturer.component";
import {LecturersComponent} from "./pages/lecturers/lecturers.component";
import {CourseComponent} from "./pages/courses/course/course.component";
import {LoginComponent} from "./pages/login/login.component";
import {SignUpComponent} from "./pages/sign-up/sign-up.component";
import {MyProfileComponent} from "./pages/my-profile/my-profile.component";


const routes: Routes = [
  {path: '', redirectTo: 'home-page', pathMatch: 'full'},
  {path: 'home-page', component:HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'courses', component: CoursesComponent},
  {path: 'lecturer/:id', component: LecturerComponent},
  {path: 'lecturers', component: LecturersComponent},
  {path: 'my-profile', component: MyProfileComponent},
  {path: 'course/:id', component: CourseComponent}
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
