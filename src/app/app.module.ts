import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTooltipModule } from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
// import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';
// import {MatTabsModule} from '@angular/material/tabs';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSliderModule} from '@angular/material/slider';
import {MatDialogModule} from '@angular/material/dialog';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
// import {MatDividerModule} from '@angular/material/divider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import '../../node_modules/jquery/dist/jquery.min.js';
import '../../node_modules/popper.js/dist/umd/popper.min.js';
import '../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../assets/js/easion.js';
import { PerformanceManagementComponent } from './performance-management/performance-management.component';
import { NewAssessmentComponent } from './performance-management/new-assessment/new-assessment.component';
import { GeneralGoalsDialogComponent } from './ui-components/general-goals-dialog/general-goals-dialog.component';
import { GeneralTableComponent } from './ui-components/general-table/general-table.component';
import { PersonalDetailsFormComponent } from './ui-forms/personal-details-form/personal-details-form.component';
import { DatePipe } from '@angular/common';
import { AppraisalDetailsComponent } from './performance-management/appraisal-details/appraisal-details.component';
import { AlertifyService } from './_services/alertify.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PerformanceManagementComponent,
    NewAssessmentComponent,
    GeneralGoalsDialogComponent,
    GeneralTableComponent,
    PersonalDetailsFormComponent,
    AppraisalDetailsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule,
      MatTableModule,
      MatStepperModule,
      MatSliderModule,
      MatDialogModule,
      MatSelectModule,
      MatIconModule,
      MatTooltipModule,
      MatRadioModule,
      NgHttpLoaderModule.forRoot(),
      NgbModule


// MatDividerModule,
      // MatTableModule,


      // MatCheckboxModule,
      // MatTabsModule,




  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'primary' },
    },
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    DatePipe,
    AlertifyService
  ],
  bootstrap: [AppComponent],
  entryComponents: [GeneralGoalsDialogComponent]
})
export class AppModule { }
