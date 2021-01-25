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
