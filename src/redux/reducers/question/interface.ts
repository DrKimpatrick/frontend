import { QuestionWithPaginationType, Question } from 'redux/actions/question';

export interface QuestionInitialStateType {
  addMcqQuestionErrors?: any;
  addMcqQuestionLoading?: boolean;
  addMcqQuestion?: boolean;
  uploadedVideo?: any;
  addVideoQuestion?: boolean;
  addVideoQuestionError?: any;
  addVideoQuestionLoading?: boolean;
  uploadVideoLoading?: boolean;
  uploadVideoError?: boolean;
  verifiedQuestions?: QuestionWithPaginationType;
  verifiedQuestionsLoading?: boolean;
  verifiedQuestionsError?: any;
  editVideoQuestion?: boolean;
  editVideoQuestionError?: any;
  editVideoQuestionLoading?: boolean;
  getQuestion?: Question;
  getQuestionError?: any;
  getQuestionLoading?: boolean;
  addCodingQuestion?: Question;
  addCodingQuestionError?: any;
  addCodingQuestionLoading?: boolean;
}
