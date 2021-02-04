import { UploadedFileType, User, UserSkill } from 'redux/actions/user';

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
  ListRecruiterUser = 'User/ListRecruiterUser',
  ListCompanyUser = 'User/ListCompany',
  ActivePath = 'User/ActivePath',
  UpdateUser = 'User/UpdateUser',
  UserEducationLoading = 'User/UserEducationLoading',
  UserEmploymentLoading = 'User/UserEmploymentLoading',
  UserSkillLoading = 'User/UserSkillLoading',
  SetProfileProcess = 'User/SetProfileProcess',
  UploadProfilePicture = 'User/UploadProfilePicture',
  UploadProfilePictureLoading = 'User/UploadProfilePictureLoading',
  AddAffiliate = 'User/AddAffiliate',
  AddAffiliateLoading = 'User/AddAffiliateLoading',
  Recommendation = 'User/Recommendation',
  RecommendationLoading = 'User/RecommendationLoading',
  SpecificUserLoading = 'User/SpecificUserLoading'
}

export enum VerificationStatus {
  Verified = 'verified',
  Unverified = 'unverified',
  InProgress = 'inProgress'
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

export enum TalentProcess {
  // CurrentRole = 'currentRole',
  SkillRanking = 'skillRanking',
  RecentEmployer = 'recentEmployer',
  SingleEmployment = 'singleEmployment',
  ListEmployment = 'listEmployment',
  AddEducation = 'addEducation',
  SingleEducation = 'singleEducation',
  ListEducation = 'listEducation',
  Completed = 'completed'
}

export enum AdminsProcess {
  AddCompany = 'AddCompany',
  AddSchool = 'AddSchool',
  AddPlan = 'AddPlan',
  Payment = 'Payment',
  Completed = 'Completed'
}

export enum AffiliateProcess {
  AddMoreInfo = 'AddMoreInfo',
  Completed = 'Completed'
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

interface ActivePath {
  type: typeof UserTypes.ActivePath;
  payload: {
    data: string;
  };
}

interface UpdateUser {
  type: typeof UserTypes.UpdateUser;
  payload: {
    data: User;
  };
}

interface ListTalentUser {
  type: typeof UserTypes.ListTalentUser;
  payload: {
    data: {
      totalDocs: number;
      data: User[];
      currentPage: number;
    };
  };
}

interface ListHrAdminUser {
  type: typeof UserTypes.ListHrAdminUser;
  payload: {
    data: {
      totalDocs: number;
      data: User[];
      currentPage: number;
    };
  };
}

interface ListRecruiterUser {
  type: typeof UserTypes.ListRecruiterUser;
  payload: {
    data: {
      totalDocs: number;
      data: User[];
      currentPage: number;
    };
  };
}

interface ListCompanyUser {
  type: typeof UserTypes.ListCompanyUser;
  payload: {
    data: {
      totalDocs: number;
      data: User[];
      currentPage: number;
    };
  };
}

interface ListAffiliateUser {
  type: typeof UserTypes.ListAffiliateUser;
  payload: {
    data: {
      totalDocs: number;
      data: User[];
      currentPage: number;
    };
  };
}

interface ListTrainingAffiliateUser {
  type: typeof UserTypes.ListTrainingUser;
  payload: {
    data: {
      totalDocs: number;
      data: User[];
      currentPage: number;
    };
  };
}

interface UserEducationLoading {
  type: typeof UserTypes.UserEducationLoading;
  payload: {
    loading: boolean;
  };
}

interface UserEmploymentLoading {
  type: typeof UserTypes.UserEmploymentLoading;
  payload: {
    loading: boolean;
  };
}

interface UserSkillLoading {
  type: typeof UserTypes.UserSkillLoading;
  payload: {
    loading: boolean;
  };
}

interface SetProfileProcess {
  type: typeof UserTypes.SetProfileProcess;
  payload: {
    data: string;
  };
}

interface UploadProfilePicture {
  type: typeof UserTypes.UploadProfilePicture;
  payload: {
    data: UploadedFileType[];
  };
}

interface UploadProfilePictureLoading {
  type: typeof UserTypes.UploadProfilePictureLoading;
  payload: {
    loading: boolean;
  };
}
interface AddAffiliate {
  type: typeof UserTypes.AddAffiliate;
  payload: {
    data: boolean;
  };
}

interface AddAffiliateLoading {
  type: typeof UserTypes.AddAffiliateLoading;
  payload: {
    loading: boolean;
  };
}

interface Recommendation {
  type: typeof UserTypes.Recommendation;
  payload: {
    data: User[];
  };
}

interface RecommendationLoading {
  type: typeof UserTypes.RecommendationLoading;
  payload: {
    loading: boolean;
  };
}

interface SpecificUserLoading {
  type: typeof UserTypes.SpecificUserLoading;
  payload: {
    loading: boolean;
  };
}

export type UserTypeActions =
  | CurrentUser
  | Errors
  | ListSpecificUser
  | Loading
  | ListUserSkill
  | ListUserByRole
  | ActivePath
  | UpdateUser
  | ListTalentUser
  | ListAffiliateUser
  | ListTrainingAffiliateUser
  | ListRecruiterUser
  | ListCompanyUser
  | ListHrAdminUser
  | UserEducationLoading
  | UserEmploymentLoading
  | UserSkillLoading
  | SetProfileProcess
  | UploadProfilePicture
  | UploadProfilePictureLoading
  | AddAffiliate
  | AddAffiliateLoading
  | Recommendation
  | RecommendationLoading
  | SpecificUserLoading;
