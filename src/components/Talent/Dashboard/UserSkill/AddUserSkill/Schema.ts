import { object, string } from 'yup';

export const addUserSkillSchema = object().shape({
  skillName: string().required('skill is required'),
  skill: string().required('select skill from list'),
  level: string().required('level is required')
});
