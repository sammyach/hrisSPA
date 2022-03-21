import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralGoalsDialogComponent } from 'src/app/ui-components/general-goals-dialog/general-goals-dialog.component';
import { GoalDetailsModel, NewAppraisalModel, NewAssessmentModel, NewAssessmentModel2, NewGoalModel, OverallModel, PersonalDevObjModel } from 'src/app/_models/assessment';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-new-assessment',
  templateUrl: './new-assessment.component.html',
  styleUrls: ['./new-assessment.component.css']
})
export class NewAssessmentComponent implements OnInit {

  @ViewChild('table', {static: true}) table: MatTable<any>;
  @ViewChild('table2', {static: true}) table2: MatTable<any>;
  @ViewChild('table3', {static: true}) table3: MatTable<any>;
  @ViewChild('table4', {static: true}) table4: MatTable<any>;

  appraisalData: NewAppraisalModel = new NewAppraisalModel();

  isLinear = false;
  form1Group: FormGroup;
  form2Group: FormGroup;
  form3Group: FormGroup;
  form4Group: FormGroup;
  form5Group: FormGroup;

  displayedColumns: string[] = ['goal', 'measures', 'comments', 'score', 'appraiser_rating', 'action'];
  displayedColumns2: string[] = ['goal', 'activity', 'comments', 'score', 'appraiser_rating', 'action'];
  displayedColumns3: string[] = ['goal', 'activity', 'comments', 'score'];
  dataSource;
  dataSourcePersonal;
  dataSourceCareer;
  dataSourceLife;

  showEditBtn = true;
  showSaveBtn = true;
  showDeleteBtn = false;
  isAppraisalNew = true;
  isAppraisalCompleted = false;

  showTable = false;

  appraisalDocId = 0;
  disablePersonalSave = true;
  disablePerformanceSave = true;
  disableCareerSave = true;
  disableLifeSave = true;

  showGoalBtns = true;

  loading = false;
  showPerformanceRating = false;

  currentAppraisalGoals;
  yetTobeSavedGoals: any[];
  currentUser: User;

  constructor(private fb: FormBuilder, private dialog: MatDialog, private dataService: DataService,
              private route: ActivatedRoute, public authService: AuthService,
              private router: Router, private alertify: AlertifyService) {
                this.form1Group = this.fb.group({
                  goal: ['', [Validators.required]],
                  measure: ['', [Validators.required]],
                  comment: ['', [Validators.required]],
                  score: ['', [Validators.required]],
                  rating: ['']
                });
                this.form2Group = this.fb.group({
                  goal: [''],
                  activity: [''],
                  comment: [''],
                  score: [''],
                  rating: ['']
                });

                this.form3Group = this.fb.group({
                  goal: [''],
                  activity: [''],
                  comment: [''],
                  score: [''],
                  rating: ['']
                });

                this.form4Group = this.fb.group({
                  goal: [''],
                  activity: [''],
                  comment: [''],
                  score: [''],
                  rating: ['']
                });

                this.form5Group = this.fb.group({
                  goal: [''],
                  measures: [''],
                  comments: [''],
                  score: [],
                  activity: [''],
                  rating: [],
                  appraiserRating: [, [Validators.required]],
                  appraiserComments: ['', [Validators.required]],
                  goalId: [0],
                  appraisalId: [0],
                  type: ['Overall']
                });

                this.authService.currentUser.subscribe(x => this.currentUser = x);
              }

  ngOnInit() {

    if (this.authService.isUser){
      console.log('is a userx');

    }
    this.dataSource = new MatTableDataSource();
    this.dataSourcePersonal = new MatTableDataSource();
    this.dataSourceCareer = new MatTableDataSource();
    this.dataSourceLife = new MatTableDataSource();



    const id = this.route.snapshot.queryParamMap.get('id');
    console.log('logging app id', id);

    if (id) {
      this.appraisalDocId = +id;
      console.log('logging app id', this.appraisalDocId);
      this.getAppraisalDetails(this.appraisalDocId);
    }else{
      this.getAppraiseeInfo();
    }

    console.log('appData', this.appraisalData);


  }

  getAppraiseeInfo(){
    this.dataService.getAppraiseeInfo()
      .subscribe(res=>{
        this.appraisalData = res;
        console.log('appraisee', this.appraisalData);

      }, err =>{
        console.log('error getting appraisee info', err);

      })
  }

  togglePerformanceRating(){
    this.showPerformanceRating = !this.showPerformanceRating;
  }

  populateGoalTables(res){

    this.dataSource = new MatTableDataSource(res.performance);
    this.dataSourcePersonal = new MatTableDataSource(res.personal);
    this.dataSourceCareer = new MatTableDataSource(res.career);
    this.dataSourceLife = new MatTableDataSource(res.life);

    this.table.renderRows();
    this.table2.renderRows();
    this.table3.renderRows();
    this.table4.renderRows();

    console.log('dt', this.dataSource.data);

  }

  getAppraisalDetails(id: number){
    this.loading = true;
    let goals ; // : GoalDetailsModel[] = [];
    this.dataService.getAppraisalDetails(id)
      .subscribe((res: any) => {
        console.log('details', res);
        console.log('go', res.goal);
        goals = res.goal;
        console.log('goals', goals);
        this.currentAppraisalGoals = goals;
        console.log('currentAppraisalGoals', this.currentAppraisalGoals);
        this.appraisalData = res;
        console.log('apdata', this.appraisalData);

        if (res.status !== 'NEW'){
          this.showGoalBtns = false;
          this.isAppraisalNew = false;
        }

        if (res.status === 'COMPLETED'){
          this.isAppraisalCompleted = true;
        }

        if (this.currentUser.role === 'USER' && res.status === 'OPEN'){
          this.showEditBtn = false;
        }

        if (res.status === 'NEW'){
          this.showDeleteBtn = true;
        }

        this.populateGoalTables(res.goal);

        console.log('overall', goals.overall);

        if (goals.overall.length > 0){
          this.form5Group.setValue(goals.overall[0]);
          // this.form5Group.get('comment').setValue(goals.overall[0].comments);
          // this.form5Group.get('rating').setValue(goals.overall[0].rating);
        }

        // const group = goals.reduce((r, a) => {
        //   r[a.type] = [...r[a.type] || [], a];
        //   return r;
        //  }, {});

        // console.log('keys', Object.keys(group));
        // console.log('entries', Object.entries(group));

        // let i;
        // let j;
        // for (i = 0; i < Object.entries(group).length; i++) {
        //   console.log('in i loop', i);

        //   for (j = 0; j < 2; j++){
        //     console.log('in j loop', j);
        //     if (i[j] === 'Performance'){
        //       console.log('found performance', i[j + 1]);

        //     }
        //   }

        // }

        // console.log('perf', group.performance);




        // const grouped = this.groupBy(goals, goal => goal.Type);
        //console.log('grouped', group);

        // this.dataSource = new MatTableDataSource()
        this.loading = false;
      },
      err => {
        this.loading = false;
        console.log('failed to get appraisal details', err);

      })
  }

  updateScore(event: any){
    console.log('event => ', event.value);
    console.log('form => ', this.form1Group.get('score').value);

  }

  addPerformanceGoal(result: any){
    const goalc = result.goal;
    const measurec = result.measure;
    const commentc = result.comment;
    const scorec = result.score;

    console.log(goalc);
    const size = this.dataSource.data.length;
    this.dataSource.data.push({
      id: size + 1,
      goal: goalc,
      measures: measurec,
      comment: commentc,
      score: scorec
    });
    // this.showTable = true;
    this.table.renderRows();
    this.form1Group.reset();
  }

  addPersonalGoal(result: any){
    console.log('per res', result);

    const goalc = result.goal;
    const activityc = result.activity;
    const commentc = result.comment;
    const scorec = result.score;

    const size = this.dataSourcePersonal.data.length;
    console.log(size);

    this.dataSourcePersonal.data.push({
      id: size + 1,
      goal: goalc,
      activity: activityc,
      comment: commentc,
      score: scorec,
    });

    console.log(this.dataSourcePersonal.data);

    // this.showTable = true;
    this.table2.renderRows();
    this.form2Group.reset();
  }

  addCareerGoal(result: any){
    const goalc = result.goal;
    const measurec = result.measure;
    const activityc = result.activity;
    const commentc = result.comment;
    const scorec = result.score;

    console.log(goalc);
    const size = this.dataSourceCareer.data.length;
    this.dataSourceCareer.data.push({
      id: size + 1,
      goal: goalc,
      measures: measurec,
      activity: activityc,
      comment: commentc,
      score: scorec
    });
    // this.showTable = true;
    this.table3.renderRows();
    this.form3Group.reset();
  }

  addLifeBalanceGoal(result: any){
    const goalc = result.goal;
    const measurec = result.measure;
    const activityc = result.activity;
    const commentc = result.comment;
    const scorec = result.score;

    console.log(goalc);
    const size = this.dataSourceLife.data.length;
    this.dataSourceLife.data.push({
      id: size + 1,
      goal: goalc,
      activity: activityc,
      comment: commentc,
      score: scorec
    });
    // this.showTable = true;
    this.table4.renderRows();
    this.form4Group.reset();
  }

  openDialog(titleData: string, data?: any, isEdit?: boolean): void {
    console.log('data', data);
    console.log('id', data?.id);
    if (!data?.goalId && isEdit){
      this.alertify.warning('Please save your work and proceed with action');
      return;
    }
    let gData;
    let filteredGoal;
    if (data?.goalId){
      // lets get the goal and send to dialog
      if (titleData === 'Performance'){
          gData = this.currentAppraisalGoals.performance;
      }
      if (titleData === 'Personal Development'){
        gData = this.currentAppraisalGoals.personal;
      }
      if (titleData === 'Career Development'){
        gData = this.currentAppraisalGoals.career;
      }
      if (titleData === 'Life Balance'){
        gData = this.currentAppraisalGoals.life;
      }
      if (titleData === 'Overall'){
        gData = this.currentAppraisalGoals.overall;
      }

      console.log('gData', gData);

      filteredGoal = gData.filter(goal => goal.goalId === data?.goalId)[0];
    }
    // else if (this.yetTobeSavedGoals.length > 0){
    //   filteredGoal = this.yetTobeSavedGoals.filter(goal => goal.id === data?.goalId)[0];

    // }

    console.log('filtered goal', filteredGoal);

    const dialogRef = this.dialog.open(GeneralGoalsDialogComponent, {
      width: '550px',
      data: {title: titleData, body: filteredGoal, appStatus: this.appraisalData.Status},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result){
          this.addGoal(result, titleData, result.goalId > 0);

        // this.processDialogResult(result, data);
      }
    });
  }

  deleteGoal (data: any, title: string){
    if (title === 'Performance'){
      const index = this.dataSource.data.findIndex((item) => item === data);
      if (index > -1){
        this.dataSource.data.splice(index, 1);
      }
      this.table.renderRows();
      this.form1Group.reset();
    }

    if (title === 'Personal Development'){
      const index = this.dataSourcePersonal.data.findIndex((item) => item === data);
      if (index > -1){
        this.dataSourcePersonal.data.splice(index, 1);
      }
      this.table2.renderRows();
      this.form2Group.reset();
    }

    if (title === 'Career Development'){
      const index = this.dataSourceCareer.data.findIndex((item) => item === data);
      if (index > -1){
        this.dataSourceCareer.data.splice(index, 1);
      }
      this.table3.renderRows();
      this.form3Group.reset();
    }

    if (title === 'Life Balance'){
      const index = this.dataSourceLife.data.findIndex((item) => item === data);
      if (index > -1){
        this.dataSourceLife.data.splice(index, 1);
      }
      this.table4.renderRows();
      this.form4Group.reset();
    }

    if (data.goalId > 0){
      // make request to api to remove
      this.dataService.deleteGoal(data.goalId)
        .subscribe(res => {
          this.alertify.success('Goal removed successfully');
          console.log('removed successfully');

        }, err =>{
          console.log(err);

        })
    }
  }

  addGoal(result: any, title: string, isUpdate: boolean): void{
    const goalz = result.goal;
    const measurez = result.measure;
    const activityz = result.activity;
    const commentz = result.comment;
    const scorez = result.score;

    if (title === 'Performance'){
      const size = this.dataSource.data.length;
      if (isUpdate){
        const index = this.dataSource.data.findIndex((item) => item.goalId === result.goalId);
        if (index > -1){
          this.dataSource.data[index] = result;
        }

      }else{
        console.log('result =>', result);
        result.id = size + 1;
        this.dataSource.data.push(result);
        console.log('result2 =>', this.dataSource.data);
        // this.dataSource.data.push({
        //   id: size + 1,
        //   goal: goalz,
        //   measures: measurez,
        //   comments: commentz,
        //   score: scorez,
        //   type: title
        // });
      }

      this.table.renderRows();
      this.form1Group.reset();
      this.disablePerformanceSave = false;
    }else if (title === 'Personal Development'){
      const size = this.dataSourcePersonal.data.length;
      if (isUpdate){
        const index = this.dataSourcePersonal.data.findIndex((item) => item.goalId === result.goalId);
        if (index > -1){
          this.dataSourcePersonal.data[index] = result;
        }
      }else{
        this.dataSourcePersonal.data.push(result);
      }
      this.table2.renderRows();
      this.form2Group.reset();
      this.disablePersonalSave = false;
    }else if (title === 'Career Development'){
      const size = this.dataSourceCareer.data.length;
      if (isUpdate){
        const index = this.dataSourceCareer.data.findIndex((item) => item.goalId === result.goalId);
        if (index > -1){
          this.dataSourceCareer.data[index] = result;
        }
      }else{
        this.dataSourceCareer.data.push(result);
      }
      this.table3.renderRows();
      this.form3Group.reset();
      this.disableCareerSave = false;
    }else if (title === 'Life Balance'){
      const size = this.dataSourceLife.data.length;
      if (isUpdate){
        const index = this.dataSourceLife.data.findIndex((item) => item.goalId === result.goalId);
        if (index > -1){
          this.dataSourceLife.data[index] = result;
        }
      }else{
        this.dataSourceLife.data.push(result);
      }
      this.table4.renderRows();
      this.form4Group.reset();
      this.disableLifeSave = false;
    }

    // if (!isUpdate){
    //   // its new; yet to be save; put in yetTobeSavedGoals
    //   this.yetTobeSavedGoals.push(result);
    // }


  }

  toggleSaveButtons(stage: string): void{
    switch (stage) {
      case 'personal':
          this.disablePersonalSave = true;
          break;
      case 'performance':
          this.disablePerformanceSave = true;
          break;
      case 'career':
          this.disableCareerSave = true;
          break;
      case 'life':
          this.disableLifeSave = true;
          break;
      // default:
          // default block statement;
  }
  }

  submitForAppraisal(stage: string): void{
    this.toggleSaveButtons(stage);
    // isFirstTime if theres no appraisalId
    const isFirstTime = this.appraisalDocId > 0 ? false : true;
    const performance = this.dataSource.data;
    const personal = this.dataSourcePersonal.data;
    const career = this.dataSourceCareer.data;
    const lifeBalance = this.dataSourceLife.data;

    // const overallComment = this.form5Group.get('comment').value;
    // const ratingx = this.form5Group.get('rating').value;
    console.log('ova form', this.form5Group.value);
    const overall = this.form5Group.value;

    const arr = career.concat(personal, performance, lifeBalance);
    const newGoals: GoalDetailsModel[] = arr;
    console.log('ova all', overall);

    if((overall.score && overall.comments.trim() !== '') || (overall.appraiserRating > 0 && overall.appraiserComments.trim() !== '')){
      console.log('overall is available');

      newGoals.push(overall);

    }

    console.log('logging new goals', newGoals);
    console.log('over', overall);

    if (this.currentUser.role === 'USER'){
      const data: any = {};
      data.Goals = [];
      data.Goals = newGoals;
      data.IsForNewAppraisal = isFirstTime;
      data.AppraisalId = this.appraisalDocId;
      data.IsFinalStage = stage === 'final' ? true : false;
      console.log('logging new data to server', data);
      this.dataService.createNewGoals(data)
        .subscribe(res => {
          console.log(res);
          this.appraisalDocId = res;

          if (stage === 'final'){
            // nav to perf mgt
          this.router.navigate(['performance-management']);
          this.alertify.success('Submitted successfully');
          }else{
            this.alertify.success('Saved successfully');
            // let update the saved goals with the returned appraisalID
            this.updateGoalItemsWithID(this.appraisalDocId);
          }


        },
        err => {
          console.log('error creating new ass', err);
        });
    }

    if (this.currentUser.role === 'MANAGER'){
      // we are appraising
      if (stage === 'final'){
        // if any of the section is yet to be saved. save it
        if (!this.disableCareerSave || !this.disableLifeSave || !this.disablePerformanceSave || !this.disablePersonalSave){
          this.alertify.warning('Please make sure all your ratings in each section are saved before continuing.');
          return;
        }
        if (!this.form5Group.value.score){return; }
        this.dataService.appraiseFinal(newGoals)
          .subscribe(res => {
            this.router.navigate(['performance-management']);
            this.alertify.success('Appraised successfully');
          }, err => {

          });

      } else {
        this.dataService.appraiseGoal(newGoals)
        .subscribe(res => {
          console.log('res');
          this.alertify.success('Saved successfully');
        }, err => {
          console.log('err appraising', err);

        })
      }

    }


  }

  updateGoalItemsWithID(id: number){
    console.log('updating goal items');

    console.log('updating goal items');
    for (let i = 0; i < this.dataSource.data.length; i++){
      console.log('in perf loop', i);

      this.dataSource.data[i].appraisalId = id;
    }

    for (let i = 0; i < this.dataSourcePersonal.data.length; i++){
      console.log('in pers loop', i);
      this.dataSourcePersonal.data[i].appraisalId = id;
    }

    for (let i = 0; i < this.dataSourceCareer.data.length; i++){
      console.log('in car loop', i);
      this.dataSourceCareer.data[i].appraisalId = id;
    }
    for (let i = 0; i < this.dataSourceLife.data.length; i++){
      console.log('in life loop', i);
      this.dataSourceLife.data[i].appraisalId = id;
    }

    this.table.renderRows();
    this.table2.renderRows();
    this.table3.renderRows();
    this.table4.renderRows();
  }

  groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
}

}
