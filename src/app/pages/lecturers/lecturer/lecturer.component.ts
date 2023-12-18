import { Component } from '@angular/core';
import {LecturerService} from "../../../services/lecturer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Course} from "../../../models/course.model";
import {Lecturer} from "../../../models/lecturer.model";

@Component({
  selector: 'app-lecturer',
  templateUrl: './lecturer.component.html',
  styleUrls: ['./lecturer.component.css']
})
export class LecturerComponent {

  singleLecturer!: Lecturer;

  coursesOfLecturer: Course[] = [];

  constructor( private lecturerService: LecturerService, private  router: ActivatedRoute) {
  }
  ngOnInit() {
    const id:string = this.router.snapshot.paramMap.get('id') || '';

    this.lecturerService.getLecturerById(id).subscribe({
      next: result => {
        this.singleLecturer = result;
        console.log(this.singleLecturer.firstName)
      }
    });

    this.lecturerService.getAllCoursesOfAlecturer(id).subscribe({
      next: (data: Course[]) => {
        this.coursesOfLecturer = data;
        console.log(this.coursesOfLecturer)
      }
    });
  }
}
