import React, { useEffect, useState, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ArrowBackTwoTone, ArrowDropDown } from '@material-ui/icons';
import { RootState } from 'redux/store';
import { listSkill } from 'redux/actions/skill';
import { Skill, SkillLevel } from 'redux/action-types/skill';
import { Loader, SideLoading } from 'components/Reusable';
import { addUserSkillSchema } from './Schema';
import './AddUserSkill.scss';

interface InitialValueProps {
  skill: string;
  level: string;
  skillName: string;
}
interface Props {
  close: () => void;
  initialValue: InitialValueProps;
  buttonName: string;
  heading: string;
  submit: (values: InitialValueProps) => void;
  showSkill?: boolean;
}

const useStyles = makeStyles({
  backIcon: {
    color: '#747474',
    width: '3rem',
    height: '2rem'
  }
});

const AddUserSkill: FC<Props> = props => {
  const [open = true, setOpen] = useState<boolean>();

  const [loading = true, setLoading] = useState<boolean>();

  const [skillItem, setSkillItem] = useState<Skill[]>();

  const { close, initialValue, buttonName, heading, submit, showSkill } = props;

  const classes = useStyles();

  const dispatch = useDispatch();

  const reducer = useSelector((state: RootState) => {
    const { skills, loadingBtn, userSkillAction, errors } = state.skills;

    return {
      loading,
      skills,
      loadingBtn,
      userSkillAction,
      apiError: errors
    };
  });

  const { skills, loadingBtn, userSkillAction, apiError } = reducer;

  useEffect(() => {
    setLoading(true);
    listSkill()(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (skills || apiError) {
      setLoading(false);
    }
    if (skills && skills.length > 0) {
      setSkillItem(skills);
    }
  }, [apiError, skills]);

  useEffect(() => {
    if (userSkillAction) {
      setOpen(false);
      close();
    }
  }, [close, userSkillAction]);

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
        close();
      }}
      tabIndex={0}
      style={{ zIndex: 100 }}
    >
      <div className="addUserSkill">
        <div className="title flex content-center">
          <div
            className="backIcon"
            onClick={() => {
              close();
              setOpen(false);
            }}
            style={{ cursor: 'pointer' }}
            data-testid="goBack"
          >
            <ArrowBackTwoTone className={classes.backIcon} />
          </div>
          <div className="heading">{heading}</div>
        </div>
        {loading && (
          <div className="my-10">
            <SideLoading size={30} />
          </div>
        )}
        {skills && skills.length <= 0 && (
          <div className="notFound my-2">
            <h5>There are no skills</h5>
          </div>
        )}
        {skills && skills.length > 0 && (
          <Formik
            validateOnChange={false}
            onSubmit={values => submit(values)}
            initialValues={{ ...initialValue, open: false }}
            validationSchema={addUserSkillSchema}
          >
            {formik => {
              const { values, errors } = formik;
              return (
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                  {apiError && apiError.error && (
                    <small className="inputError">{apiError.error}</small>
                  )}
                  {apiError && apiError.message && (
                    <small className="inputError">{apiError.message}</small>
                  )}
                  {showSkill && showSkill === true && (
                    <div className="formGroup skillInputContainer">
                      <div className="flex skillInput">
                        <input
                          type="text"
                          name="skillName"
                          value={values.skillName}
                          onChange={e => {
                            const { value } = e.target;

                            const filter = skills?.filter(item =>
                              item.skill
                                .toLowerCase()
                                .includes(value.toLowerCase())
                            );
                            formik.setFieldValue('skillName', value, true);
                            formik.setFieldValue('open', true, false);

                            if (filter && filter.length > 0) {
                              setSkillItem(filter);
                            } else {
                              setSkillItem(skills);
                            }
                          }}
                          placeholder="write your skill"
                          className="input"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            formik.setFieldValue('open', !values.open, false)
                          }
                        >
                          +
                        </button>
                      </div>
                      {values.open && skillItem && skillItem.length > 0 && (
                        <div className="skills">
                          <ul>
                            {skillItem.map((item, index) => (
                              <li
                                key={index}
                                onClick={() => {
                                  formik.setFieldValue(
                                    'skillName',
                                    item.skill,
                                    true
                                  );
                                  formik.setFieldValue('skill', item._id);
                                }}
                                role="presentation"
                              >
                                {item.skill}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {errors && errors.skill && (
                        <small className="inputError">{errors.skill}</small>
                      )}
                      {errors && errors.skillName && (
                        <small className="inputError">{errors.skillName}</small>
                      )}
                    </div>
                  )}

                  <div className="formGroup">
                    <div className="customSelect">
                      <select
                        name="level"
                        onChange={formik.handleChange}
                        value={values.level}
                      >
                        <option value="">select level</option>
                        {Object.values(SkillLevel).map((level, index) => (
                          <option value={level} key={index}>
                            {level}
                          </option>
                        ))}
                      </select>
                      <span className="spanArrow">
                        <ArrowDropDown />
                      </span>
                    </div>
                    {errors && errors.level && (
                      <small className="inputError">{errors.level}</small>
                    )}
                  </div>
                  <div className="formGroup">
                    <div className="w-full flex content-center justify-center">
                      <button
                        type="submit"
                        className="submitBtn"
                        disabled={loadingBtn}
                      >
                        <Loader command={buttonName} loading={loadingBtn} />
                      </button>
                    </div>
                  </div>
                </form>
              );
            }}
          </Formik>
        )}
      </div>
    </Modal>
  );
};

export default AddUserSkill;
