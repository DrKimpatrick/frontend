import UsersInitialStateInterface from 'types/UsersInitialState';
import users from 'redux/initialStates/users';
import {
  Register,
  RegisterDispatchTypes,
  REGISTER_LOADING,
  REGISTER_FAIL,
  REGISTER_SUCCESS
} from 'redux/action-types/getStarted';

import {
  Login,
  LoginDispatchTypes,
  LOGIN_LOADING,
  LOGIN_FAIL,
  LOGIN_SUCCESS
} from 'redux/action-types/login';

import {
  FORGOT_FAIL,
  FORGOT_LOADING,
  FORGOT_SUCCESS,
  ForgotDispatchTypes
} from 'redux/action-types/forgotPass';

import { UserTypeActions } from 'redux/action-types/user';
import { UserTypes } from 'redux/actions/user';

import {
  ResetFail,
  RESET_FAIL,
  RESET_LOADING,
  RESET_SUCCESS,
  ResetDispatchTypes
} from 'redux/action-types/resetPass';

import {
  VERIFY_SUCCESS,
  VERIFY_LOADING,
  VERIFY_FAIL,
  VerifyDispatchTypes
} from 'redux/action-types/verifyAcc';

const usersReducer = (
  state: UsersInitialStateInterface = users,
  action:
    | RegisterDispatchTypes
    | LoginDispatchTypes
    | ForgotDispatchTypes
    | ResetDispatchTypes
    | VerifyDispatchTypes
    | UserTypeActions
) => {
  switch (action.type) {
    case REGISTER_FAIL:
      return {
        ...state,
        errorSignup: action.payload,
        created: true,
        loading: false
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: {
          data: action.payload,
          isLoggedIn: false,
          created: true,
          error: null
        }
      };
    case LOGIN_LOADING:
      return {
        ...state,
        loading: true
      };
    case FORGOT_LOADING:
      return {
        ...state,
        loading: true
      };
    case RESET_LOADING:
      return {
        ...state,
        loading: true
      };
    case VERIFY_LOADING:
      return {
        ...state,
        loading: true
      };
    case REGISTER_LOADING:
      return {
        ...state,
        loading: true
      };
    case LOGIN_FAIL:
      return {
        ...state,
        errorLogin: action.payload,
        loading: false
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        loading: false
      };

    case FORGOT_FAIL:
      return {
        ...state,
        errorForgot: action.payload,
        loading: false
      };

    case FORGOT_SUCCESS:
      return {
        ...state,
        errorForgot: null,
        loading: false
      };

    case RESET_FAIL:
      return {
        ...state,
        errorReset: action.payload,
        loading: false
      };

    case RESET_SUCCESS:
      return {
        ...state,
        errorReset: null,
        resetSuccess: true,
        loading: false
      };

    case VERIFY_FAIL:
      return {
        ...state,
        errorVerify: action.payload,
        loading: false
      };

    case VERIFY_SUCCESS:
      return {
        ...state,
        message: action.payload,
        errorVerify: null,
        loading: false
      };

    case UserTypes.CurrentUser:
      return { ...state, user: action.payload.data, loading: false };

    case UserTypes.Errors:
      return { ...state, errors: action.payload.errors, loading: false };

    default:
      return state;
  }
};

export default usersReducer;
