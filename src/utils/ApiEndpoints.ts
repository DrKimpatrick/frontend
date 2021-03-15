import { PaginationValueType } from 'redux/actions/question';

export const ApiEndPoint = {
  addMcqQuestion: `/question/mcq`,

  deleteQuestion: (questionId: string) => `/question/mcq/${questionId}`,

  UploadVideo: '/upload/video',

  test: '/test',

  filterQuestion: (status: string, pagination?: PaginationValueType) => {
    if (pagination) {
      return `/question/filter/${status}/?limit=${pagination.limit}&page=${pagination.page}`;
    }
    return '/question/filter/Verified';
  },

  addVideoQuestion: '/question/video',

  singleTest: (testId: string) => `/test/${testId}`,

  updateTest: (testId: string) => `/test/${testId}`
};
