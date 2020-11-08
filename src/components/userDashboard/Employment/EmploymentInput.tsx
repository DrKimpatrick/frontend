import React, { FC } from 'react';
import { Formik, FieldArray } from 'formik';
import { Button, Checkbox } from '@material-ui/core';
import { ArrowRightAltTwoTone, Close, AddOutlined } from '@material-ui/icons';
import Select from 'react-select';
import { map } from 'lodash';
import { options } from '../../RecentEmployer/RecentEmployer';
import { employmentSchema, InitialValue } from '.';

interface Props {
  initialValue: InitialValue;
  submit: (values: InitialValue) => void;
  backendErrors: any;
  loading: boolean;
  buttonName: string;
}

const EmploymentInput: FC<Props> = props => {
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

  const setDefaultSkills = (skills: string[]) => {
    const data = map(skills, item => ({
      label: item,
      value: item
    }));

    return data;
  };

  return (
    <Formik
      initialValues={{
        ...initialValue,
        skillsUsed:
          initialValue.skillsUsed.length > 0
            ? setDefaultSkills(initialValue.skillsUsed)
            : []
      }}
      validationSchema={employmentSchema}
      validateOnChange={false}
      onSubmit={values => {
        const skillsUsed = map(values.skillsUsed, 'value') as string[];

        return submit({
          ...values,
          skillsUsed
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
                placeholder="Company Name"
                name="companyName"
                value={values.companyName}
                onChange={formik.handleChange}
              />
              {errors && errors.companyName && (
                <div className="inputError">{errors.companyName}</div>
              )}
              {!errors || (!errors.companyName && getErrors('companyName'))}
            </div>

            <div className="text-textGray mt-4">
              <Select
                options={[
                  { value: 'Staffing', label: 'Staffing' },
                  { value: 'Employee', label: 'Employee' },
                  { value: 'HR', label: 'HR' }
                ]}
                placeholder="Select your supervisor"
                name="supervisor"
                onChange={v =>
                  formik.setFieldValue('supervisor', (v as any).value, true)
                }
                values={
                  values.supervisor !== ''
                    ? { value: values.supervisor, label: values.supervisor }
                    : null
                }
                isMulti={false}
                styles={{
                  control: base => ({ ...base, border: 0, boxShadow: 'none' })
                }}
                className="select"
                defaultValue={
                  values.supervisor !== ''
                    ? { value: values.supervisor, label: values.supervisor }
                    : null
                }
              />
              {errors && errors.supervisor && (
                <div className="inputError">{errors.supervisor}</div>
              )}
              {!errors || (!errors.supervisor && getErrors('supervisor'))}
            </div>
            <div className="text-textGray mt-4">
              <input
                type="text"
                className="border outline-none bg-transparent rounded w-full px-3 text-textGray input-height"
                placeholder="Your Title"
                value={values.title}
                onChange={formik.handleChange}
                name="title"
              />
              {errors && errors.title && (
                <div className="inputError">{errors.title}</div>
              )}
              {!errors || (!errors.title && getErrors('title'))}
            </div>

            <div className="flex justify-between text-textGray mt-4 dateContainer">
              <div className="item">
                <label htmlFor="start date">Start date</label>
                <input
                  id="date"
                  type="date"
                  name="startDate"
                  onChange={formik.handleChange}
                  value={values.startDate}
                />
              </div>

              {values.isCurrentPosition === false && (
                <div className="item">
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
                name="isCurrentPosition"
                onChange={formik.handleChange}
                checked={values.isCurrentPosition}
              />
              <label htmlFor="">I am currently working here</label>
            </div>

            <div className="text-textGray mt-4">
              <Select
                isMulti
                options={options}
                placeholder="Select skills used"
                name="skillsUsed"
                onChange={e => {
                  formik.setFieldValue('skillsUsed', e, false);
                }}
                value={values.skillsUsed}
                styles={{
                  control: base => ({ ...base, border: 0, boxShadow: 'none' })
                }}
                className="select"
              />

              {!errors || (!errors.skillsUsed && getErrors('skillsUsed'))}
            </div>
            <FieldArray
              name="responsibilities"
              render={arrayHelper => {
                const { responsibilities, responsibility } = values;

                return (
                  <div
                    className="text-textGray mt-4 divider"
                    style={
                      responsibilities && responsibilities.length > 0
                        ? {
                            border: '1px solid #dadada',
                            padding: 5
                          }
                        : { border: 'none' }
                    }
                  >
                    {responsibilities &&
                      responsibilities.length > 0 &&
                      responsibilities.map((item, index) => (
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
                        placeholder="Responsibilities"
                        className="outline-none bg-transparent rounded w-full px-3 text-textGray input-height"
                        name="responsibility"
                        value={values.responsibility}
                        onChange={formik.handleChange}
                      />
                      <Button
                        type="button"
                        className="add"
                        onClick={() => {
                          if (
                            responsibility.length !== 0 &&
                            typeof responsibility === 'string'
                          ) {
                            arrayHelper.push(values.responsibility);
                            formik.setFieldValue('responsibility', '', false);
                          }
                        }}
                      >
                        <AddOutlined />
                      </Button>
                    </div>
                    {getErrors('responsibilities')}
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

            <div className="text-textGray mt-4">
              <input
                type="text"
                className="border outline-none bg-transparent rounded w-full px-3 text-textGray input-height"
                placeholder="Favorite project you built or contributed to?"
                name="favoriteProject"
                value={values.favoriteProject}
                onChange={formik.handleChange}
              />
            </div>

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

export default EmploymentInput;
