import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Lecturer} from "../../models/lecturer.model";
import {HomePageService} from "../../services/home-page.service";
import {LecturerService} from "../../services/lecturer.service";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-lecturers',
  templateUrl: './lecturers.component.html',
  styleUrls: ['./lecturers.component.css']
})
export class LecturersComponent {
  numberOfLecturers?: number;
  numberOfCourses?: number;
  numberOfStudents?: number;
  lecturers: Lecturer[] = [];
  p : number = 1;


  constructor(private homeService: HomePageService, private lecturerService: LecturerService, private router: Router) {
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

    this.lecturerService.getAllLecturers().subscribe({
      next: data => {
        this.lecturers = data;
        console.log(data)
      }
    });


  }

  protected readonly environment = environment;
}
