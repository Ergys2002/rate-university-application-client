import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LecturersComponent } from './pages/lecturers/lecturers.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { CourseComponent } from './pages/courses/course/course.component';
import { LecturerComponent } from './pages/lecturers/lecturer/lecturer.component';
import { AppRoutingModule } from './app-routing.module';
import {RouterLink, RouterOutlet} from "@angular/router";
import {NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {NgxPaginationModule} from 'ngx-pagination';
import {LoginComponent} from "./pages/login/login.component";
import {SignUpComponent} from "./pages/sign-up/sign-up.component";
import {MyProfileComponent} from "./pages/my-profile/my-profile.component";
import {CommonModule, NgOptimizedImage, NgTemplateOutlet} from "@angular/common";
import { CalendarComponent } from './pages/course-schedule/calendar/calendar.component';
import {FullCalendarModule} from "@fullcalendar/angular";
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { SingleReviewComponent } from './pages/reviews/single-review/single-review.component';
import { ReviewFormComponent } from './pages/submitReviewForm/review-form/review-form.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { PopupComponent } from './shared/popup/popup.component';
import { SearchFormComponent } from './pages/submitReviewForm/search-form/search-form.component';


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
    CalendarComponent,
    ReviewsComponent,
    SingleReviewComponent,
    PopupComponent,
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
    NgxPaginationModule,
    ReviewFormComponent,
    CommonModule,
    NgbModalModule,
    FullCalendarModule,
    NgTemplateOutlet,
    MatSnackBarModule,
    NgOptimizedImage,
    SearchFormComponent
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
