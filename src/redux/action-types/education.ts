import { EducationTypes } from '../actions/education';

export enum VerificationStatus {
  Unverified = 'unverified',
  InProgress = 'inProgress',
  Verified = 'verified'
}
export interface Education {
  _id: string;
  schoolName: string;
  level: string;
  degreeOrCertification: string;
  specializations: string[];
  startDate: string;
  endDate: string;
  accomplishments: string[];
  isCurrentEducation: boolean;
  verificationStatus?: VerificationStatus;
  createdAt?: string;
  updatedAt?: string;
}

interface AddEducation {
  type: typeof EducationTypes.AddEducation;
  payload: {
    data: Education;
  };
}

interface DeleteEducation {
  type: typeof EducationTypes.DeleteEducation;
  payload: {
    id: string;
  };
}

interface UpdateEducation {
  type: typeof EducationTypes.UpdateEducation;
  payload: {
    data: Education;
  };
}

interface ListEducation {
  type: typeof EducationTypes.ListEducation;
  payload: {
    data: Education[];
  };
}

interface ListSpecificEducation {
  type: typeof EducationTypes.ListSpecificEducation;
  payload: {
    data: Education;
  };
}

interface Errors {
  type: typeof EducationTypes.Errors;
  payload: {
    errors: any;
  };
}

interface Loading {
  type: typeof EducationTypes.Loading;
  payload: {
    loading?: boolean;
  };
}

export type EducationActionTypes =
  | AddEducation
  | DeleteEducation
  | UpdateEducation
  | ListEducation
  | ListSpecificEducation
  | Errors
  | Loading;
