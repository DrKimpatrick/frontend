import { Test } from 'redux/actions/testsetup';

export interface TestsInitialStateType {
  getAllTestLoading?: boolean;
  getAllTestErrors?: any;
  createTestErrors?: any;
  tests?: Test[];
  getSingleTest?: Test;
  getSingleTestLoading?: boolean;
  getSingleTestErrors?: any;
  createTest?: Test;
  createTestLoading?: boolean;
  updateTest?: Test;
  updateTestLoading?: boolean;
  updateTestErrors?: any;
}
