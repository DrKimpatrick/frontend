import { Employment } from './employment';
import { Education } from './education';
import { Skill } from './skill';

export enum UserTypes {
  CurrentUser = 'User/CurrentUser',
  Errors = 'User/Errors',
  ListSpecificUser = 'User/ListSpecificUser',
  Loading = 'User/Loading',
  ListUserSkill = 'User/ListUserSkill',
  ListUserByRole = 'User/ListUserByRole',
  ListTalentUser = 'User/ListTalentUser',
  ListHumanResourceUser = 'User/ListHumanResourceUser',
  ListAffiliateUser = 'User/ListAffiliateUser',
  ListHrAdminUser = 'User/ListHrAdminUser',
  ListTrainingUser = 'User/ListTrainingUser',
  ListRecruiterUser = 'User/ListRecruiterUser'
}

export enum UserRole {
  Talent = 'talent',
  EducationUser = 'education',
  SuperAdmin = 'super_admin',
  RecruitmentAdmin = 'recruitment_admin',
  HrAdmin = 'hr_admin',
  CompanyAdmin = 'company_admin',
  TrainingAdmin = 'training_admin',
  TrainingAffiliate = 'training_affiliate'
}

export interface User {
  _id: string;
  username: string;
  email: string;
  roles: string[];
  updatedAt: string;
  dateRegistered: string;
  paymentStatus: string;
  featureChoice: string;
  verified: boolean;
  employmentHistory?: Employment[];
  educationHistory?: Education[];
}

export interface UserSkill {
  _id: string;
  verificationStatus: string;
  level: string;
  skill: Skill;
  createdAt?: string;
  updatedAt?: string;
}

interface CurrentUser {
  type: typeof UserTypes.CurrentUser;
  payload: {
    data: User;
  };
}

interface Errors {
  type: typeof UserTypes.Errors;
  payload: {
    errors: any;
  };
}

interface Loading {
  type: typeof UserTypes.Loading;
  payload: {
    loading: boolean;
  };
}
interface ListSpecificUser {
  type: typeof UserTypes.ListSpecificUser;
  payload: {
    data: User;
  };
}

interface ListUserSkill {
  type: typeof UserTypes.ListUserSkill;
  payload: {
    data: UserSkill[];
  };
}

interface ListUserByRole {
  type: typeof UserTypes.ListUserByRole;
  payload: {
    data: {
      totalDocs: number;
      data: User[];
      currentPage: number;
    };
  };
}
export type UserTypeActions =
  | CurrentUser
  | Errors
  | ListSpecificUser
  | Loading
  | ListUserSkill
  | ListUserByRole;
