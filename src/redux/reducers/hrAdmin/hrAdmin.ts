import { HrAdminActionType, HrAdminType } from 'redux/action-types/hrAdmin';
import { HrAdmin } from 'redux/actions/hrAdmin/interface';
import { User } from 'redux/actions/user';

interface InitialState {
  readonly loading?: boolean;
  readonly usedCode?: HrAdmin[];
  readonly errors?: any;
  readonly searchedTalents?: User[] | null;
}

const initialState: InitialState = {};

export const hrAdminReducer = (
  state = initialState,
  action: HrAdminActionType
) => {
  switch (action.type) {
    case HrAdminType.Errors:
      return { ...state, errors: action.payload.errors };

    case HrAdminType.ListUsedCode:
      return { ...state, usedCode: action.payload.data };

    case HrAdminType.Loading:
      return {
        ...state,
        loading: action.payload.loading,
        searchedTalents: null
      };

    case HrAdminType.GetSearchedTalents:
      return {
        ...state,
        searchedTalents: action.payload.data,
        errors: null,
        loading: false
      };

    case HrAdminType.ClearSearchedResults:
      return {
        ...state,
        searchedTalents: null,
        loading: false,
        errors: null
      };

    default:
      return state;
  }
};
