import { Test } from 'redux/actions/testsetup';

export interface TestsInitialStateType {
  getAllTestLoading?: boolean;
  getAllTestErrors?: any;
  createTestErrors?: any;
  tests?: Test[];
  createTest?: Test;
  createTestLoading?: boolean;
}
