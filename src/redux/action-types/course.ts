export enum CourseTypes {
  AddCourse = 'CourseTypes/AddCourse',
  ListPendingCourse = 'CourseTypes/ListPendingCourse',
  ListAcceptedCourse = 'CourseTypes/ListAcceptedCourse',
  ListDeclinedCourse = 'CourseTypes/ListDeclinedCourse',
  Loading = 'CourseTypes/Loading',
  Errors = 'CourseTypes/Errors',
  NumberOfPendingCourse = 'CourseTypes/NumberOfPendingCourse',
  NumberOfDeclinedCourse = 'CourseTypes/NumberOfDeclinedCourse',
  NumberOfAcceptedCourse = 'CourseTypes/NumberOfAcceptedCourse',
  ListCourseDetail = 'CourseTypes/ListCourseDetail',
  CourseDetailLoading = 'CourseTypes/CourseDetailLoading'
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

export interface Course {
  _id: string;
  currentLangSpecsUpdated: boolean;
  verificationStatus: string;
  name: string;
  instructor: string;
  languageTaught: string;
  existingCourseLink: string;
  coverImageLink: string;
  userId: {
    _id: string;
    username: string;
    email: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
  level: string;
  description: string;
  duration: string;
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
  | CourseDetailLoading;
