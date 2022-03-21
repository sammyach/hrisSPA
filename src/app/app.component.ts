import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'hrSPA';

 loggedIn;
 currentToken;
 currentUser: User;

  constructor(private authService: AuthService){
    this.loggedIn = this.authService.loggedIn();
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    // window.location.reload();

  }

  isLoggedIn(){
    //console.log('islogged in?', this.currentUser);
    if (this.currentUser && this.currentUser.token){
      return true;
    }
    return false;
    //return !this.currentToken;
    // return !this.loggedIn;
  }

  logout(){
    this.authService.logout();
  }
}
