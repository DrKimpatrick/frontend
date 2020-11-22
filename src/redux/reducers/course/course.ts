import {
  CourseActionTypes,
  CourseTypes,
  Course
} from 'redux/action-types/course';

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

    default:
      return state;
  }
};
