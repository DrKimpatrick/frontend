export enum AffiliateTypes {
  AddMoreInfo = 'Affiliate/AddMoreInfo',
  Errors = 'Affiliate/Errors',
  Loading = 'Affiliate/Loading'
}

// export interface CompanyOrSchool {
//   _id?: string;
//   name: string;
//   address: string;
//   website: string;
//   accountManagerName: string;
//   email: string;
//   phone: string;
//   userId?: string;
//   createdAt?: string;
//   updatedAt?: string;
// }

interface AddMoreInfo {
  type: typeof AffiliateTypes.AddMoreInfo;
  payload: {
    data: any;
  };
}

interface Errors {
  type: typeof AffiliateTypes.Errors;
  payload: {
    errors: any;
  };
}

interface Loading {
  type: typeof AffiliateTypes.Loading;
}

export type CompanyActionTypes = AddMoreInfo | Errors | Loading;
