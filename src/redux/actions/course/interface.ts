export interface CourseInitialValue {
  name: string;
  level: string;
  instructor: string;
  format: string;
  languageTaught: string;
  existingCourseLink: string;
  coverImageLink: string;
  currentLangSpecsUpdated: boolean;
  duration: string | number;
  description: string;
  price: string | number;
}

export interface OwnerDetailType {
  _id: string;
  count: number;
  users: {
    _id: string;
    profilePicture: string;
    username: string;
  }[];
}
export interface CourseOwnerType {
  data: OwnerDetailType[];
  totalDocs: number;
  currentPage: number;
  limit: number;
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
    profilePicture?: string;
  };
  createdAt: string;
  updatedAt: string;
  level: string;
  description: string;
  duration: string;
  format: string;
  price: string;
}

export interface UserCourseType {
  data: Course[];
  totalDocs: number;
  currentPage: number;
}
