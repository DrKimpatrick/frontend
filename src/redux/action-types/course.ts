export enum CourseTypes {
  AddCourse = 'CourseTypes/AddCourse',
  ListPendingCourse = 'CourseTypes/ListPendingCourse',
  ListAcceptedCourse = 'CourseTypes/ListAcceptedCourse',
  ListDeclinedCourse = 'CourseTypes/ListDeclinedCourse',
  Loading = 'CourseTypes/Loading',
  Errors = 'CourseTypes/Errors'
}

export enum CourseStatus {
  Accepted = 'accepted',
  Pending = 'pending',
  Declined = 'declined'
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

export type CourseActionTypes =
  | ListAcceptedCourse
  | ListDeclinedCourse
  | ListPendingCourse
  | Loading
  | Errors;