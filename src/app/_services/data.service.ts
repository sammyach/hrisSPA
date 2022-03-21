import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppraisalDetailsModel, NewAppraisalModel, PersonalDataModel } from '../_models/assessment';
import { DepartmentLOVModel } from '../_models/lovs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // createNewAssessment(data: any){
  //   return this.http.post<NewAppraisalModel>(`${this.baseUrl}/assessment/new`, data);
  // }

  createNewGoals(data: any){
    return this.http.post<any>(`${this.baseUrl}/assessment/new/goals`, data);
  }

  getDepts(){
    return this.http.get<DepartmentLOVModel[]>(`${this.baseUrl}/mockup/department/LOV`);
  }

  getPersonalData(){
    return this.http.get<any>(`${this.baseUrl}/users/personalData`);
  }

  getAllAppraisalsCreatedByUser(){
    return this.http.get<NewAppraisalModel[]>( `${this.baseUrl}/assessment/user/allappraisals`);
  }

  getAllAppraisalsForManager(){
    return this.http.get<NewAppraisalModel[]>( `${this.baseUrl}/assessment/manager/allappraisals`);
  }

  getPendingAppraisalsForManagerCount(){
    return this.http.get<number>( `${this.baseUrl}/assessment/manager/appraisals/pending/count`);
  }

  getPendingAppraisalsForManager(){
    return this.http.get<NewAppraisalModel[]>( `${this.baseUrl}/assessment/manager/appraisals/pending`);
  }

  getAppraisalDetails(id: number){
    return this.http.get<AppraisalDetailsModel>(`${this.baseUrl}/assessment/details/${id}`);
  }

  getAppraiseeInfo(){
    return this.http.get<any>(`${this.baseUrl}/users/appraiseedata`);
  }

  deleteGoal(id: number){
    return this.http.delete<any>(`${this.baseUrl}/assessment/goals/delete/${id}`);
  }

  getUserProfile(){
    return this.http.get<any>(`${this.baseUrl}/users/personalData`);
  }

  appraiseGoal(data){
    return this.http.post<any>(`${this.baseUrl}/assessment/appraise/goal`, data);
  }

  appraiseFinal(data){
    return this.http.post<any>(`${this.baseUrl}/assessment/appraise/final`, data);
  }

  getSubordinates(){
    return this.http.get<any>(`${this.baseUrl}/users/manager/subordinates`);
  }
}
