import { Level, QuestionTypeEnum } from 'redux/action-types/question';

export interface Question {
  _id: string;
  name: string;
  expectedTime: string;
  dateRegistered?: Date;
  updatedAt?: Date;
  choice?: string[];
  solution?: string[];
  level: Level;
  testId: string;
  questionType: QuestionTypeEnum;
  coding?: {
    template: string;
    testCase: string;
  };
  language: string;
  library?: string;
}
