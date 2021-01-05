import { HrAdminActionType, HrAdminType } from 'redux/action-types/hrAdmin';
import { HrAdmin } from 'redux/actions/hrAdmin/interface';

interface InitialState {
  readonly loading?: boolean;
  readonly usedCode?: HrAdmin[];
  readonly errors?: any;
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
      return { ...state, loading: action.payload.loading };

    default:
      return state;
  }
};
