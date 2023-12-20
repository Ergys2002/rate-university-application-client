import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {UserDetails} from "../../models/user.model";
import {CoursesService} from "../../services/courses.service";
import {Course} from "../../models/course.model";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit{

  loggedInUser!: UserDetails;

  coursesOfAuthenticatedUser: Course[] = [];

  activeTab: string = 'profile';

  constructor( private authService: AuthService, private coursesService:CoursesService) {
  }
  ngOnInit() {
    this.authService.loggedInUser().subscribe({
      next: result => {
        this.loggedInUser = result;
      }
    });

    this.coursesService.getAllCoursesOfAuthenticatedUser().subscribe({
      next : (data: Course[]) => {
        this.coursesOfAuthenticatedUser = data;
      }});

  }
  setActiveTab(tab: string) {
    this.activeTab = tab;
    console.log(this.activeTab)
  }

}
