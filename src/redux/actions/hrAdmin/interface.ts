import { User } from 'redux/actions/user';

export interface HrAdmin {
  usedBy: User[];
  _id: string;
  issuer: User;
  coupon: string;
  createdAt: string;
  updatedAt: string;
}
