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

    case QuestionTypes.AddVideoQuestion:
      return { ...state, addVideoQuestion: action.payload.data };

    case QuestionTypes.AddVideoQuestionError:
      return { ...state, addVideoQuestionError: action.payload.errors };

    case QuestionTypes.AddVideoQuestionLoading:
      return { ...state, addVideoQuestionLoading: action.payload.loading };

    case QuestionTypes.UploadVideo:
      return { ...state, uploadedVideo: action.payload.data };

    case QuestionTypes.UploadingVideoError:
      return { ...state, uploadVideoError: action.payload.errors };

    case QuestionTypes.UploadingVideoLoading:
      return { ...state, uploadVideoLoading: action.payload.loading };
    default:
      return state;
  }
};
