import { Level, QuestionTypeEnum } from 'redux/action-types/question';

export interface Question {
  testId: string;
  name: string;
  expectedTime: string;
  dateRegistered?: Date;
  updatedAt?: Date;
  choice?: string[];
  solution?: string[];
  level: Level;
  questionType: QuestionTypeEnum;
  coding?: {
    template: string;
    testCase: string;
  };
  language: string;
  library?: string;
}

export interface VideoQuestionParamType {
  name: string;
  question: string;
  solution: string[];
  level: string;
  expectedTime: string;
}

export interface McQuestionParamType {
  name: string;
  language: string;
  library?: string;
  solution: string[];
  choice: string[];
  testId: string;
  level: string;
  expectedTime: string;
  question: string;
}
