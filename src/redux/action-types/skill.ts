export interface Skill {
  _id: string;
  skill: string;
  createdAt?: string;
  updatedAt?: string;
}

export enum SkillLevel {
  Beginner = 'beginner',
  Advanced = 'advanced',
  Intermediate = 'intermediate'
}
