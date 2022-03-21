export class NewAppraisalModel{
  AppraisalId: number;
  ReviewYear: string;
  DateCreated?: Date;
  CreatedBy: string;
  DateAppraised?: Date;
  AppraisedBy: string;
  AppraisalRemarks: string;
  AppraisalRating?: number;
  Status: string;
  CreatorJobTitle: string;
  CreatorDeptId?: number;
  CreatorFullname: string;
  CreatorDateEmployed?: Date;
  CalculatedScore?: string;
  Location?: string;
}

export class AppraisalDetailsModel{
  AppraisalId: number;
  ReviewYear: string;
  DateCreated?: Date;
  CreatedBy: string;
  DateAppraised?: Date;
  AppraisedBy: string;
  AppraisalRemarks: string;
  AppraisalRating?: number;
  Status: string;
  CreatorJobTitle: string;
  CreatorDeptId?: number;
  Goals: GoalDetailsModel[];
}

export class GoalDetailsModel{
  GoalId: number;
  type: string;
  Goal: string;
  Activity: string;
  Measures: string;
  Comments: string;
  Score?: number;
  Rating?: number;
  AppraisalId: number;
  AppraiserRating?: number;
  AppraiserComments: string;
}
// export class NewAppraisalModel{
//   AppraisalId: number;
//   ReviewYear: string;
//   Type: string;
//   Goal: string;
//   Activity: string;
//   Comments: string;
//   Score?: number;
//   Rating?: number;
//   DateCreated?: Date;
//   CreatedBy: string;
//   DateAppraised?: Date;
//   AppraisedBy: string;
//   AppraisalRemarks: string;
//   AppraisalRating?: number;
//   Status: string;
// }

export class NewGoalModel{
  Type: string;
  Goal: string;
  Activity: string;
  Comments: string;
  Score?: number;
  Rating?: number;
  AppraisalId: number;
}

export class NewAssessmentModel {
  performance: PerformanceObjModel[];
  personal: PersonalDevObjModel[];
  career: CareerDevModel[];
  lifeBalance: LifeBalanceModel[];
  overall: OverallModel;
}

export class OverallModel{
  comments: string;
  finalRating: number;
}

export class NewAssessmentModel2 {
  goals: NewGoalModel[];
}

// export class NewGoalModel{
//   type: string;
//   goal: string;
//   measures: string;
//   activity: string;
//   comment: string;
//   score?: number;
//   rating?: number;
// }

export class PerformanceObjModel {
  goal: string;
  measures: string;
  activity: string;
  comment: string;
  score: number;
  rating: number;
}

export class PersonalDevObjModel {
  goal: string;
  managerSupport: string;
  activity: string;
  comment: string;
  score: number;
  rating: number;
}

export class CareerDevModel {
  goal: string;
  activity: string;
  comment: string;
  score: number;
  rating: number;
}

export class LifeBalanceModel {
  goal: string;
  activity: string;
  comment: string;
  score: number;
  rating: number;
}

export class PersonalDataModel{
  fullname: string;
  deptId: number;
  position: string;
  reviewYear: string;
  employedDate: Date;
  assessmentDate: Date;
  location: string;
  supervisor: string;
}
