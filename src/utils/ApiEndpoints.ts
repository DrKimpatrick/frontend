import { PaginationValueType } from 'redux/actions/question';

export const ApiEndPoint = {
  AddMcqQuestion: `/question/mcq`,

  DeleteQuestion: (questionId: string) => `/question/mcq/${questionId}`,

  UploadVideo: '/upload/video',

  Test: '/test',

  FilterQuestion: (status: string, pagination?: PaginationValueType) => {
    if (pagination) {
      return `/question/filter/${status}/?limit=${pagination.limit}&page=${pagination.page}`;
    }
    return '/question/filter/Verified';
  },

  AddVideoQuestion: '/question/video',

  SingleTest: (testId: string) => `/test/${testId}`,

  UpdateTest: (testId: string) => `/test/${testId}`,

  EditVideoQuestion: (questionId?: string) => `/question/video/${questionId}`,

  GetQuestion: (questionId?: string) => `/question/${questionId}`,

  AddCodingQuestion: '/question/coding'
};
