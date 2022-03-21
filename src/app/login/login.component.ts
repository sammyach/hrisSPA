import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder, private alertify: AlertifyService) {
    // if user is already logged in go to home
    if (this.authService.loggedIn()){
      this.router.navigate(['']);
    }
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(){
    console.log('loggin in');

    const username: string = this.loginForm.get('username').value;
    const password: string = this.loginForm.get('password').value;
    this.authService.login(username, password)
      .subscribe((res: any) => {
        console.log('login', res);
        this.router.navigate(['']);
        // hack: as hamburger(anchor tags) not responsive just after login
        window.location.reload();
      },
      error => {
        console.log('error logging in', error);
        this.alertify.error(error);
      });
  }

}
