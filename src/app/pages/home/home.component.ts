import {Component, OnInit} from '@angular/core';
import {HomePageService} from "../../services/home-page.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
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
