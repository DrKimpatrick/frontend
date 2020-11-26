import { VerificationStatus } from './education';

export enum addSkillTypes {
  SkillLoading = 'Skill/Loading',
  SkillSuccess = 'Skill/Success',
  SkillFail = 'Skill/Fail',
  GetSkillsLoading = 'SkillsGet/Loading',
  GetSkillsSuccess = 'SkillsGet/Success',
  GetSkillsFail = 'SkillsFail/Fail',
}

export interface Skill {
  _id: string;
  skill: string;
  createdAt?: string;
  updatedAt?: string;
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
  type: addSkillTypes.SkillLoading;
}

export interface AddSkillFail {
  type: addSkillTypes.SkillFail;
  payload: string;
}

export interface AddSkillSuccess {
  type: addSkillTypes.SkillSuccess;
  payload: AddedSkill;
}

export interface GetSkillsLoading {
  type: addSkillTypes.GetSkillsLoading
}

export interface GetSkillsFail {
  type: addSkillTypes.GetSkillsFail,
  payload: string
}

export interface GetSkillsSuccess {
  type: addSkillTypes.GetSkillsSuccess,
  payload: Skill
}
export type AddSkillUserTypes =
  | AddSkillLoading
  | AddSkillSuccess
  | AddSkillFail
  | GetSkillsFail
  | GetSkillsSuccess
  | GetSkillsLoading;
