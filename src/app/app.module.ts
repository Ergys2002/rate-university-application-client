import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LecturersComponent } from './lecturers/lecturers.component';
import { CoursesComponent } from './courses/courses.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { CourseComponent } from './courses/course/course.component';
import { LecturerComponent } from './lecturers/lecturer/lecturer.component';
import { AppRoutingModule } from './app-routing.module';
import { MyProfileComponent } from './my-profile/my-profile.component';
import {RouterOutlet} from "@angular/router";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    LecturersComponent,
    CoursesComponent,
    HeaderComponent,
    FooterComponent,
    CourseComponent,
    LecturerComponent,
    MyProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
