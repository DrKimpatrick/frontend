import { Course } from 'redux/actions/course';
import { Employment } from 'redux/action-types/employment';
import { Education } from 'redux/action-types/education';
import { Skill } from 'redux/action-types/skill';

export interface AddAffiliateType {
  profilePicture: string;
  bio: string;
  username: string;
  email: string;
  password: string;
  paypalEmail: string;
  linkToPlatform?: string;
}

export interface UploadedFileType {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  path: string;
  size: number;
  filename: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  roles: string[];
  updatedAt: string;
  dateRegistered: string;
  paymentStatus: string;
  couponUsed?: string;
  featureChoice: string;
  verified: boolean;
  employmentHistory?: Employment[];
  educationHistory?: Education[];
  profileProcess?: string;
  profilePicture?: string;
  bio?: string;
  stripeSubscriptionId?: string;
  courses?: Course[];
  sharedLink?: string;
  recommendedBy?: string;
}

export interface UserSkill {
  _id: string;
  verificationStatus: string;
  level: string;
  skill: Skill;
  createdAt?: string;
  updatedAt?: string;
}
