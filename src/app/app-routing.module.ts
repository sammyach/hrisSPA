import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AppraisalDetailsComponent } from './performance-management/appraisal-details/appraisal-details.component';
import { NewAssessmentComponent } from './performance-management/new-assessment/new-assessment.component';
import { PerformanceManagementComponent } from './performance-management/performance-management.component';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'performance-management', component: PerformanceManagementComponent, canActivate: [AuthGuard]},
  {path: 'appraisals', component: NewAssessmentComponent, canActivate: [AuthGuard]},
  {path: 'appraisal-details/:id', component: AppraisalDetailsComponent, canActivate: [AuthGuard]},

  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
