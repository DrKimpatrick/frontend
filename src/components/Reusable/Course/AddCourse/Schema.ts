import { object, string } from 'yup';
import { CourseBillingOptions } from 'redux/action-types/course';

export const AddCourseSchema = object().shape({
  name: string()
    .required('course name is required')
    .min(3, 'course name must be at least 3 character'),
  instructor: string().required('instructor is required'),
  languageTaught: string().required('language taught is required'),
  coverImageLink: string()
    .required('cover image is required')
    .url('cover image must be valid'),
  description: string().required('description is required'),
  duration: string().required('duration is required'),
  format: string().required('time format is required'),
  level: string().required('level is required'),
  existingCourseLink: string()
    .required('course link is required')
    .url('course link must be valid'),
  price: string().required('price is required'),
  billing: string()
    .oneOf(Object.values(CourseBillingOptions))
    .required('level is required')
});
