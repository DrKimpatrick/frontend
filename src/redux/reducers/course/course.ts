import { CourseActionTypes, CourseTypes } from 'redux/action-types/course';
import { CourseOwnerType, Course, UserCourseType } from 'redux/actions/course';
import { User } from 'redux/actions/user';

interface InitialState {
  loading?: boolean;
  errors?: any;
  acceptedCourse?: {
    courses: Course[];
    totalItems: number;
    lastUpdatedItem?: Course;
    currentPage?: number;
  };
  pendingCourse?: {
    courses: Course[];
    totalItems: number;
    lastUpdatedItem?: Course;
    currentPage?: number;
  };
  declinedCourse?: {
    courses: Course[];
    totalItems: number;
    lastUpdatedItem?: Course;
    currentPage?: number;
  };
  numberOfPendingCourse?: number;
  numberOfDeclinedCourse?: number;
  numberOfAcceptedCourse?: number;
  courseDetail?: Course;
  courseDetailLoading?: boolean;
  courses?: {
    data: Course[];
    totalItems: number;
  };
  courseLoading?: boolean;
  submitLoading?: boolean;
  addCourse?: boolean;
  courseOwner?: CourseOwnerType;
  courseOwnerLoading?: boolean;
  userCourseLoading?: boolean;
  userCourse?: UserCourseType;
  userWhoPaidCourse?: User[];
  userWhoPaidCourseLoading?: boolean;
  addingViewsLoading?: boolean;
  coursesStats?: {
    views?: number;
    conversionRate?: number;
    totalCoursesPrice?: number;
    totalCoursesLinks?: number;
  };
  coursesStatsLoading?: boolean;
  quarterlyCommission?: number;
  quarterlyCommissionLoading?: boolean;
}

const initialState: InitialState = {};

export const courseReducer = (
  state = initialState,
  action: CourseActionTypes
) => {
  switch (action.type) {
    case CourseTypes.ListAcceptedCourse:
      return {
        ...state,
        acceptedCourse: {
          courses: action.payload.data.data,
          lastUpdatedItem: action.payload.data.lastUpdatedItem,
          totalItems: action.payload.data.totalItems
        },
        loading: false
      };

    case CourseTypes.ListPendingCourse:
      return {
        ...state,
        pendingCourse: {
          courses: action.payload.data.data,
          lastUpdatedItem: action.payload.data.lastUpdatedItem,
          totalItems: action.payload.data.totalItems
        },
        loading: false
      };

    case CourseTypes.ListDeclinedCourse:
      return {
        ...state,
        declinedCourse: {
          courses: action.payload.data.data,
          lastUpdatedItem: action.payload.data.lastUpdatedItem,
          totalItems: action.payload.data.totalItems
        },
        loading: false
      };

    case CourseTypes.Loading:
      return { ...state, loading: action.payload.loading };

    case CourseTypes.Errors:
      return { ...state, errors: action.payload.errors, loading: false };

    case CourseTypes.NumberOfAcceptedCourse:
      return {
        ...state,
        numberOfAcceptedCourse: action.payload.data.totalItems
      };

    case CourseTypes.NumberOfPendingCourse:
      return {
        ...state,
        numberOfPendingCourse: action.payload.data.totalItems
      };

    case CourseTypes.NumberOfDeclinedCourse:
      return {
        ...state,
        numberOfDeclinedCourse: action.payload.data.totalItems
      };

    case CourseTypes.ListCourseDetail:
      return { ...state, courseDetail: action.payload.data };

    case CourseTypes.CourseDetailLoading:
      return { ...state, courseDetailLoading: action.payload.loading };

    case CourseTypes.ListCourse:
      return { ...state, courses: action.payload.data };

    case CourseTypes.ListCourseLoading:
      return { ...state, courseLoading: action.payload.loading };

    case CourseTypes.SubmitLoading:
      return { ...state, submitLoading: action.payload.loading };

    case CourseTypes.AddCourse:
    case CourseTypes.UpdateCourse:
      return { ...state, addCourse: action.payload.data };

    case CourseTypes.ListCourseOwner:
      return { ...state, courseOwner: action.payload.data };

    case CourseTypes.CourseOwnerLoading:
      return { ...state, courseOwnerLoading: action.payload.loading };

    case CourseTypes.UserCourse:
      return { ...state, userCourse: action.payload.data };

    case CourseTypes.UserCourseLoading:
      return { ...state, userCourseLoading: action.payload.loading };

    case CourseTypes.UserWhoPaidCourseLoading:
      return { ...state, userWhoPaidCourseLoading: action.payload.loading };

    case CourseTypes.UserWhoPaidCourse:
      return { ...state, userWhoPaidCourse: action.payload.data };

    case CourseTypes.AddingViewsLoading:
      return { ...state, addingViewsLoading: action.payload.loading };

    case CourseTypes.AddingViews:
      return { ...state, addingViews: action.payload.data };

    case CourseTypes.CoursesStatsLoading:
      return { ...state, coursesStatsLoading: action.payload.loading };

    case CourseTypes.CoursesStats:
      return {
        ...state,
        coursesStats: action.payload,
        coursesStatsLoading: false
      };

    case CourseTypes.QuarterlyCommissionLoading:
      return { ...state, quarterlyCommissionLoading: action.payload.loading };

    case CourseTypes.QuarterlyCommission:
      return {
        ...state,
        quarterlyCommission: action.payload.quarterlyCommission,
        quarterlyCommissionLoading: false
      };

    default:
      return state;
  }
};
