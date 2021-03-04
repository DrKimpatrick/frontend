export enum QuestionTypes {
  AddMcqQuestion = 'QuestionTypes/AddMcqQuestion',
  AddMcqQuestionLoading = 'QuestionTypes/AddMcqQuestionLoading',
  AddMcqQuestionErrors = 'QuestionTypes/AddMcqQuestionErrors'
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

export type QuestionActionTypes =
  | AddMcqQuestion
  | AddMcqQuestionLoading
  | AddMcqQuestionErrors;
