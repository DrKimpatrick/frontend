import { object, string, array } from 'yup';

export const employmentSchema = object().shape({
  companyName: string().required('company name is required'),
  supervisor: object()
    .shape({
      name: string().required('supervisor is required'),
      detail: object()
        .shape({
          name: string().required('name is required'),
          phoneNumber: string().required('phone number is required'),
          email: string()
            .email('email must be valid')
            .required('email is required')
        })
        .required('detail is required')
    })
    .required('supervisor is required'),
  title: string().required('title is required'),
  startDate: string().required('start date is required'),
  skillsUsed: array().of(string()).optional()
});

export interface InitialEmploymentValue {
  companyName: string;
  title: string;
  supervisor: {
    name: string;
    detail: {
      name: string;
      phoneNumber: string;
      email: string;
    };
  };
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
}
