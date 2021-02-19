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

import { UserTypeActions, UserTypes } from 'redux/action-types/user';

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
import {
  EducationTypes,
  EducationActionTypes
} from 'redux/action-types/education';
import {
  EmploymentTypes,
  EmploymentActionTypes
} from 'redux/action-types/employment';

import {
  UploadedFileType,
  User,
  UserSkill,
  SubscriptionRecommendation
} from 'redux/actions/user';

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
  viewList?: boolean;
  // skills?: AddedSkill[];
  activePath: string | null;
  userTrainingAffiliate?: {
    totalDocs?: number;
    users?: User[];
    currentPage?: number;
  };
  userHrAdmin?: {
    totalDocs?: number;
    users?: User[];
    currentPage?: number;
  };
  userRecruiter?: {
    totalDocs?: number;
    users?: User[];
    currentPage?: number;
  };
  userCompany?: {
    totalDocs?: number;
    users?: User[];
    currentPage?: number;
  };
  userTalent?: {
    totalDocs?: number;
    users?: User[];
    currentPage?: number;
  };
  userEducationLoading?: boolean;
  userEmploymentLoading?: boolean;
  userSkillLoading?: boolean;
  uploadedImage?: UploadedFileType[];
  uploadProfilePictureLoading?: boolean;
  addAffiliate?: boolean;
  addAffiliateLoading?: boolean;
  recommendation?: User[];
  recommendationLoading?: boolean;
  specificUserLoading?: boolean;
  subscriptionOfRecommendedUser?: SubscriptionRecommendation[];
  subscriptionOfRecommendedUserLoading?: boolean;
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
    | EducationActionTypes
    | EmploymentActionTypes
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
        errorSignup: null,
        currentUser: {
          ...state.currentUser,
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
      return {
        ...state,
        user: action.payload.data,
        currentUser: {
          ...state.currentUser,
          isLoggedIn: true
        },
        loading: false
      };

    case UserTypes.Errors:
      return {
        ...state,
        errors: action.payload.errors,
        loading: false,
        userSkillLoading: false,
        userEducationLoading: false,
        userEmploymentLoading: false
      };

    case UserTypes.Loading:
      return { ...state, loading: action.payload.loading };

    case UserTypes.ListSpecificUser:
      return {
        ...state,
        specificUser: action.payload.data,
        viewList: false,
        loading: false,
        userEducationLoading: false,
        userEmploymentLoading: false,
        userSkillLoading: false
      };

    case UserTypes.ListUserSkill:
      return { ...state, userSkill: action.payload.data, loading: false };

    case SkillTypes.GetSkillsFail:
      return { ...state, errors: action.payload, loading: false };

    case SkillTypes.GetSkillsLoading:
      return { ...state, loading: true };

    case SkillTypes.GetSkillsSuccess:
      // errors: null - errors was here and I don't know why we need to set it to null
      // if this cause error we can add it back, but i don't think errors should called here
      return { ...state, skills: action.payload, loading: false };

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
        viewList: true,
        loading: false
      };

    case UserTypes.ListHrAdminUser:
      return {
        ...state,
        userHrAdmin: {
          users: action.payload.data.data,
          totalDocs: action.payload.data.totalDocs,
          currentPage: action.payload.data.currentPage
        },
        loading: false
      };

    case UserTypes.ListTalentUser:
      return {
        ...state,
        userTalent: {
          users: action.payload.data.data,
          totalDocs: action.payload.data.totalDocs,
          currentPage: action.payload.data.currentPage
        },
        loading: false
      };

    case UserTypes.ListCompanyUser:
      return {
        ...state,
        userCompany: {
          users: action.payload.data.data,
          totalDocs: action.payload.data.totalDocs,
          currentPage: action.payload.data.currentPage
        },
        loading: false
      };

    case UserTypes.ListAffiliateUser:
      return {
        ...state,
        userTrainingAffiliate: {
          users: action.payload.data.data,
          totalDocs: action.payload.data.totalDocs,
          currentPage: action.payload.data.currentPage
        },
        loading: false
      };

    case UserTypes.ListRecruiterUser:
      return {
        ...state,
        userRecruiter: {
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

    case UserTypes.UserEducationLoading:
      return { ...state, userEducationLoading: action.payload.loading };

    case UserTypes.UserEmploymentLoading:
      return { ...state, userEmploymentLoading: action.payload.loading };

    case UserTypes.UserSkillLoading:
      return { ...state, userSkillLoading: action.payload.loading };

    case EducationTypes.ChangeEducationStatus:
      if (
        state.specificUser &&
        state.specificUser.educationHistory &&
        state.specificUser.educationHistory.length > 0
      ) {
        const educations = state.specificUser.educationHistory;

        const educationIndex = educations.findIndex(
          item => item._id === action.payload.data._id
        );

        educations[educationIndex] = action.payload.data;

        return {
          ...state,
          specificUser: { ...state.specificUser, educationHistory: educations },
          userEducationLoading: false
        };
      }
      return state;

    case EmploymentTypes.ChangeEmploymentStatus:
      if (
        state.specificUser &&
        state.specificUser.employmentHistory &&
        state.specificUser.employmentHistory.length > 0
      ) {
        const employments = state.specificUser.employmentHistory;

        const employmentIndex = employments.findIndex(
          item => item._id === action.payload.data._id
        );

        employments[employmentIndex] = action.payload.data;

        return {
          ...state,
          specificUser: {
            ...state.specificUser,
            employmentHistory: employments
          },
          userEmploymentLoading: false
        };
      }
      return state;

    case SkillTypes.ChangeSkillStatus:
      if (state.userSkill && state.userSkill && state.userSkill.length > 0) {
        const skills = state.userSkill;

        const skillIndex = skills.findIndex(
          item => item._id === action.payload.data._id
        );

        skills[skillIndex] = action.payload.data;

        return {
          ...state,
          userSkill: skills,
          userSkillLoading: false
        };
      }
      return state;

    case UserTypes.SetProfileProcess:
      return {
        ...state,
        user: state.user
          ? { ...state.user, profileProcess: action.payload.data }
          : state.user
      };

    case UserTypes.AddAffiliate:
      return { ...state, addAffiliate: action.payload.data };

    case UserTypes.AddAffiliateLoading:
      return { ...state, addAffiliateLoading: action.payload.loading };

    case UserTypes.UploadProfilePicture:
      return { ...state, uploadedImage: action.payload.data };

    case UserTypes.UploadProfilePictureLoading:
      return { ...state, uploadProfilePictureLoading: action.payload.loading };

    case UserTypes.Recommendation:
      return { ...state, recommendation: action.payload.data };

    case UserTypes.RecommendationLoading:
      return { ...state, recommendationLoading: action.payload.loading };

    case UserTypes.SpecificUserLoading:
      return { ...state, specificUserLoading: action.payload.loading };

    case UserTypes.SubscriptionOfRecommendedUser:
      return { ...state, subscriptionOfRecommendedUser: action.payload.data };

    case UserTypes.SubscriptionOfRecommendedUserLoading:
      return {
        ...state,
        subscriptionOfRecommendedUserLoading: action.payload.loading
      };

    default:
      return state;
  }
};

export default userReducer;
