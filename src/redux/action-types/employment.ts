import { User } from 'redux/action-types/user';

export enum EmploymentTypes {
  AddEmployment = 'Employment/AddEmployment',
  DeleteEmployment = 'Employment/DeleteEmployment',
  ListEmployments = 'Employment/ListEmployments',
  ListSpecificEmployment = 'Employment/ListSpecificEmployment',
  UpdateEmployment = 'Employment/UpdateEmployment',
  Errors = 'Employment/Errors',
  Loading = 'Employment/Loading',
  Success = 'Employment/Success',
  ChangeEmploymentStatus = 'Employment/ChangeEducationStatus',
  SubmitLoading = 'Employment/SubmitLoading'
}

export enum VerificationStatus {
  UNVERIFIED = 'unverified',
  IN_PROGRESS = 'inProgress',
  VERIFIED = 'verified'
}

export enum EmploymentType {
  Contract = 'Contract',
  FullTime = 'FullTime',
  PartTime = 'PartTime'
}

export enum EmploymentReference {
  CoWorker = 'Coworker',
  SuperVisor = 'Supervisor',
  HR = 'HR'
}

export enum Supervisor {
  Staffing = 'Staffing',
  HR = 'HR',
  Employee = 'Employee',
  NA = 'N/A'
}

export interface DetailType {
  name: string;
  email: string;
  phoneNumber: string;
}

export interface ReferenceType {
  name: string;
  detail: DetailType;
}

export interface SupervisorType {
  name: string;
  detail: DetailType;
}

export interface Employment {
  userId?: string;
  companyName: string;
  supervisor?: SupervisorType;
  title: string;
  startDate: string;
  endDate?: string;
  accomplishments?: string[];
  skillsUsed: any[];
  favoriteProject?: string;
  responsibilities?: string[];
  isCurrentPosition: boolean;
  createdAt: string;
  updatedAt: string;
  _id: string;
  verificationStatus: VerificationStatus;
  employmentType: string;
  reference?: ReferenceType;
}
interface AddEmployment {
  type: typeof EmploymentTypes.AddEmployment;
  payload: {
    data: Employment;
  };
}

interface ListEmployment {
  type: typeof EmploymentTypes.ListEmployments;
  payload: {
    data: Employment[];
  };
}

interface UpdateEmployment {
  type: typeof EmploymentTypes.UpdateEmployment;
  payload: {
    data: Employment;
  };
}

interface DeleteEmployment {
  type: typeof EmploymentTypes.DeleteEmployment;
  payload: {
    id: string;
  };
}

interface ListSpecificEmployment {
  type: typeof EmploymentTypes.ListSpecificEmployment;
  payload: {
    data: Employment;
  };
}
interface Success {
  type: typeof EmploymentTypes.Success;
  payload: {
    message: string;
  };
}

interface Loading {
  type: typeof EmploymentTypes.Loading;
  payload: {
    loading?: boolean;
  };
}

interface Errors {
  type: typeof EmploymentTypes.Errors;
  payload: {
    errors: any;
  };
}

export interface EmploymentParam {
  companyName: string;
  supervisor?: SupervisorType;
  title: string;
  startDate: string;
  endDate?: string;
  accomplishments?: string[];
  skillsUsed?: string[];
  favoriteProject?: string;
  responsibilities?: string[];
  isCurrentPosition: boolean;
  user?: User;
  profileProcess?: string;
  employmentType: string;
  reference?: ReferenceType;
}

interface ChangeEmploymentStatus {
  type: typeof EmploymentTypes.ChangeEmploymentStatus;
  payload: {
    data: Employment;
  };
}

interface SubmitLoading {
  type: typeof EmploymentTypes.SubmitLoading;
  payload: {
    loading: boolean;
  };
}

export type EmploymentActionTypes =
  | AddEmployment
  | UpdateEmployment
  | DeleteEmployment
  | ListEmployment
  | ListSpecificEmployment
  | Success
  | Loading
  | Errors
  | ChangeEmploymentStatus
  | SubmitLoading;
