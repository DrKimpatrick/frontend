import { CompanyOrSchool as ISchool } from './company';

export enum SchoolTypes {
  AddSchool = 'School/AddSchool',
  GetSpecificSchool = 'School/GetSpecificSchool',
  UpdateSchool = 'School/UpdateSchool',
  DeleteSchool = 'School/DeleteSchool',
  Errors = 'School/Errors',
  Loading = 'School/Loading'
}

interface AddSchool {
  type: typeof SchoolTypes.AddSchool;
  payload: {
    data: ISchool;
  };
}

interface Errors {
  type: typeof SchoolTypes.Errors;
  payload: {
    errors: any;
  };
}

interface Loading {
  type: typeof SchoolTypes.Loading;
  payload: {
    loading?: boolean;
  };
}

export type SchoolActionTypes = AddSchool | Errors | Loading;
