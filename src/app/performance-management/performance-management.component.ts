import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NewAppraisalModel } from '../_models/assessment';
import { User } from '../_models/user';
import { AuthService } from '../_services/auth.service';
import { DataService } from '../_services/data.service';

export interface Assessment {
  assessmentDate: Date;
  staffId: number;
  status: string;
}

@Component({
  selector: 'app-performance-management',
  templateUrl: './performance-management.component.html',
  styleUrls: ['./performance-management.component.css']
})
export class PerformanceManagementComponent implements OnInit {

  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  displayedColumns: string[] = ['creatorFullname', 'dateCreated', 'status', 'finalScore', 'action'];
  dataSource;

  currentUser: User;

  constructor(private dataService: DataService, private router: Router, public authService: AuthService) {
    this.authService.currentUser.subscribe(x => {this.currentUser = x; console.log('currentuzer', this.currentUser);});
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.getAppraisals();
  }

  getAppraisals(){
    if (this.currentUser){// && this.currentUser.role === 'USER'){
      this.dataService.getAllAppraisalsCreatedByUser()
      .subscribe(res => {
        console.log('res', res);

        this.dataSource = new MatTableDataSource<NewAppraisalModel>(res);
      },
      err => {

      });
    }

    else if (this.currentUser && this.currentUser.role === 'MANAGER'){
      console.log('is manager');

      this.dataService.getAllAppraisalsForManager()
      .subscribe(res => {
        console.log('res', res);

        this.dataSource = new MatTableDataSource<NewAppraisalModel>(res);
      },
      err => {

      });
    }

  }

  navToView(data: NewAppraisalModel){
    console.log('viewing..', data);
    console.log('viewing..', data.AppraisalId);

    this.router.navigate(['/appraisal-details', data.AppraisalId]);
  }

}
