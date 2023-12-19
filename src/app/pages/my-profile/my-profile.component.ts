import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {UserDetails} from "../../models/user.model";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit{

  loggedInUser!: UserDetails;

  constructor( private authService: AuthService) {
  }
  ngOnInit() {
    this.authService.loggedInUser().subscribe({
      next: result => {
        this.loggedInUser = result;
      }
    });
    console.log('prove')
    console.log(this.loggedInUser)
  }
}
