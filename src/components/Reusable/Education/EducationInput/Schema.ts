import { object, string, array } from 'yup';

export const educationSchema = object().shape({
  schoolName: string().required('school name is required'),
  level: string().required('level is required'),
  degreeOrCertification: string().required('degree is required'),
  specializations: array()
    .of(string().required('specialization is required'))
    .required('specialization is required'),
  startDate: string().required('start date is required')
});

export interface InitialEducationValue {
  schoolName: string;
  level: string;
  degreeOrCertification: string;
  isCurrentEducation: boolean;
  specializations: string[];
  accomplishments: string[];
  specialization: string;
  accomplishment: string;
  startDate: string;
  endDate?: string;
  certificateType: string;
  schoolWebsite: string;
}
