import { Test } from 'redux/actions/testsetup';

export enum TestTypes {
  GetAllTest = 'TestTypes/GetAllTest',
  GetAllTestLoading = 'TestTypes/GetAllTestLoading',
  GetAllTestErrors = 'TestTypes/GetAllTestsErrors',
  CreateTestSuccess = 'TestTypes/CreateTest',
  CreateTestLoading = 'TestTypes/CreateTestLoading',
  CreateTestErrors = 'TestTypes/CreateTestErrors'
}

interface GetAllTest {
  type: typeof TestTypes.GetAllTest;
  payload: {
    data: Test[];
  };
}

interface GetAllTestLoading {
  type: typeof TestTypes.GetAllTestLoading;
  payload: {
    loading: boolean;
  };
}

interface GetAllTestErrors {
  type: typeof TestTypes.GetAllTestErrors;
  payload: {
    errors: any;
  };
}

interface CreateTestSuccess {
  type: typeof TestTypes.CreateTestSuccess;
  payload: {
    data: Test;
    message: string;
  };
}
interface CreateTestLoading {
  type: typeof TestTypes.CreateTestLoading;
  payload: {
    loading: boolean;
  };
}

interface CreateTestErrors {
  type: typeof TestTypes.CreateTestErrors;
  payload: {
    errors: any;
  };
}
export type TestActionTypes =
  | GetAllTest
  | GetAllTestLoading
  | GetAllTestErrors
  | CreateTestSuccess
  | CreateTestLoading
  | CreateTestErrors;
