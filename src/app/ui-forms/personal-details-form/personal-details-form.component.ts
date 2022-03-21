import { DatePipe } from '@angular/common';
import { Component, OnInit, Input, AfterViewInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NewAppraisalModel, PersonalDataModel } from 'src/app/_models/assessment';
import { DepartmentLOVModel } from 'src/app/_models/lovs';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-personal-details-form',
  templateUrl: './personal-details-form.component.html',
  styleUrls: ['./personal-details-form.component.css']
})
export class PersonalDetailsFormComponent implements OnInit, AfterViewInit, OnChanges  {

  @Input() pData: NewAppraisalModel;

  form: FormGroup;
  depts: DepartmentLOVModel[];

  constructor(private fb: FormBuilder, private dataService: DataService, private datePipe: DatePipe) {
    this.createForm();
   }

  ngOnInit(): void {


    //this.setPersonalData(this.pData);
    this.getDepts();
  }

  ngOnChanges(){
    console.log('on changes ', this.pData);

    this.setPersonalData(this.pData);
  }

  ngAfterViewInit(): void {
    // console.log('log per data in pers det222', this.personalData);

  }

  createForm(): void{
    this.form = this.fb.group({
      fullname: [''],
      deptId: [''],
      position: [''],
      reviewYear: [''],
      employedDate: [''],
      assessmentDate: [''],
      location: [''],
      supervisor: ['']
    });
  }

  getDepts(){
    this.dataService.getDepts()
      .subscribe(res => {
        this.depts = res;
      },
      err => {
        console.log('error getting dept lovs');
      })
  }

  setPersonalData(data){
    this.form.get('fullname').setValue(data.creatorFullname);
    this.form.get('deptId').setValue(data.creatorDeptId);
    this.form.get('position').setValue(data.creatorJobTitle);
    this.form.get('reviewYear').setValue(data.reviewYear);
    this.form.get('location').setValue(data.location);
    this.form.get('supervisor').setValue(data.appraisedBy);
    this.form.get('assessmentDate').setValue(this.datePipe.transform(data.dateCreated), 'yyyy/MM/dd');
    this.form.get('employedDate').setValue(this.datePipe.transform(data.creatorDateEmployed), 'yyyy/MM/dd');

    //  this.dataService.getPersonalData()
    //   .subscribe(res => {
    //     this.form.get('fullname').setValue(res.fullname);
    //     this.form.get('deptId').setValue(res.deptId);
    //     this.form.get('position').setValue(res.position);
    //     this.form.get('reviewYear').setValue(res.reviewYear);
    //     this.form.get('location').setValue(res.location);
    //     this.form.get('supervisor').setValue(res.supervisor);
    //     this.form.get('assessmentDate').setValue(this.datePipe.transform(res.assessmentDate), 'yyyy/MM/dd');
    //     this.form.get('employedDate').setValue(this.datePipe.transform(res.employedDate), 'yyyy/MM/dd');
    //   },
    //   err => {
    //     console.log('error getting personal data');
    //   })
  }

}
