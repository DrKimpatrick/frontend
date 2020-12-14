export enum SkillTypes {
  SkillLoading = 'SkillLoading/Loading',
  SkillSuccess = 'Skill/SkillSuccess',
  SkillFail = 'Skill/SkillFail',
  GetSkillsLoading = 'Skill/Loading',
  GetSkillsSuccess = 'Skill/GetSkillsSuccess',
  GetSkillsFail = 'Skill/GetSkillsFail',
  ListUserSkill = 'Skill/ListUserSkill',
  Errors = 'Skill/Errors',
  Loading = 'Skill/LoadingSkill',
  ChangeSkillStatus = 'Skill/ChangeSkillStatus',
  AddSkill = 'Skill/AddSkill',
  ListSingleSkill = 'Skill/ListSingleSkill',
  ListSkill = 'Skill/ListSkill',
  UpdateSkill = 'Skill/UpdateSkill',
  DeleteSkill = 'Skill/DeleteSkill',
  SetActionModal = 'Skill/SetActionModal',
  AddUserSkill = 'Skill/AddUserSkill',
  LoadingBtn = 'Skill/LoadingBtn'
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

interface ChangeSkillStatus {
  type: typeof SkillTypes.ChangeSkillStatus;
  payload: {
    data: UserSkill;
  };
}

interface AddSkillAsAdmin {
  type: typeof SkillTypes.AddSkill;
  payload: {
    data: Skill[];
  };
}

interface DeleteSkill {
  type: typeof SkillTypes.DeleteSkill;
  payload: {
    data: string;
  };
}

interface UpdateSkill {
  type: typeof SkillTypes.UpdateSkill;
  payload: {
    data: Skill;
  };
}

interface ListSkill {
  type: typeof SkillTypes.ListSkill;
  payload: {
    data: Skill[];
  };
}

interface ListSingleSkill {
  type: typeof SkillTypes.ListSingleSkill;
  payload: {
    data: Skill;
  };
}

interface SetActionModal {
  type: typeof SkillTypes.SetActionModal;
  payload: {
    data: boolean;
  };
}

interface AddUserSkill {
  type: typeof SkillTypes.AddUserSkill;
  payload: {
    data: boolean;
  };
}

interface LoadingBtn {
  type: typeof SkillTypes.LoadingBtn;
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
  | Loading
  | ChangeSkillStatus
  | AddSkillAsAdmin
  | ListSingleSkill
  | UpdateSkill
  | DeleteSkill
  | ListSkill
  | SetActionModal
  | AddUserSkill
  | LoadingBtn;
