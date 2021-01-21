import { object, string } from 'yup';

export const AffiliateInfoSchema = object().shape({
  paypalEmail: string()
    .email('Email is not valid')
    .required('Email is required'),
  bio: string().required('Please Provide bio'),
  linkToPlatform: string().required('Link to your website is required')
});
