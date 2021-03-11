export const ApiEndPoint = {
  addMcqQuestion: `/question/mcq`,

  deleteQuestion: (questionId: string) => `/question/mcq/${questionId}`,

  UploadVideo: '/upload/video',

  test: '/test',

  verifiedQuestions: '/question/filter/Verified',

  addVideoQuestion: '/question/video'
};
