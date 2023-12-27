import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {SearchFormService} from "../../../services/search-form.service";
import {NgxPaginationModule} from "ngx-pagination";
import {RouterLink} from "@angular/router";

@Component({
  standalone: true,
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgxPaginationModule, RouterLink]
})
export class SearchFormComponent {

  searchedCourses : any;
  formSubmitted = false;
  x : number = 0;
  applyForm = new FormGroup({
    courseName: new FormControl('')
  })

  constructor(private searchFormService :SearchFormService) {
  }

    submitApplication() {
        this.searchFormService.submitApplication(
            this.applyForm.value.courseName ?? ' '
        );
      setTimeout(() => {
        // Reload the window
        this.searchedCourses = this.searchFormService.searchedCourses;
        this.formSubmitted = true;
      }, 1000);
    }
}
