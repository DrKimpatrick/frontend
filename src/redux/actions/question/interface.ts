import { Level, QuestionTypeEnum } from 'redux/action-types/question';
import { TestVerification } from 'redux/action-types/test';

export interface Question {
  _id: string;
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
  status: TestVerification;
  owner: string | { _id: string; username: string; email: string };
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

export interface QuestionWithPaginationType {
  data: Question[];
  totalDocs: number;
  page: number;
}

export interface PaginationValueType {
  limit: number;
  page: number;
}
