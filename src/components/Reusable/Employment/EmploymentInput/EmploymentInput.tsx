import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, FieldArray } from 'formik';
import { Button, Checkbox } from '@material-ui/core';
import { ArrowRightAltTwoTone, Close, AddOutlined } from '@material-ui/icons';
import Select from 'react-select';
import { map, get } from 'lodash';
import { listUserSkill } from 'redux/actions/skill';
import { RootState } from 'redux/store';
import {
  employmentSchema,
  InitialEmploymentValue as InitialValue
} from './Schema';

interface Props {
  initialValue: InitialValue;
  submit: (values: InitialValue) => void;
  backendErrors: any;
  loading: boolean;
  buttonName: string;
}

export const options = [
  { value: 'Software Engineer', label: 'Software Engineer' },
  { value: 'Product Manager', label: 'Product Manager' },
  { value: 'Product Designer', label: 'Product Designer' },
  { value: 'Software Engineer1', label: 'Software Engineer1' },
  { value: 'Product Manager1', label: 'Product Manager1' },
  { value: 'Product Designer1', label: 'Product Designer1' },
  { value: 'Software Engineer2', label: 'Software Engineer2' },
  { value: 'Product Manager2', label: 'Product Manager2' },
  { value: 'Product Designer2', label: 'Product Designer2' }
];

const EmploymentInput: FC<Props> = props => {
  const { submit, initialValue, backendErrors, loading, buttonName } = props;

  const dispatch = useDispatch();

  const reducer = useSelector((state: RootState) => {
    const { user } = state.users;

    const { userSkill } = state.skills;

    return { userSkill, user };
  });
  const { user, userSkill } = reducer;

  useEffect(() => {
    if (user) {
      listUserSkill()(dispatch);
    }
  }, [dispatch, user]);

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

  const setDefaultSkills = (skills: any) => {
    const data: any = [];

    if (userSkill && userSkill.length > 0 && skills.length > 0) {
      map(userSkill, item => {
        map(skills, skill => {
          if (item._id === skill._id) {
            data.push({ value: item._id, label: item.skill.skill });
          }
        });
        return undefined;
      });
    }
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
            <div className="text-gray-texts mt-8">
              <input
                type="text"
                className="border outline-none bg-transparent rounded-sm w-full px-3 text-gray-texts input-height"
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

            <div className="text-gray-texts mt-4">
              <Select
                options={[
                  { value: 'Staffing', label: 'Staffing' },
                  { value: 'Employee', label: 'Employee' },
                  { value: 'HR', label: 'HR' }
                ]}
                placeholder="Select your supervisor"
                name="supervisor.name"
                onChange={v => {
                  formik.setFieldValue(
                    'supervisor.name',
                    (v as any).value,
                    true
                  );
                  formik.setFieldValue('showDetail', true);
                  formik.setFieldValue('currentSupervisor', (v as any).label);
                }}
                values={
                  values.supervisor.name !== ''
                    ? { value: values.supervisor, label: values.supervisor }
                    : null
                }
                isMulti={false}
                styles={{
                  control: base => ({ ...base, border: 0, boxShadow: 'none' })
                }}
                className="select"
                defaultValue={
                  values.supervisor.name !== ''
                    ? {
                        value: values.supervisor.name,
                        label: values.supervisor.name
                      }
                    : null
                }
              />
              {errors && errors.supervisor && errors.supervisor.name && (
                <div className="inputError">{errors.supervisor.name}</div>
              )}
              {!errors || (!errors.supervisor && getErrors('supervisor'))}
              {!errors || (!errors.supervisor && getErrors('supervisor.name'))}
            </div>
            {values.showDetail && (
              <>
                <div className="text-gray-texts mt-4">
                  <input
                    type="text"
                    className="border outline-none bg-transparent rounded w-full px-3 text-gray-texts input-height"
                    placeholder={`${values.currentSupervisor} name`}
                    value={get(values.supervisor.detail, 'name', '')}
                    onChange={formik.handleChange}
                    name="supervisor.detail.name"
                  />
                  {errors &&
                    errors.supervisor &&
                    errors.supervisor.detail &&
                    errors.supervisor.detail.name && (
                      <div className="inputError">
                        {errors.supervisor.detail.name}
                      </div>
                    )}
                  {!errors ||
                    (!errors.supervisor && getErrors('supervisor.detail.name'))}
                </div>
                <div className="text-gray-texts mt-4">
                  <input
                    type="text"
                    className="border outline-none bg-transparent rounded w-full px-3 text-gray-texts input-height"
                    placeholder={`${values.currentSupervisor} email`}
                    value={get(values.supervisor.detail, 'email', '')}
                    onChange={formik.handleChange}
                    name="supervisor.detail.email"
                  />
                  {errors &&
                    errors.supervisor &&
                    errors.supervisor.detail &&
                    errors.supervisor.detail.email && (
                      <div className="inputError">
                        {errors.supervisor.detail.email}
                      </div>
                    )}

                  {!errors ||
                    (!errors.supervisor &&
                      getErrors('supervisor.detail.email'))}
                </div>
                <div className="text-gray-texts mt-4">
                  <input
                    type="text"
                    className="border outline-none bg-transparent rounded w-full px-3 text-gray-texts input-height"
                    placeholder={`${values.currentSupervisor} phone number`}
                    value={get(values.supervisor.detail, 'phoneNumber', '')}
                    onChange={formik.handleChange}
                    name="supervisor.detail.phoneNumber"
                  />
                  {errors &&
                    errors.supervisor &&
                    errors.supervisor.detail &&
                    errors.supervisor.detail.phoneNumber && (
                      <div className="inputError">
                        {errors.supervisor.detail.phoneNumber}
                      </div>
                    )}
                  {!errors ||
                    (!errors.supervisor &&
                      getErrors('supervisor.detail.phoneNumber'))}
                </div>
              </>
            )}

            <div className="text-gray-texts mt-4">
              <input
                type="text"
                className="border outline-none bg-transparent rounded w-full px-3 text-gray-texts input-height"
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

            <div className="flex justify-between text-gray-texts mt-4 dateContainer">
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

              {values.isCurrentPosition === false && (
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
              className="text-gray-texts flex"
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
              className="text-gray-texts flex"
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
            {userSkill && userSkill.length > 0 && (
              <div className="text-gray-texts mt-4">
                <Select
                  isMulti
                  options={userSkill.map(item => ({
                    value: item._id,
                    label: item.skill.skill
                  }))}
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
            )}

            <FieldArray
              name="responsibilities"
              render={arrayHelper => {
                const { responsibilities, responsibility } = values;

                return (
                  <div
                    className="text-gray-texts mt-4 divider"
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
                        className="outline-none bg-transparent rounded w-full px-3 text-gray-texts input-height"
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
                    className="text-gray-texts mt-4 divider"
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
                        className="outline-none bg-transparent rounded w-full px-3 text-gray-texts input-height"
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

            <div className="text-gray-texts mt-4">
              <input
                type="text"
                className="border outline-none bg-transparent rounded w-full px-3 text-gray-texts input-height"
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
