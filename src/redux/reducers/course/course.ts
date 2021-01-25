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

    default:
      return state;
  }
};
