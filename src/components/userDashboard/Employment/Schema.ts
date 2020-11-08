import { object, string, array } from 'yup';

export const employmentSchema = object().shape({
  companyName: string().required('company name is required'),
  supervisor: string().required('supervisor is required'),
  title: string().required('title is required'),
  startDate: string().required('start date is required'),
  skillsUsed: array().of(string()).optional()
});

export interface InitialValue {
  companyName: string;
  title: string;
  supervisor: string;
  isCurrentPosition: boolean;
  responsibilities: string[];
  skillsUsed: string[];
  favoriteProject: string;
  accomplishments: string[];
  responsibility: string;
  accomplishment: string;
  startDate: string;
  endDate?: string;
}
