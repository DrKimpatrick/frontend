import { map } from 'lodash';
import { EmploymentTypes } from '../../actions/employment';
import { MessageActionType } from '../../action-types/message';
import {
  EmploymentActionTypes,
  Employment
} from '../../action-types/employment';
import { MessageTypes } from '../../actions/message';
interface InitialState {
  readonly message?: string;
  readonly errors?: any;
  readonly employments?: Employment[];
  readonly employment?: Employment;
  readonly loading?: boolean;
}

const initialState: InitialState = {};

export const employmentReducer = (
  state = initialState,
  action: EmploymentActionTypes | MessageActionType
) => {
  switch (action.type) {
    case EmploymentTypes.AddEmployment:
      return {
        ...state,
        loading: false,
        employments: state.employments
          ? [action.payload.data, ...state.employments]
          : [action.payload.data]
      };

    case EmploymentTypes.ListEmployments:
      return { ...state, employments: action.payload.data, loading: false };

    case EmploymentTypes.ListSpecificEmployment:
      return { ...state, employment: action.payload.data, loading: false };

    case EmploymentTypes.Success:
      return { ...state, message: action.payload.message };

    case EmploymentTypes.DeleteEmployment:
      return {
        ...state,
        employments:
          state.employments &&
          state.employments.filter(item => item._id !== action.payload.id),
        loading: false
      };

    case EmploymentTypes.UpdateEmployment:
      const update = map(state.employments, item => {
        if (item._id === action.payload.data._id) {
          item = action.payload.data;
        }
        return item;
      });
      return {
        ...state,
        loading: false,
        employments: state.employments && update
      };

    case EmploymentTypes.Loading:
      return {
        ...state,
        loading: action.payload.loading ? action.payload.loading : true
      };

    case EmploymentTypes.Errors:
      return { ...state, errors: action.payload.errors, loading: false };

    case MessageTypes.Message:
      return { ...state, loading: false, errors: undefined };

    case MessageTypes.Error:
      return { ...state, loading: false };

    default:
      return state;
  }
};
