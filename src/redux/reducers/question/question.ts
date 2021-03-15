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

    // add video question
    case QuestionTypes.AddVideoQuestion:
      return { ...state, addVideoQuestion: action.payload.data };

    case QuestionTypes.AddVideoQuestionError:
      return { ...state, addVideoQuestionError: action.payload.errors };

    case QuestionTypes.AddVideoQuestionLoading:
      return { ...state, addVideoQuestionLoading: action.payload.loading };

    // Upload video question
    case QuestionTypes.UploadVideo:
      return { ...state, uploadedVideo: action.payload.data };

    case QuestionTypes.UploadingVideoError:
      return { ...state, uploadVideoError: action.payload.errors };

    case QuestionTypes.UploadingVideoLoading:
      return { ...state, uploadVideoLoading: action.payload.loading };

    case QuestionTypes.VerifiedQuestions:
      return { ...state, verifiedQuestions: action.payload.data };

    case QuestionTypes.VerifiedQuestionsLoading:
      return { ...state, verifiedQuestionsLoading: action.payload.loading };

    case QuestionTypes.VerifiedQuestionsError:
      return { ...state, verifiedQuestionsError: action.payload.errors };

    // edit video question
    case QuestionTypes.EditVideoQuestion:
      return { ...state, editVideoQuestion: action.payload.data };

    case QuestionTypes.EditVideoQuestionError:
      return { ...state, editVideoQuestionError: action.payload.errors };

    case QuestionTypes.EditVideoQuestionLoading:
      return { ...state, editVideoQuestionLoading: action.payload.loading };

    // get question by id
    case QuestionTypes.GetQuestion:
      return { ...state, getQuestion: action.payload.data };

    case QuestionTypes.GetQuestionError:
      return { ...state, getQuestionError: action.payload.errors };

    case QuestionTypes.GetQuestionLoading:
      return { ...state, getQuestionLoading: action.payload.loading };

    case QuestionTypes.AddCodingQuestion:
      return { ...state, addCodingQuestion: action.payload.data };

    case QuestionTypes.AddCodingQuestionError:
      return { ...state, addCodingQuestionError: action.payload.errors };

    case QuestionTypes.AddCodingQuestionLoading:
      return { ...state, addCodingQuestionLoading: action.payload.loading };

    default:
      return state;
  }
};
