import {Component, OnInit} from '@angular/core';
import {HomeComponent} from "../../pages/home/home.component";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  loggedIn?: boolean ;

  protected readonly HomeComponent = HomeComponent;



  ngOnInit(): void {
    this.loggedIn = this.isTokenValid();
  }

  isTokenValid() : boolean{
    let localStorageSaved = JSON.parse(localStorage.getItem("user") || '{}');
    let validUntil = localStorageSaved["validUntil"];

    if (!localStorage.getItem("user")) {
      console.log("Token not saved");
      return false;
    }

    if (!validUntil) {
      console.log("Valid Until date not found");
      return false;
    }

    return this.checkDate(validUntil);
  }

  checkDate(expirationDate : string) : boolean {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    const expArray = expirationDate.split("-")

    return day <= Number(expArray[2]) && month === Number(expArray[1]) && year === Number(expArray[0]);

}



}
