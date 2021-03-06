import { map } from 'lodash';
import { MessageActionType, MessageTypes } from 'redux/action-types/message';
import {
  EducationActionTypes,
  Education,
  EducationTypes
} from 'redux/action-types/education';

interface InitialState {
  readonly message?: string;
  readonly errors?: any;
  readonly educations?: Education[];
  readonly education?: Education;
  readonly loading?: boolean;
}

const initialState: InitialState = {};

export const educationReducer = (
  state = initialState,
  action: EducationActionTypes | MessageActionType
) => {
  switch (action.type) {
    case EducationTypes.AddEducation:
      return {
        ...state,
        educations: state.educations && [
          ...state.educations,
          action.payload.data
        ],
        loading: false,
        education: action.payload.data
      };

    case EducationTypes.DeleteEducation:
      return {
        ...state,
        loading: false,
        educations:
          state.educations &&
          state.educations.filter(item => item._id !== action.payload.id)
      };

    case EducationTypes.ListEducation:
      return { ...state, loading: false, educations: action.payload.data };

    case EducationTypes.ListSpecificEducation:
      return { ...state, loading: false, education: action.payload.data };

    case EducationTypes.UpdateEducation:
      const update = map(state.educations, item => {
        if (item._id === action.payload.data._id) {
          item = action.payload.data;
        }
        return item;
      });
      return {
        ...state,
        loading: false,
        educations: state.educations && update
      };

    case EducationTypes.Errors:
      return { ...state, loading: false, errors: action.payload.errors };

    case EducationTypes.Loading:
      return {
        ...state,
        loading: action.payload.loading
      };

    case MessageTypes.Error:
    case MessageTypes.Message:
      return { ...state, loading: false };

    case EducationTypes.ChangeEducationStatus:
      if (state.educations) {
        const changeStatus = state.educations.map(item => {
          if (item._id === action.payload.data._id) {
            item.verificationStatus = action.payload.data.verificationStatus;
          }
          return item;
        });
        return { ...state, educations: changeStatus };
      }
      return { ...state };

    default:
      return state;
  }
};
