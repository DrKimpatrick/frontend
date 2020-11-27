import { SkillTypes, SkillActionTypes } from 'redux/action-types/skill';
import {
  RegisterDispatchTypes,
  REGISTER_LOADING,
  REGISTER_FAIL,
  REGISTER_SUCCESS
} from 'redux/action-types/getStarted';

import {
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

import {
  UserTypeActions,
  UserTypes,
  User,
  UserSkill
} from 'redux/action-types/user';

import {
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

interface InitialState {
  currentUser: {
    isLoggedIn: boolean;
    data: object | null | any;
    loading: boolean;
    error?: any;
    message?: string;
    created?: boolean;
  };
  user?: User;
  loading?: boolean;
  errors?: any;
  specificUser?: User;
  userSkill?: UserSkill[];
  usersByRole?: {
    totalDocs?: number;
    users?: User[];
    currentPage?: number;
  };
  // skills?: AddedSkill[];
  activePath: string | null;
}

const initialState: InitialState = {
  currentUser: {
    isLoggedIn: !!localStorage.getItem('token'),
    loading: false,
    created: false,
    data: {
      firstName: 'John',
      lastName: 'Smith',
      profilePicture:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    }
  },
  activePath: null
};

export const userReducer = (
  state = initialState,
  action:
    | RegisterDispatchTypes
    | LoginDispatchTypes
    | ForgotDispatchTypes
    | ResetDispatchTypes
    | VerifyDispatchTypes
    | UserTypeActions
    | SkillActionTypes
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

    case UserTypes.Loading:
      return { ...state, loading: action.payload.loading, errors: null };

    case UserTypes.ListSpecificUser:
      return {
        ...state,
        specificUser: action.payload.data,
        loading: false,
        errors: undefined
      };

    case UserTypes.ListUserSkill:
      return { ...state, userSkill: action.payload.data, loading: false };

    case SkillTypes.GetSkillsFail:
      return { ...state, errors: action.payload, loading: false };

    case SkillTypes.GetSkillsLoading:
      return { ...state, loading: true };

    case SkillTypes.GetSkillsSuccess:
      return { ...state, skills: action.payload, loading: false, errors: null };

    case SkillTypes.SkillFail:
      return { ...state, errors: action.payload, loading: false };

    case SkillTypes.SkillSuccess:
      return {
        ...state,
        addedSkill: action.payload,
        loading: false,
        errors: null
      };

    case SkillTypes.SkillLoading:
      return { ...state, loading: true };

    case UserTypes.ListUserByRole:
      return {
        ...state,
        usersByRole: {
          users: action.payload.data.data,
          totalDocs: action.payload.data.totalDocs,
          currentPage: action.payload.data.currentPage
        },
        loading: false
      };

    case UserTypes.ActivePath:
      return { ...state, activePath: action.payload.data };

    case UserTypes.UpdateUser:
      return {
        ...state,
        user: action.payload.data,
        loading: false,
        errors: null
      };

    default:
      return state;
  }
};

export default userReducer;
