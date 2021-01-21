import React from 'react';
import { Formik } from 'formik';
import { AddItemOnModal } from 'components/Reusable';

export interface CourseInitialValue {
  name: string;
}
interface Props {
  initialValue: CourseInitialValue;
  onSubmit: (values: CourseInitialValue) => void;
  closeModal: () => void;
  title: string;
}

export const AddCourse = (props: Props) => {
  const { initialValue, closeModal, onSubmit, title } = props;

  return (
    <AddItemOnModal closeModal={closeModal} title={title}>
      <Formik
        onSubmit={values => onSubmit(values)}
        initialValues={initialValue}
      >
        {formik => {
          // const { errors, values } = formik;
          return <form onSubmit={formik.handleSubmit} autoComplete="off" />;
        }}
      </Formik>
    </AddItemOnModal>
  );
};

export default AddCourse;
