import {
  CompanyActionTypes,
  CompanyOrSchool as ICompany,
  CompanyTypes
} from '../../action-types/company';

interface InitialState {
  readonly companies?: ICompany[];
  readonly loading?: boolean;
  readonly errors?: any;
}

const initialState: InitialState = {
  loading: false,
  errors: null
};

export const companyReducer = (
  state = initialState,
  action: CompanyActionTypes
) => {
  switch (action.type) {
    case CompanyTypes.Loading:
      return {
        ...state,
        loading: true,
        errors: null
      };
    case CompanyTypes.Errors:
      return {
        ...state,
        loading: false,
        errors: action.payload.errors
      };
    case CompanyTypes.AddCompany:
      return {
        ...state,
        companies: state.companies
          ? [...state.companies, action.payload.data]
          : [action.payload.data],
        loading: false
      };

    default:
      return state;
  }
};
