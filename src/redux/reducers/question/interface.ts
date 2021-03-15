import { QuestionWithPaginationType } from 'redux/actions/question';

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
}
