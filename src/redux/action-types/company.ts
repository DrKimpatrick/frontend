export enum CompanyTypes {
  AddCompany = 'Company/AddCompany',
  GetSpecificCompany = 'Company/GetSpecificCompany',
  UpdateCompany = 'Company/UpdateCompany',
  DeleteCompany = 'Company/DeleteCompany',
  Errors = 'Company/Errors',
  Loading = 'Company/Loading'
}

export interface CompanyOrSchool {
  _id?: string;
  name: string;
  address: string;
  website: string;
  accountManagerName: string;
  email: string;
  phone: string;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface AddCompany {
  type: typeof CompanyTypes.AddCompany;
  payload: {
    data: CompanyOrSchool;
  };
}

interface Errors {
  type: typeof CompanyTypes.Errors;
  payload: {
    errors: any;
  };
}

interface Loading {
  type: typeof CompanyTypes.Loading;
}

export type CompanyActionTypes = AddCompany | Errors | Loading;
