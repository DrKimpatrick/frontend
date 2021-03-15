import { QuestionWithPaginationType, Question } from 'redux/actions/question';

export enum QuestionTypes {
  AddMcqQuestion = 'QuestionTypes/AddMcqQuestion',
  AddMcqQuestionLoading = 'QuestionTypes/AddMcqQuestionLoading',
  AddMcqQuestionErrors = 'QuestionTypes/AddMcqQuestionErrors',
  UploadingVideoLoading = 'QuestionTypes/UploadingVideoLoading',
  UploadingVideoError = 'QuestionTypes/UploadingVideoError',
  AddVideoQuestionLoading = 'QuestionTypes/AddVideoQuestionLoading',
  AddVideoQuestion = 'QuestionTypes/AddVideoQuestion',
  AddVideoQuestionError = 'QuestionTypes/AddVideoQuestionError',
  UploadVideo = 'QuestionTypes/UploadVideo',
  VerifiedQuestions = 'QuestionTypes/VerifiedQuestions',
  VerifiedQuestionsError = 'QuestionTypes/VerifiedQuestionsError',
  VerifiedQuestionsLoading = 'QuestionTypes/VerifiedQuestionsLoading',
  EditVideoQuestionLoading = 'QuestionTypes/EditVideoQuestionLoading',
  EditVideoQuestion = 'QuestionTypes/EditVideoQuestion',
  EditVideoQuestionError = 'QuestionTypes/EditVideoQuestionError',
  GetQuestionLoading = 'QuestionTypes/GetQuestionLoading',
  GetQuestion = 'QuestionTypes/GetQuestion',
  GetQuestionError = 'QuestionTypes/GetQuestionError',
  AddCodingQuestion = 'QuestionTypes/AddCodingQuestion',
  AddCodingQuestionLoading = 'QuestionTypes/AddCodingQuestionLoading',
  AddCodingQuestionError = 'QuestionTypes/AddCodingQuestionError'
}

export enum Language {
  Javascript = 'javascript',
  Python = 'python'
}

export enum Level {
  Advanced = 'advanced',
  Beginner = 'beginner',
  Intermediate = 'intermediate'
}

export enum JsFramework {
  React = 'React JS',
  Angular = 'Angular',
  Vue = 'Vue',
  NodeJs = 'Node JS'
}

export enum PythonFramework {
  Django = 'Django',
  Flask = 'Flask'
}

export enum QuestionTypeEnum {
  LiveCoding = 'LiveCoding',
  MultipleChoice = 'MultipleChoice',
  Video = 'Video'
}

interface AddMcqQuestion {
  type: typeof QuestionTypes.AddMcqQuestion;
  payload: {
    data: boolean;
  };
}

interface AddMcqQuestionLoading {
  type: typeof QuestionTypes.AddMcqQuestionLoading;
  payload: {
    loading: boolean;
  };
}

interface AddMcqQuestionErrors {
  type: typeof QuestionTypes.AddMcqQuestionErrors;
  payload: {
    errors: any;
  };
}

interface AddVideoQuestion {
  type: typeof QuestionTypes.AddVideoQuestion;
  payload: {
    data: boolean;
  };
}

interface AddVideoQuestionError {
  type: typeof QuestionTypes.AddVideoQuestionError;
  payload: {
    errors: any;
  };
}

interface AddVideoQuestionLoading {
  type: typeof QuestionTypes.AddVideoQuestionLoading;
  payload: {
    loading: boolean;
  };
}

interface UploadVideoLoading {
  type: typeof QuestionTypes.UploadingVideoLoading;
  payload: {
    loading: boolean;
  };
}

interface UploadVideoError {
  type: typeof QuestionTypes.UploadingVideoError;
  payload: {
    errors: any;
  };
}

interface UploadVideo {
  type: typeof QuestionTypes.UploadVideo;
  payload: {
    data: any;
  };
}

interface VerifiedQuestions {
  type: typeof QuestionTypes.VerifiedQuestions;
  payload: {
    data: QuestionWithPaginationType;
  };
}

interface VerifiedQuestionsError {
  type: typeof QuestionTypes.VerifiedQuestionsError;
  payload: {
    errors: any;
  };
}
interface VerifiedQuestionsLoading {
  type: typeof QuestionTypes.VerifiedQuestionsLoading;
  payload: {
    loading: boolean;
  };
}

interface EditVideoQuestion {
  type: typeof QuestionTypes.EditVideoQuestion;
  payload: {
    data: boolean;
  };
}

interface EditVideoQuestionError {
  type: typeof QuestionTypes.EditVideoQuestionError;
  payload: {
    errors: any;
  };
}

interface EditVideoQuestionLoading {
  type: typeof QuestionTypes.EditVideoQuestionLoading;
  payload: {
    loading: boolean;
  };
}

interface AddCodingQuestion {
  type: typeof QuestionTypes.AddCodingQuestion;
  payload: {
    data: Question;
  };
}

interface AddCodingQuestionLoading {
  type: typeof QuestionTypes.AddCodingQuestionLoading;
  payload: {
    loading: boolean;
  };
}

interface GetQuestion {
  type: typeof QuestionTypes.GetQuestion;
  payload: {
    data: Question;
  };
}

interface GetQuestionError {
  type: typeof QuestionTypes.GetQuestionError;
  payload: {
    errors: any;
  };
}
interface AddCodingQuestionError {
  type: typeof QuestionTypes.AddCodingQuestionError;
  payload: {
    errors: any;
  };
}

interface GetQuestionLoading {
  type: typeof QuestionTypes.GetQuestionLoading;
  payload: {
    loading: boolean;
  };
}
export type QuestionActionTypes =
  | AddMcqQuestion
  | AddMcqQuestionLoading
  | AddMcqQuestionErrors
  | AddVideoQuestion
  | UploadVideoError
  | UploadVideoLoading
  | AddVideoQuestionError
  | AddVideoQuestionLoading
  | UploadVideo
  | VerifiedQuestions
  | VerifiedQuestionsError
  | VerifiedQuestionsLoading
  | EditVideoQuestion
  | EditVideoQuestionError
  | EditVideoQuestionLoading
  | GetQuestion
  | GetQuestionError
  | GetQuestionLoading
  | AddCodingQuestion
  | AddCodingQuestionError
  | AddCodingQuestionLoading;
