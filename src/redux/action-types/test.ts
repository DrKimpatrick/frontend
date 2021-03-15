import { Test } from 'redux/actions/testsetup';

export enum TestTypes {
  GetAllTest = 'TestTypes/GetAllTest',
  GetAllTestLoading = 'TestTypes/GetAllTestLoading',
  GetAllTestErrors = 'TestTypes/GetAllTestsErrors',
  CreateTestSuccess = 'TestTypes/CreateTest',
  CreateTestLoading = 'TestTypes/CreateTestLoading',
  CreateTestErrors = 'TestTypes/CreateTestErrors',
  UpdateTestSuccess = 'TestTypes/UpdateTest',
  UpdateTestLoading = 'TestTypes/UpdateTestLoading',
  UpdateTestErrors = 'TestTypes/UpdateTestErrors',
  GetSingleTestSuccess = 'TestTypes/GetSingleTest',
  GetSingleTestLoading = 'TestTypes/GetSingleTestLoading',
  GetSingleTestErrors = 'TestTypes/GetSingleTestsErrors',
  ClearTest = 'TestTypes/ClearTest'
}

export enum TimePolicy {
  Normal = 'Normal',
  Strict = 'Strict',
  Relaxed = 'Relaxed'
}

export enum TestVerification {
  Verified = 'Verified',
  Unverified = 'Unverified'
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
interface UpdateTestSuccess {
  type: typeof TestTypes.UpdateTestSuccess;
  payload: {
    data: Test;
  };
}
interface UpdateTestLoading {
  type: typeof TestTypes.UpdateTestLoading;
  payload: {
    loading: boolean;
  };
}
interface UpdateTestErrors {
  type: typeof TestTypes.UpdateTestErrors;
  payload: {
    errors: any;
  };
}

interface GetSingleTestSuccess {
  type: typeof TestTypes.GetSingleTestSuccess;
  payload: {
    data: Test;
  };
}
interface GetSingleTestLoading {
  type: typeof TestTypes.GetSingleTestLoading;
  payload: {
    loading: boolean;
  };
}
interface GetSingleTestErrors {
  type: typeof TestTypes.GetSingleTestErrors;
  payload: {
    errors: any;
  };
}

interface ClearTest {
  type: typeof TestTypes.ClearTest;
  payload: {
    data: Test;
  };
}
export type TestActionTypes =
  | GetAllTest
  | GetAllTestLoading
  | GetAllTestErrors
  | CreateTestSuccess
  | CreateTestLoading
  | CreateTestErrors
  | UpdateTestSuccess
  | UpdateTestLoading
  | UpdateTestErrors
  | GetSingleTestSuccess
  | GetSingleTestLoading
  | GetSingleTestErrors
  | ClearTest;
