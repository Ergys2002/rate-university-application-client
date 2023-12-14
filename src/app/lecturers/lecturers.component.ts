import { Component } from '@angular/core';
import {HomePageService} from "../services/home-page.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-lecturers',
  templateUrl: './lecturers.component.html',
  styleUrls: ['./lecturers.component.css']
})
export class LecturersComponent {
  numberOfLecturers?: number;
  numberOfCourses?: number;
  numberOfStudents?: number;

  constructor(private homeService: HomePageService, private router: Router) {
  }

  ngOnInit(): void {
    this.homeService.getNumberOfInstructors().subscribe({
      next: result => {
        this.numberOfLecturers = result
      }
    })
    this.homeService.getNumberOfCourses().subscribe({
      next: result => {
        this.numberOfCourses = result
      }
    })
    this.homeService.getNumberOfStudents().subscribe({
      next: result => {
        this.numberOfStudents = result
      }
    })
  }
}
