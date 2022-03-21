import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-general-goals-dialog',
  templateUrl: './general-goals-dialog.component.html',
  styleUrls: ['./general-goals-dialog.component.css']
})
export class GeneralGoalsDialogComponent implements OnInit {

  form: FormGroup;
  title;
  body;
  currentUser: User;
  formReadOnly = true;
  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<GeneralGoalsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.authService.currentUser.subscribe(x => this.currentUser = x);
      this.createForm();
      console.log('dialog data', data);
      this.title = data.title;
      if(!data.appStatus || data.appStatus === 'NEW' || this.currentUser.role === 'MANAGER'){
        this.formReadOnly = false;
      }
      if (data.body){
        // populate form
        this.populateForm(data.body);
      }else{
        this.form.get('type').setValue(this.title);
      }

    }

  ngOnInit(): void {


  }

  populateForm(data){
    this.form.get('goal').setValue(data.goal);
    this.form.get('measures').setValue(data.measures);
    this.form.get('comments').setValue(data.comments);
    this.form.get('rating').setValue(data.rating);
    this.form.get('score').setValue(data.score);
    this.form.get('activity').setValue(data.activity);
    this.form.get('appraiserRating').setValue(data.appraiserRating);
    this.form.get('appraiserComments').setValue(data.appraiserComments);
    this.form.get('goalId').setValue(data.goalId);
    this.form.get('appraisalId').setValue(data.appraisalId);
    this.form.get('type').setValue(data.type);
  }

  createForm(): void{
    this.form = this.fb.group({
      goal: ['', [Validators.required]],
      measures: ['', [Validators.required]],
      comments: ['', [Validators.required]],
      score: ['', [Validators.required]],
      activity: ['', [Validators.required]],
      rating: [],
      appraiserRating: [],
      appraiserComments: [''],
      goalId: [0],
      appraisalId: [0],
      type: ['']
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close(this.form.value);
  }


}
