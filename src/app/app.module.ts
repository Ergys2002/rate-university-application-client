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
import {RouterLink, RouterOutlet} from "@angular/router";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HomePageService} from "./services/home-page.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthInterceptor} from "./interceptors/auth.interceptor";

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
    MyProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
    NgbModule,
    RouterLink,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,



  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
