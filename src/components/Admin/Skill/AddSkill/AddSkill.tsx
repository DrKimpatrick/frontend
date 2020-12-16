import React, { useState } from 'react';
import { Formik } from 'formik';
import { Modal } from '@material-ui/core';
import { ArrowRightAltTwoTone, ArrowBackTwoTone } from '@material-ui/icons';
import { addSkillSchema } from './Schema';
import './AddSkill.scss';

interface Props {
  initialValue: {
    skill: string;
  };
  close: () => void;
  buttonName: string;
  loading: boolean;
  submit: (values: { skill: string }) => void;
  title: string;
  apiError?: any;
}

export const AddSkill = (props: Props) => {
  const [open = true, setOpen] = useState<boolean>();
  const {
    initialValue,
    close,
    buttonName,
    loading,
    submit,
    title,
    apiError
  } = props;

  return (
    <Modal
      open={open}
      onClose={() => {
        close();
        setOpen(false);
      }}
      tabIndex={0}
      style={{
        zIndex: 100,
        outline: 'none'
      }}
      className="addSkillModal"
    >
      <div className="containers addSkill">
        <div className="flex relative h-auto flex-col">
          <div className="flex">
            <button
              className="back-arrow cursor-pointer"
              onClick={() => {
                close();
                setOpen(false);
              }}
              type="button"
              style={{ outline: 'none', border: 'none' }}
            >
              <ArrowBackTwoTone />
            </button>
            <h1 className="font-bold title mx-5 text-2xl">{title}</h1>
          </div>
          {apiError && apiError.message && (
            <div className="inputError text-sm">{apiError.message}</div>
          )}
          {apiError && apiError.error && (
            <div className="inputError text-sm">{apiError.error}</div>
          )}
        </div>
        <Formik
          initialValues={initialValue}
          validationSchema={addSkillSchema}
          onSubmit={value => submit(value)}
        >
          {formik => {
            const { errors, values } = formik;
            return (
              <form onSubmit={formik.handleSubmit} autoComplete="off">
                <div className="text-gray-texts mt-8">
                  <input
                    type="text"
                    className="border outline-none bg-transparent rounded-sm w-full px-3 text-gray-texts input-height"
                    placeholder="Skill"
                    name="skill"
                    value={values.skill}
                    onChange={formik.handleChange}
                  />
                  {errors && errors.skill && (
                    <div className="inputError text-sm">{errors.skill}</div>
                  )}
                  {apiError &&
                    apiError.errors &&
                    apiError.errors.map((item: any, index: number) => (
                      <div className="inputError text-sm" key={index}>
                        {item[`[${index}].skill`]}
                      </div>
                    ))}
                </div>
                <div className="flex justify-center mt-8">
                  <button
                    data-testid="next-button"
                    className="next-btn text-white hover:bg-gray-800 font-semibold py-1 px-3 w-32 rounded-sm shadow flex justify-around"
                    type="submit"
                    disabled={loading}
                  >
                    <span className="">{buttonName}</span>{' '}
                    <ArrowRightAltTwoTone />
                  </button>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </Modal>
  );
};

export default AddSkill;
