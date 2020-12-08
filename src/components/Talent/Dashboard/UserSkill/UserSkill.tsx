import React, { useMemo, useEffect, useState } from 'react';
import { SkillLevel } from 'redux/action-types/skill';
import { FolderShared, Add } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { listUserSkill } from 'redux/actions/skill';
import { RootState } from 'redux/store';
import { SideLoading } from 'components/Reusable';
import { SkillItem } from '.';
import Headline from '../Headline';

const Skill = () => {
  const [loader, setLoader] = useState<boolean>();

  const dispatch = useDispatch();

  const reducer = useSelector((state: RootState) => {
    const { userSkill, loading } = state.skills;

    return { userSkill, loading };
  });

  const { userSkill } = reducer;

  useEffect(() => {
    setLoader(true);
    listUserSkill()(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (userSkill) {
      setLoader(false);
    }
  }, [userSkill]);

  const beginnerSkill = useMemo(() => {
    if (userSkill && userSkill.length > 0) {
      const listBeginnerSkill = userSkill.filter(
        item => item.level === SkillLevel.Beginner
      );

      if (listBeginnerSkill && listBeginnerSkill.length > 0) {
        return <SkillItem level="Beginner" userSkill={listBeginnerSkill} />;
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
          <SkillItem level="Intermediate" userSkill={listIntermediateSkill} />
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
        return <SkillItem level="Advanced" userSkill={listAdvancedSkill} />;
      }
    }
    return <></>;
  }, [userSkill]);

  return (
    <div className="flex flex-col w-1/4 mt-12">
      <div>
        <Headline headline="SkillSet" icon={<FolderShared />} />
        {userSkill && userSkill.length > 0 && (
          <>
            {beginnerSkill}
            {intermediateSkill}
            {advancedSkill}
            <button
              className="mt-4 bg-gray-800 w-full text-white hover:bg-gray-900 outline-none font-semibold h-12 py-1 px-1 rounded-sm shadow"
              type="button"
            >
              <Add /> <span>Add new </span> <span>skills</span>
            </button>
          </>
        )}
        {userSkill && userSkill.length <= 0 && (
          <div className="notFound my-4">
            <h5>There are no skills</h5>
          </div>
        )}
        {loader && (
          <div className="my-10">
            <SideLoading size={30} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Skill;
