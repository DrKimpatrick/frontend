import { object, string } from 'yup';

export const currentRoleSchema = object().shape({
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
  startDate: string().required('start date is required')
});
