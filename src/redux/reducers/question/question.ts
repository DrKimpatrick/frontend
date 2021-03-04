import {
  QuestionTypes,
  QuestionActionTypes
} from 'redux/action-types/question';
import { QuestionInitialStateType } from '.';

const initialState: QuestionInitialStateType = {};

export const questionReducer = (
  state = initialState,
  action: QuestionActionTypes
) => {
  switch (action.type) {
    case QuestionTypes.AddMcqQuestionErrors:
      return {
        ...state,
        addMcqQuestionErrors: action.payload.errors
      };

    case QuestionTypes.AddMcqQuestion:
      return {
        ...state,
        addMcqQuestion: action.payload.data
      };

    case QuestionTypes.AddMcqQuestionLoading:
      return { ...state, addMcqQuestionLoading: action.payload.loading };
    default:
      return state;
  }
};
