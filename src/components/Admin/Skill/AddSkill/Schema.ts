import { object, string } from 'yup';

export const addSkillSchema = object().shape({
  skill: string()
    .required('skill is required')
    .min(2, 'skill must be more than 2 character')
});
