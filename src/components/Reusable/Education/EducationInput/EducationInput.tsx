import React, { FC } from 'react';
import { Formik, FieldArray } from 'formik';
import { Button, Checkbox } from '@material-ui/core';
import { ArrowRightAltTwoTone, Close, AddOutlined } from '@material-ui/icons';
import { map } from 'lodash';
import {
  educationSchema,
  InitialEducationValue as InitialValue
} from './Schema';

interface Props {
  initialValue: InitialValue;
  submit: (values: InitialValue) => void;
  backendErrors: any;
  loading: boolean;
  buttonName: string;
}

const EducationInput: FC<Props> = props => {
  const { submit, initialValue, backendErrors, loading, buttonName } = props;

  const getErrors = (field: string) => {
    if (
      backendErrors &&
      Array.isArray(backendErrors) &&
      backendErrors.length > 0 &&
      map(backendErrors, field)
    ) {
      return (
        <>
          {map(map(backendErrors, field), (item, i) => (
            <div key={i} className="inputError">
              {item}
            </div>
          ))}
        </>
      );
    }
    return null;
  };

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={educationSchema}
      validateOnChange={false}
      onSubmit={values => {
        return submit({
          ...values
        });
      }}
    >
      {formik => {
        const { values, errors } = formik;

        return (
          <form autoComplete="off" onSubmit={formik.handleSubmit}>
            <div className="text-textGray mt-8">
              <input
                type="text"
                className="border outline-none bg-transparent rounded-sm w-full px-3 text-textGray input-height"
                placeholder="School Name"
                name="schoolName"
                value={values.schoolName}
                onChange={formik.handleChange}
              />
              {errors && errors.schoolName && (
                <div className="inputError">{errors.schoolName}</div>
              )}
              {!errors || (!errors.schoolName && getErrors('schoolName'))}
            </div>

            <div className="text-textGray mt-4">
              <input
                type="text"
                className="border outline-none bg-transparent rounded w-full px-3 text-textGray input-height"
                placeholder="Level"
                value={values.level}
                onChange={formik.handleChange}
                name="level"
              />
              {errors && errors.level && (
                <div className="inputError">{errors.level}</div>
              )}
              {!errors || (!errors.level && getErrors('level'))}
            </div>

            <div className="text-textGray mt-4">
              <input
                type="text"
                className="border outline-none bg-transparent rounded w-full px-3 text-textGray input-height"
                placeholder="Degree or Certification Received"
                value={values.degreeOrCertification}
                onChange={formik.handleChange}
                name="degreeOrCertification"
              />
              {errors && errors.degreeOrCertification && (
                <div className="inputError">{errors.degreeOrCertification}</div>
              )}
              {!errors ||
                (!errors.degreeOrCertification &&
                  getErrors('degreeOrCertification'))}
            </div>

            <div className="flex justify-between text-textGray mt-4 dateContainer">
              <div className="item w-full h-full pt-2 mt-2">
                <label htmlFor="start date">Start date</label>
                <input
                  id="date"
                  type="date"
                  name="startDate"
                  onChange={formik.handleChange}
                  value={values.startDate}
                />
              </div>

              {values.isCurrentEducation === false && (
                <div className="item w-full h-full pt-2 mt-2">
                  <label htmlFor="end date">End date</label>
                  <input
                    id="date"
                    type="date"
                    name="endDate"
                    onChange={formik.handleChange}
                    value={values.endDate}
                  />
                </div>
              )}
            </div>
            <div
              className="text-textGray flex"
              style={{ alignItems: 'center' }}
            >
              <div style={{ flexGrow: 1, width: '50%' }}>
                {errors && errors.startDate && (
                  <div className="inputError">{errors.startDate}</div>
                )}

                {!errors || (!errors.startDate && getErrors('startDate'))}
              </div>
              <div style={{ flexGrow: 1, width: '50%' }}>
                {errors && errors.endDate && (
                  <div className="inputError">{errors.endDate}</div>
                )}
                {!errors || (!errors.endDate && getErrors('endDate'))}
              </div>
            </div>
            <div
              className="text-textGray flex"
              style={{ alignItems: 'center' }}
            >
              <Checkbox
                inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
                name="isCurrentEducation"
                onChange={formik.handleChange}
                checked={values.isCurrentEducation}
              />
              <label htmlFor="">I am currently studying here</label>
            </div>
            <FieldArray
              name="specializations"
              render={arrayHelper => {
                const { specializations, specialization } = values;

                return (
                  <div
                    className="text-textGray mt-4 divider"
                    style={
                      specializations && specializations.length > 0
                        ? {
                            border: '1px solid #dadada',
                            padding: 5
                          }
                        : { border: 'none' }
                    }
                  >
                    {specializations &&
                      specializations.length > 0 &&
                      specializations.map((item, index) => (
                        <div className="responsibilities" key={index}>
                          <div className="item">{item}</div>
                          <Button
                            type="button"
                            onClick={() => arrayHelper.remove(index)}
                          >
                            <Close />
                          </Button>
                        </div>
                      ))}
                    <div className="responsibilities addBorder">
                      <input
                        type="text"
                        placeholder="Specializations"
                        className="outline-none bg-transparent rounded w-full px-3 text-textGray input-height"
                        name="specialization"
                        value={values.specialization}
                        onChange={formik.handleChange}
                      />
                      <Button
                        type="button"
                        className="add"
                        onClick={() => {
                          if (
                            specialization.length !== 0 &&
                            typeof specialization === 'string'
                          ) {
                            arrayHelper.push(values.specialization);
                            formik.setFieldValue('specialization', '', false);
                          }
                        }}
                      >
                        <AddOutlined />
                      </Button>
                    </div>
                    {getErrors('specializations')}
                    {errors && errors.specializations && (
                      <div className="inputError">{errors.specializations}</div>
                    )}
                  </div>
                );
              }}
            />

            <FieldArray
              name="accomplishments"
              render={arrayHelper => {
                const { accomplishments, accomplishment } = values;

                return (
                  <div
                    className="text-textGray mt-4 divider"
                    style={
                      accomplishments && accomplishments.length > 0
                        ? {
                            border: '1px solid #dadada',
                            padding: 5
                          }
                        : { border: 'none' }
                    }
                  >
                    {accomplishments &&
                      accomplishments.length > 0 &&
                      accomplishments.map((item, index) => (
                        <div className="responsibilities" key={index}>
                          <div className="item">{item}</div>
                          <Button
                            type="button"
                            onClick={() => arrayHelper.remove(index)}
                          >
                            <Close />
                          </Button>
                        </div>
                      ))}
                    <div className="responsibilities addBorder">
                      <input
                        type="text"
                        placeholder="Accomplishments"
                        className="outline-none bg-transparent rounded w-full px-3 text-textGray input-height"
                        name="accomplishment"
                        value={values.accomplishment}
                        onChange={formik.handleChange}
                      />
                      <Button
                        type="button"
                        className="add"
                        onClick={() => {
                          if (
                            accomplishment.length !== 0 &&
                            typeof accomplishment === 'string'
                          ) {
                            arrayHelper.push(values.accomplishment);
                            formik.setFieldValue('accomplishment', '', false);
                          }
                        }}
                      >
                        <AddOutlined />
                      </Button>
                    </div>
                    {getErrors('accomplishments')}
                  </div>
                );
              }}
            />

            <div className="flex justify-center mt-12">
              <button
                data-testid="next-button"
                className="next-btn text-white hover:bg-gray-800 font-semibold py-1 px-3 w-32 rounded-sm shadow flex justify-around"
                type="submit"
                disabled={loading}
              >
                <span className="">{buttonName}</span> <ArrowRightAltTwoTone />
              </button>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default EducationInput;
