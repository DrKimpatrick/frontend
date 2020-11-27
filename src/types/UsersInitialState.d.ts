import { User } from 'redux/action-types/user';

interface UsersInitialState {
  currentUser: {
    isLoggedIn: boolean;
    data: object | null | any;
    loading: boolean;
    error: null | object | any;
  };
  user?: User;
}

export default UsersInitialState;
