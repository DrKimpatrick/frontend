import React, { useMemo, useEffect, useState } from 'react';
import { SkillLevel, UserSkill } from 'redux/action-types/skill';
import { Add } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import {
  listUserSkill,
  addUserSkill,
  updateUserSkill,
  deleteUserSkill
} from 'redux/actions/skill';
import { RootState } from 'redux/store';
import { SideLoading, Warning } from 'components/Reusable';
import { SkillItem } from '.';
import { AddUserSkill } from './AddUserSkill';

const Skill = () => {
  const [loader, setLoader] = useState<boolean>();

  const [add = false, setAdd] = useState<boolean>();

  const [edit = false, setEdit] = useState<boolean>();

  const [warning, setWarning] = useState<boolean>();

  const [currentSkill, setCurrentSkill] = useState<UserSkill>();

  const [skillId, setSkillId] = useState<string>();

  const dispatch = useDispatch();

  const reducer = useSelector((state: RootState) => {
    const { userSkill, loading, errors } = state.skills;

    return { userSkill, loading, errors };
  });

  const { userSkill, errors } = reducer;

  useEffect(() => {
    setLoader(true);
    listUserSkill()(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (userSkill || errors) {
      setLoader(false);
    }
  }, [errors, userSkill]);

  const beginnerSkill = useMemo(() => {
    if (userSkill && userSkill.length > 0) {
      const listBeginnerSkill = userSkill.filter(
        item => item.level === SkillLevel.Beginner
      );

      if (listBeginnerSkill && listBeginnerSkill.length > 0) {
        return (
          <SkillItem
            level="Beginner"
            userSkill={listBeginnerSkill}
            editItem={values => {
              setEdit(true);
              setCurrentSkill(values);
            }}
            deleteItem={value => {
              setWarning(true);
              setSkillId(value);
            }}
          />
        );
      }
    }
    return <></>;
  }, [userSkill]);

  const intermediateSkill = useMemo(() => {
    if (userSkill && userSkill.length > 0) {
      const listIntermediateSkill = userSkill.filter(
        item => item.level === SkillLevel.Intermediate
      );

      if (listIntermediateSkill && listIntermediateSkill.length > 0) {
        return (
          <SkillItem
            level="Intermediate"
            userSkill={listIntermediateSkill}
            editItem={values => {
              setEdit(true);
              setCurrentSkill(values);
            }}
            deleteItem={value => {
              setWarning(true);
              setSkillId(value);
            }}
          />
        );
      }
    }
    return <></>;
  }, [userSkill]);

  const advancedSkill = useMemo(() => {
    if (userSkill && userSkill.length > 0) {
      const listAdvancedSkill = userSkill.filter(
        item => item.level === SkillLevel.Advanced
      );

      if (listAdvancedSkill && listAdvancedSkill.length > 0) {
        return (
          <SkillItem
            level="Advanced"
            userSkill={listAdvancedSkill}
            editItem={values => {
              setEdit(true);
              setCurrentSkill(values);
            }}
            deleteItem={value => {
              setWarning(true);
              setSkillId(value);
            }}
          />
        );
      }
    }
    return <></>;
  }, [userSkill]);

  if (loader) {
    return (
      <div className="w-full">
        <div className="my-4">
          <SideLoading size={30} />
        </div>
      </div>
    );
  }

  return (
    <>
      {add && (
        <AddUserSkill
          close={() => setAdd(false)}
          initialValue={{ skill: '', skillName: '', level: '' }}
          buttonName="Save"
          heading="Add Skill"
          submit={values => addUserSkill([values])(dispatch)}
          showSkill
        />
      )}
      {edit && currentSkill && (
        <AddUserSkill
          close={() => {
            setEdit(false);
            setCurrentSkill(undefined);
          }}
          initialValue={{
            skill: currentSkill._id,
            skillName: currentSkill.skill.skill,
            level: currentSkill.level
          }}
          buttonName="Update"
          heading="Edit Skill"
          submit={values => {
            updateUserSkill([{ ...values, userSkill: currentSkill._id }])(
              dispatch
            );
          }}
        />
      )}
      {warning && skillId && (
        <Warning
          message="are you sure you want to delete this skill"
          cancel={() => {
            setSkillId(undefined);
            setWarning(false);
          }}
          accept={() => {
            deleteUserSkill([skillId])(dispatch);
            setWarning(false);
          }}
        />
      )}
      {userSkill && userSkill.length > 0 && (
        <>
          {beginnerSkill}
          {intermediateSkill}
          {advancedSkill}
        </>
      )}
      {userSkill && userSkill.length <= 0 && (
        <div className="notFound my-4">
          <h5>You do not have skills</h5>
        </div>
      )}
      <button
        className="mt-4 bg-gray-800 w-full text-white hover:bg-gray-900 outline-none font-semibold h-12 py-1 px-1 rounded-sm shadow add"
        type="button"
        onClick={() => setAdd(true)}
      >
        <Add /> <span>Add new </span> <span>skills</span>
      </button>
    </>
  );
};

export default Skill;
