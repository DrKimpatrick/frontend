import { TestTypes, TestActionTypes } from 'redux/action-types/test';
import { TestsInitialStateType } from './interface';

const initialState: TestsInitialStateType = {};

export const testReducer = (state = initialState, action: TestActionTypes) => {
  switch (action.type) {
    case TestTypes.GetAllTest:
      return {
        ...state,
        tests: action.payload.data
      };

    case TestTypes.GetAllTestLoading:
      return { ...state, getAllTestLoading: action.payload.loading };

    case TestTypes.GetAllTestErrors:
      return { ...state, getAllTestErrors: action.payload.errors };

    case TestTypes.CreateTestSuccess:
      return { ...state, createTest: action.payload.data };

    case TestTypes.CreateTestLoading:
      return { ...state, createTestLoading: action.payload.loading };

    case TestTypes.CreateTestErrors:
      return { ...state, createTestErrors: action.payload.errors };

    default:
      return state;
  }
};
