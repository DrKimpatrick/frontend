import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, FieldArray } from 'formik';
import { Button, Checkbox } from '@material-ui/core';
import { ArrowRightAltTwoTone, Close, AddOutlined } from '@material-ui/icons';
import Select from 'react-select';
import { map, get, omit } from 'lodash';
import { listUserSkill } from 'redux/actions/skill';
import { RootState } from 'redux/store';
import { CustomSelect, Loader, isEmpty } from 'components/Reusable';
import {
  Supervisor,
  EmploymentType,
  EmploymentReference
} from 'redux/action-types/employment';
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
            : [],
        reference: initialValue.reference
          ? initialValue.reference
          : {
              name: '',
              detail: {
                name: '',
                email: '',
                phoneNumber: ''
              }
            },
        showReference: initialValue.showReference
          ? initialValue.showReference
          : false,
        showReferenceDetail: initialValue.showReferenceDetail
          ? initialValue.showReferenceDetail
          : false,
        currentReference: get(initialValue, 'currentReference', '')
      }}
      validationSchema={employmentSchema}
      validateOnChange={false}
      onSubmit={values => {
        const skillsUsed = map(values.skillsUsed, 'value') as string[];

        let changeValue: any = values;

        if (
          (values.supervisor && values.supervisor.name === Supervisor.NA) ||
          (values.supervisor && values.supervisor.name === '')
        ) {
          const newValue = omit(values, ['supervisor']);
          changeValue = newValue;
        }

        if (
          isEmpty(values.reference.name) ||
          isEmpty(values.reference.detail.name) ||
          isEmpty(values.reference.detail.email) ||
          isEmpty(values.reference.detail.phoneNumber)
        ) {
          changeValue = omit(values, ['reference']);
        }
        submit({
          ...changeValue,
          skillsUsed
        });
      }}
    >
      {formik => {
        const { values, errors } = formik;

        return (
          <form autoComplete="off" onSubmit={formik.handleSubmit}>
            <div className="text-gray-texts mt-2">
              <input
                type="text"
                className="border outline-none bg-transparent rounded-sm w-full px-3 text-gray-texts input-height"
                placeholder="Company Name *"
                name="companyName"
                value={values.companyName}
                onChange={formik.handleChange}
              />
              {errors && errors.companyName && (
                <div className="inputError">{errors.companyName}</div>
              )}
              {!errors || (!errors.companyName && getErrors('companyName'))}
            </div>
            <div className="text-gray-texts mt-2">
              <CustomSelect
                name="employmentType"
                option={Object.values(EmploymentType).map(item => ({
                  name: item,
                  value: item
                }))}
                placeholder="Employment type *"
                value={values.employmentType}
                onChange={value =>
                  formik.setFieldValue('employmentType', value, true)
                }
              />
              {errors && errors.employmentType && (
                <div className="inputError">{errors.employmentType}</div>
              )}
              {!errors ||
                (!errors.employmentType && getErrors('employmentType'))}
            </div>

            <div className="text-gray-texts mt-2">
              <CustomSelect
                option={Object.values(Supervisor).map(item => ({
                  name: item,
                  value: item
                }))}
                placeholder="Employment Reference *"
                onChange={value => {
                  formik.setFieldValue('supervisor.name', value, true);
                  if (value === Supervisor.NA) {
                    formik.setFieldValue('showReference', true);
                    formik.setFieldValue('showDetail', false);
                  } else {
                    formik.setFieldValue('showDetail', true);
                    formik.setFieldValue('currentSupervisor', value);
                    formik.setFieldValue('showReference', false);
                    formik.setFieldValue('showReferenceDetail', false);
                    formik.setFieldValue('reference', {
                      name: '',
                      detail: {
                        name: '',
                        email: '',
                        phoneNumber: ''
                      }
                    });
                  }
                }}
                name="supervisor.name"
                value={get(values.supervisor, 'name', '')}
              />
              {getErrors('supervisor')}
            </div>
            {values.showDetail && values.supervisor && (
              <>
                <div className="text-gray-texts mt-2">
                  <input
                    type="text"
                    className="border outline-none bg-transparent rounded w-full px-3 text-gray-texts input-height"
                    placeholder={`${values.currentSupervisor} name *`}
                    value={get(values.supervisor.detail, 'name', '')}
                    onChange={formik.handleChange}
                    name="supervisor.detail.name"
                  />
                </div>
                <div className="text-gray-texts mt-2">
                  <input
                    type="text"
                    className="border outline-none bg-transparent rounded w-full px-3 text-gray-texts input-height"
                    placeholder={`${values.currentSupervisor} email *`}
                    value={get(values.supervisor.detail, 'email', '')}
                    onChange={formik.handleChange}
                    name="supervisor.detail.email"
                  />
                </div>
                <div className="text-gray-texts mt-2">
                  <input
                    type="text"
                    className="border outline-none bg-transparent rounded w-full px-3 text-gray-texts input-height"
                    placeholder={`${values.currentSupervisor} phone number *`}
                    value={get(values.supervisor.detail, 'phoneNumber', '')}
                    onChange={formik.handleChange}
                    name="supervisor.detail.phoneNumber"
                  />
                </div>
              </>
            )}

            <div className="text-gray-texts mt-2">
              <input
                type="text"
                className="border outline-none bg-transparent rounded w-full px-3 text-gray-texts input-height"
                placeholder="Your Title *"
                value={values.title}
                onChange={formik.handleChange}
                name="title"
              />
              {errors && errors.title && (
                <div className="inputError">{errors.title}</div>
              )}
              {!errors || (!errors.title && getErrors('title'))}
            </div>

            <div className="flex justify-between text-gray-texts dateContainer">
              <div className="item w-full h-full pt-1 pb-1 required">
                <label className="required" htmlFor="start date">Start date *</label>
                <input
                  id="date"
                  type="date"
                  name="startDate"
                  onChange={formik.handleChange}
                  value={values.startDate}
                />
              </div>

              {values.isCurrentPosition === false && (
                <div className="item w-full h-full pt-1 pb-1">
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

            {values.showReference && (
              <div className="text-gray-texts mt-2">
                <CustomSelect
                  option={Object.values(EmploymentReference).map(item => ({
                    name: item,
                    value: item
                  }))}
                  placeholder="Reference"
                  onChange={value => {
                    formik.setFieldValue('reference.name', value, true);
                    formik.setFieldValue('showReferenceDetail', true);
                    formik.setFieldValue('currentReference', value);
                  }}
                  name="reference.name"
                  value={values.reference.name}
                />
                {getErrors('reference')}
              </div>
            )}

            {values.showReferenceDetail && values.reference && (
              <>
                <div className="text-gray-texts mt-2">
                  <input
                    type="text"
                    className="border outline-none bg-transparent rounded w-full px-3 text-gray-texts input-height"
                    placeholder={`${values.currentReference} name`}
                    value={get(values.reference.detail, 'name', '')}
                    onChange={formik.handleChange}
                    name="reference.detail.name"
                  />
                </div>
                <div className="text-gray-texts mt-2">
                  <input
                    type="text"
                    className="border outline-none bg-transparent rounded w-full px-3 text-gray-texts input-height"
                    placeholder={`${values.currentReference} email`}
                    value={get(values.reference.detail, 'email', '')}
                    onChange={formik.handleChange}
                    name="reference.detail.email"
                  />
                </div>
                <div className="text-gray-texts mt-2">
                  <input
                    type="text"
                    className="border outline-none bg-transparent rounded w-full px-3 text-gray-texts input-height"
                    placeholder={`${values.currentReference} phone number`}
                    value={get(values.reference.detail, 'phoneNumber', '')}
                    onChange={formik.handleChange}
                    name="reference.detail.phoneNumber"
                  />
                </div>
              </>
            )}

            {userSkill && userSkill.length > 0 && (
              <div className="text-gray-texts mt-2">
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
                    className="text-gray-texts mt-2 divider"
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
                    className="text-gray-texts mt-2 divider"
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

            <div className="text-gray-texts mt-2">
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
                <Loader
                  loading={loading}
                  command={
                    <>
                      <span>{buttonName}</span> <ArrowRightAltTwoTone />
                    </>
                  }
                />
              </button>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default EmploymentInput;
