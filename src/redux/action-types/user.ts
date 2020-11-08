import { UserTypes } from '../actions/user';

export interface User {
  _id: string;
  username: string;
  email: string;
  roles: string[];
  updatedAt: string;
  dateRegistered: string;
  paymentStatus: string;
  featureChoice: string;
  verified: boolean;
}

interface CurrentUser {
  type: typeof UserTypes.CurrentUser;
  payload: {
    data: User;
  };
}

interface Errors {
  type: typeof UserTypes.Errors;
  payload: {
    errors: any;
  };
}

export type UserTypeActions = CurrentUser | Errors;
