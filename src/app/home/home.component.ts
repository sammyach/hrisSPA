import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DepartmentLOVModel } from '../_models/lovs';
import { User } from '../_models/user';
import { AuthService } from '../_services/auth.service';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['Name', 'Position'];

  form: FormGroup;
  profileForm: FormGroup;
  title = 'home';
  profileData;
  depts: DepartmentLOVModel[];
  currentUser: User;
  subordinates = [];
  subordinatesCount = 0;
  pendingAppraisals = 0;
  userDept;
  constructor(private dataService: DataService, private fb: FormBuilder, private authService: AuthService) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
   }

  ngOnInit(): void {

    this.profileForm = this.fb.group({
      fullname: [],
      reviewYear: [],
      position: [],
      location: []
    })

    this.form = this.fb.group({
      // staffId : [],
      firstName: [],
      lastName: [],
      otherNames: [],
      gender: [],
      dateJoined: [],
      position: [],
      positionLevel: [],
      deptId : [],
      username: [],
      email: [],
      supervisor: [],
      location: [],
      dateCreated: [],
      createdBy: [],
      enabled: [],
      dept: []
    });
    this.getDepts();
    this.getUserProfile();

    if(this.currentUser.role === 'MANAGER'){
      // get subordinates
      this.getSubordinates();

      // get pending appraisals count
      this.getPendingAppraisalsCount();
    }
  }

  getPendingAppraisalsCount(){
    this.dataService.getPendingAppraisalsForManagerCount()
      .subscribe(res => {
        this.pendingAppraisals = res;
      }, err => {
        console.log('err getting pending appraisals count', err);
      })
  }

  getSubordinates(){
    this.dataService.getSubordinates()
      .subscribe(res => {
        this.subordinates = res;
        this.subordinatesCount = this.subordinates.length;
      }, err => {
        console.log('err getting subordinates', err);

      })
  }

  getDepts(){
    this.dataService.getDepts()
      .subscribe(res => {
        this.depts = res;
        console.log('deptz', res);
      },
      err => {
        console.log('error getting dept lovs');
      })
  }

  getUserDept(id): any{
    return this.depts.find(x => x.deptId === id).deptName;
  }

  getUserProfile(){
    this.dataService.getUserProfile()
      .subscribe(res => {
        console.log('xxx', res);
        //this.profileForm.setValue(res);
        this.profileData = res;
        this.userDept = this.getUserDept(res.deptId);
      }, err => {
        console.log('error getting profile', err);

      })
  }

}
