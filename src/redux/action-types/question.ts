export enum QuestionTypes {
  AddMcqQuestion = 'QuestionTypes/AddMcqQuestion',
  AddMcqQuestionLoading = 'QuestionTypes/AddMcqQuestionLoading',
  AddMcqQuestionErrors = 'QuestionTypes/AddMcqQuestionErrors',
  UploadingVideoLoading = 'QuestionTypes/UploadingVideoLoading',
  UploadingVideoError = 'QuestionTypes/UploadingVideoError',
  AddVideoQuestionLoading = 'QuestionTypes/AddVideoQuestionLoading',
  AddVideoQuestion = 'QuestionTypes/AddVideoQuestion',
  AddVideoQuestionError = 'QuestionTypes/AddVideoQuestionError',
  UploadVideo = 'QuestionTypes/UploadVideo'
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
export type QuestionActionTypes =
  | AddMcqQuestion
  | AddMcqQuestionLoading
  | AddMcqQuestionErrors
  | AddVideoQuestion
  | UploadVideoError
  | UploadVideoLoading
  | AddVideoQuestionError
  | AddVideoQuestionLoading
  | UploadVideo;
