import { object, string, array } from 'yup';
import { DetailType, SupervisorType } from 'redux/action-types/employment';

export const employmentSchema = object().shape({
  companyName: string().required('company name is required'),
  title: string().required('title is required'),
  startDate: string().required('start date is required'),
  skillsUsed: array().of(string()).optional(),
  employmentType: string().required('employment type is required')
});

export interface InitialEmploymentValue {
  companyName: string;
  title: string;
  supervisor?: SupervisorType;
  isCurrentPosition: boolean;
  responsibilities: string[];
  skillsUsed: any[];
  favoriteProject: string;
  accomplishments: string[];
  responsibility: string;
  accomplishment: string;
  startDate: string;
  endDate?: string;
  showDetail?: boolean;
  currentSupervisor: string;
  employmentType: string;
  reference?: {
    name: string;
    detail: DetailType;
  };
  showReferenceDetail?: boolean;
  showReference?: boolean;
  currentReference?: string;
}
