import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Lecturer} from "../../models/lecturer.model";
import {HomePageService} from "../../services/home-page.service";
import {LecturerService} from "../../services/lecturer.service";
import {environment} from "../../environments/environment";
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-lecturers',
  templateUrl: './lecturers.component.html',
  styleUrls: ['./lecturers.component.css']
})
export class LecturersComponent implements OnInit{

  n: number = 3;
  t : number = 1;

  numberOfLecturers?: number;
  numberOfCourses?: number;
  numberOfStudents?: number;
  lecturers: Lecturer[] = [];
  constructor(private homeService: HomePageService, private lecturerService: LecturerService) {
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
