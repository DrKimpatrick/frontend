export enum SkillTypes {
  SkillLoading = 'Skill/Loading',
  SkillSuccess = 'Skill/SkillSuccess',
  SkillFail = 'Skill/SkillFail',
  GetSkillsLoading = 'Skill/Loading',
  GetSkillsSuccess = 'Skill/GetSkillsSuccess',
  GetSkillsFail = 'Skill/GetSkillsFail',
  ListUserSkill = 'Skill/ListUserSkill',
  Errors = 'Skill/Errors',
  Loading = 'Skill/LoadingSkill'
}

export enum VerificationStatus {
  Unverified = 'unverified',
  InProgress = 'inProgress',
  Verified = 'verified'
}

export interface Skill {
  _id: string;
  skill: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserSkill {
  _id: string;
  skill: Skill;
  createdAt?: string;
  updatedAt: string;
  level: string;
  verificationStatus: VerificationStatus;
}
export interface AddedSkill {
  _id: string;
  skill: string;
  user: string;
  level: string;
  verficationLevel: VerificationStatus;
}

export interface AddSkill {
  skill: string;
  level: string;
  verificationStatus: VerificationStatus;
}

export enum SkillLevel {
  Beginner = 'beginner',
  Advanced = 'advanced',
  Intermediate = 'intermediate'
}

export interface AddSkillLoading {
  type: SkillTypes.SkillLoading;
}

export interface AddSkillFail {
  type: SkillTypes.SkillFail;
  payload: string;
}

export interface AddSkillSuccess {
  type: SkillTypes.SkillSuccess;
  payload: AddedSkill;
}

export interface GetSkillsLoading {
  type: SkillTypes.GetSkillsLoading;
}

export interface GetSkillsFail {
  type: SkillTypes.GetSkillsFail;
  payload: string;
}

export interface GetSkillsSuccess {
  type: SkillTypes.GetSkillsSuccess;
  payload: Skill;
}

interface ListUserSkill {
  type: typeof SkillTypes.ListUserSkill;
  payload: {
    data: UserSkill[];
  };
}
interface Errors {
  type: typeof SkillTypes.Errors;
  payload: {
    errors: any;
  };
}

interface Loading {
  type: typeof SkillTypes.Loading;
  payload: {
    loading: boolean;
  };
}
export type SkillActionTypes =
  | AddSkillLoading
  | AddSkillSuccess
  | AddSkillFail
  | GetSkillsFail
  | GetSkillsSuccess
  | GetSkillsLoading
  | ListUserSkill
  | Errors
  | Loading;
