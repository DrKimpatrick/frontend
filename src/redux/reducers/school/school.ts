import { CompanyOrSchool as ISchool } from '../../action-types/company';
import { SchoolActionTypes, SchoolTypes } from '../../action-types/school';

interface InitialState {
  readonly schools?: ISchool[];
  readonly loading?: boolean;
  readonly errors?: any;
}

const initialState: InitialState = {
  loading: false,
  errors: null
};

export const schoolReducer = (
  state = initialState,
  action: SchoolActionTypes
) => {
  switch (action.type) {
    case SchoolTypes.Loading:
      return {
        ...state,
        loading: true,
        errors: null
      };
    case SchoolTypes.Errors:
      return {
        ...state,
        loading: false,
        errors: action.payload.errors
      };
    case SchoolTypes.AddSchool:
      return {
        ...state,
        schools: state.schools
          ? [...state.schools, action.payload.data]
          : [action.payload.data],
        loading: false
      };

    default:
      return state;
  }
};
