import React, { useEffect } from 'react';
import { RootState } from 'redux/store';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { TestForm, AdminLayout, SideLoading } from 'components/Reusable';
import {
  getSingleTestAction,
  updateTestAction,
  clearTest
} from 'redux/actions/testsetup';
import { Alert } from '@material-ui/lab';

const UpdateTest = () => {
  const params = useParams<{ testId: string }>();
  const dispatch = useDispatch();

  const reducer = useSelector((state: RootState) => {
    const {
      updateTest,
      updateTestLoading,
      updateTestErrors,
      getSingleTest,
      getSingleTestLoading,
      getSingleTestErrors
    } = state.tests;

    const { message } = state.messages;

    return {
      loading: updateTestLoading,
      updateTest,
      updateTestErrors,
      getSingleTest,
      message,
      getSingleTestLoading,
      getSingleTestErrors
    };
  });

  const {
    getSingleTest,
    message,
    updateTestErrors,
    updateTest,
    loading,
    getSingleTestLoading,
    getSingleTestErrors
  } = reducer;

  const { testId } = params;

  useEffect(() => {
    clearTest()(dispatch);
    getSingleTestAction(testId)(dispatch);
  }, [dispatch, testId]);

  if (getSingleTestLoading) {
    return (
      <AdminLayout>
        <div style={{ marginTop: 200 }}>
          <SideLoading />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {getSingleTestErrors && getSingleTestErrors.message && (
        <Alert severity="error">{getSingleTestErrors.message}</Alert>
      )}
      {getSingleTest && getSingleTest._id && (
        <TestForm
          saveButtonName="Update"
          cancelButtonName="Cancel"
          initialValues={{
            name: getSingleTest.name,
            description: getSingleTest.description,
            timePolicy: getSingleTest.timePolicy
          }}
          onSubmit={values => updateTestAction(values, testId)(dispatch)}
          message={message}
          successData={updateTest}
          loading={loading}
          errorData={updateTestErrors}
        />
      )}
    </AdminLayout>
  );
};

export default UpdateTest;
