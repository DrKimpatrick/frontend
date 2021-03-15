import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'redux/store';
import { TestForm, AdminLayout } from 'components/Reusable';
import { createTestAction } from 'redux/actions/testsetup';

const initialValues = {
  name: '',
  description: '',
  timePolicy: ''
};

const CreateTest = () => {
  const dispatch = useDispatch();

  const reducer = useSelector((state: RootState) => {
    const { createTestLoading, createTest, createTestErrors } = state.tests;

    const { message } = state.messages;

    return {
      loading: createTestLoading,
      createTest,
      createTestErrors,
      message
    };
  });

  const { loading, createTest, createTestErrors, message } = reducer;

  return (
    <AdminLayout>
      <TestForm
        saveButtonName="Save"
        cancelButtonName="Cancel"
        initialValues={initialValues}
        onSubmit={values =>
          createTestAction({
            ...values
          })(dispatch)
        }
        message={message}
        successData={createTest}
        loading={loading}
        errorData={createTestErrors}
      />
    </AdminLayout>
  );
};

export default CreateTest;
