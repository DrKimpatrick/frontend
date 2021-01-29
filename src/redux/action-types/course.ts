import { CourseOwnerType, Course, UserCourseType } from 'redux/actions/course';

export enum CourseTypes {
  AddCourse = 'CourseTypes/AddCourse',
  UpdateCourse = 'CourseTypes/UpdateCourse',
  ListPendingCourse = 'CourseTypes/ListPendingCourse',
  ListAcceptedCourse = 'CourseTypes/ListAcceptedCourse',
  ListDeclinedCourse = 'CourseTypes/ListDeclinedCourse',
  Loading = 'CourseTypes/Loading',
  Errors = 'CourseTypes/Errors',
  NumberOfPendingCourse = 'CourseTypes/NumberOfPendingCourse',
  NumberOfDeclinedCourse = 'CourseTypes/NumberOfDeclinedCourse',
  NumberOfAcceptedCourse = 'CourseTypes/NumberOfAcceptedCourse',
  ListCourseDetail = 'CourseTypes/ListCourseDetail',
  CourseDetailLoading = 'CourseTypes/CourseDetailLoading',
  ListCourse = 'CourseTypes/ListCourse',
  ListCourseLoading = 'CourseTypes/ListCourseLoading',
  SubmitLoading = 'CourseTypes/SubmitLoading',
  ListCourseOwner = 'CourseTypes/ListCourseOwner',
  CourseOwnerLoading = 'CourseTypes/CourseOwnerLoading',
  UserCourse = 'CourseTypes/UserCourse',
  UserCourseLoading = 'CourseTypes/UserCourseLoading'
}

export enum CourseStatus {
  Accepted = 'accepted',
  Pending = 'pending',
  Declined = 'declined'
}

export enum CourseTimeFormat {
  Minute = 'Min',
  Hour = 'Hr'
}

export enum CourseLevel {
  Advanced = 'advanced',
  Beginner = 'beginner',
  Intermediate = 'intermediate'
}

export interface CoursePagination {
  offset?: number;
  limit?: number;
}
interface ListAcceptedCourse {
  type: typeof CourseTypes.ListAcceptedCourse;
  payload: {
    data: {
      data: Course[];
      totalItems: number;
      lastUpdatedItem: Course;
    };
  };
}

interface ListPendingCourse {
  type: typeof CourseTypes.ListPendingCourse;
  payload: {
    data: {
      data: Course[];
      totalItems: number;
      lastUpdatedItem: Course;
    };
  };
}

interface ListDeclinedCourse {
  type: typeof CourseTypes.ListDeclinedCourse;
  payload: {
    data: {
      data: Course[];
      totalItems: number;
      lastUpdatedItem: Course;
    };
  };
}
interface Loading {
  type: typeof CourseTypes.Loading;
  payload: {
    loading: boolean;
  };
}

interface Errors {
  type: typeof CourseTypes.Errors;
  payload: {
    errors: any;
  };
}

interface NumberOfPendingCourse {
  type: typeof CourseTypes.NumberOfPendingCourse;
  payload: {
    data: {
      data: Course[];
      totalItems: number;
      lastUpdatedItem: Course;
    };
  };
}

interface NumberOfDeclinedCourse {
  type: typeof CourseTypes.NumberOfDeclinedCourse;
  payload: {
    data: {
      data: Course[];
      totalItems: number;
      lastUpdatedItem: Course;
    };
  };
}

interface NumberOfAcceptedCourse {
  type: typeof CourseTypes.NumberOfAcceptedCourse;
  payload: {
    data: {
      data: Course[];
      totalItems: number;
      lastUpdatedItem: Course;
    };
  };
}

interface ListCourseDetail {
  type: typeof CourseTypes.ListCourseDetail;
  payload: {
    data: Course;
  };
}

interface CourseDetailLoading {
  type: typeof CourseTypes.CourseDetailLoading;
  payload: {
    loading: boolean;
  };
}

interface ListCourse {
  type: typeof CourseTypes.ListCourse;
  payload: {
    data: {
      data: Course[];
      totalItems: number;
    };
  };
}

interface ListCourseLoading {
  type: typeof CourseTypes.ListCourseLoading;
  payload: {
    loading: boolean;
  };
}

interface AddCourse {
  type: typeof CourseTypes.AddCourse;
  payload: {
    data: boolean;
  };
}

interface UpdateCourse {
  type: typeof CourseTypes.UpdateCourse;
  payload: {
    data: boolean;
  };
}

interface SubmitLoading {
  type: typeof CourseTypes.SubmitLoading;
  payload: {
    loading: boolean;
  };
}

interface ListCourseOwner {
  type: typeof CourseTypes.ListCourseOwner;
  payload: {
    data: CourseOwnerType;
  };
}

interface CourseOwnerLoading {
  type: typeof CourseTypes.CourseOwnerLoading;
  payload: {
    loading: boolean;
  };
}

interface UserCourse {
  type: typeof CourseTypes.UserCourse;
  payload: {
    data: UserCourseType;
  };
}

interface UserCourseLoading {
  type: typeof CourseTypes.UserCourseLoading;
  payload: {
    loading: boolean;
  };
}

export type CourseActionTypes =
  | ListAcceptedCourse
  | ListDeclinedCourse
  | ListPendingCourse
  | Loading
  | Errors
  | NumberOfAcceptedCourse
  | NumberOfDeclinedCourse
  | NumberOfPendingCourse
  | ListCourseDetail
  | CourseDetailLoading
  | ListCourse
  | ListCourseLoading
  | AddCourse
  | UpdateCourse
  | SubmitLoading
  | ListCourseOwner
  | CourseOwnerLoading
  | UserCourse
  | UserCourseLoading;
