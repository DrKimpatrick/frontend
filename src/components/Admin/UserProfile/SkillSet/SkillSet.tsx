import React, { useMemo, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { Work } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { SkillLevel } from 'redux/action-types/skill';
import { changeSkillStatus } from 'redux/actions/skill';
import { SideLoading } from 'components/Reusable';
import { RootState } from 'redux/store';
import { listUserSkill } from 'redux/actions/user';
import { ListItem } from '..';

interface Props {
  userId: string;
  hasModifyAccess?: boolean;
}
export const SkillSet = (props: Props) => {
  const { userId, hasModifyAccess = true } = props;

  const dispatch = useDispatch();

  const selector = useSelector((state: RootState) => {
    const { userSkill, userSkillLoading } = state.users;

    return { userSkill, userSkillLoading };
  });

  const { userSkill, userSkillLoading } = selector;

  useEffect(() => {
    listUserSkill(userId)(dispatch);
  }, [dispatch, userId]);

  const beginnerSkills = useMemo(() => {
    if (userSkill) {
      const data = userSkill.filter(item => item.level === SkillLevel.Beginner);

      if (data && data.length > 0) {
        return (
          <div className="listItems">
            {!userSkillLoading && (
              <ul className="p-0 m-2 bg-card-preview">
                {data.map((item, index) => (
                  <ListItem
                    listItem={{
                      id: item._id,
                      name: item.skill.skill,
                      status: item.verificationStatus
                    }}
                    key={index}
                    changeStatus={value => {
                      changeSkillStatus({ status: value, id: item._id })(
                        dispatch
                      );
                    }}
                    hasModifyAccess={hasModifyAccess}
                  />
                ))}
              </ul>
            )}
          </div>
        );
      }
      return (
        <div className="notFound">
          <h5>There are no beginner skills</h5>
        </div>
      );
    }
    return null;
  }, [dispatch, hasModifyAccess, userSkill, userSkillLoading]);

  const intermediateSkills = useMemo(() => {
    if (userSkill) {
      const data = userSkill.filter(
        item => item.level === SkillLevel.Intermediate
      );

      if (data && data.length > 0) {
        return (
          <div className="listItems">
            {!userSkillLoading && (
              <ul className="p-0 m-2 bg-card-preview">
                {data.map((item, index) => (
                  <ListItem
                    listItem={{
                      id: item._id,
                      name: item.skill.skill,
                      status: item.verificationStatus
                    }}
                    key={index}
                    changeStatus={value => {
                      changeSkillStatus({ status: value, id: item._id })(
                        dispatch
                      );
                    }}
                    hasModifyAccess={hasModifyAccess}
                  />
                ))}
              </ul>
            )}
          </div>
        );
      }
      return (
        <div className="notFound">
          <h5>There are no intermediate skills</h5>
        </div>
      );
    }
    return null;
  }, [dispatch, hasModifyAccess, userSkill, userSkillLoading]);

  const advancedSkills = useMemo(() => {
    if (userSkill) {
      const data = userSkill.filter(item => item.level === SkillLevel.Advanced);

      if (data && data.length > 0) {
        return (
          <div className="listItems">
            {!userSkillLoading && (
              <ul className="p-0 m-2 bg-card-preview">
                {data.map((item, index) => (
                  <ListItem
                    listItem={{
                      id: item._id,
                      name: item.skill.skill,
                      status: item.verificationStatus
                    }}
                    key={index}
                    changeStatus={value => {
                      changeSkillStatus({ status: value, id: item._id })(
                        dispatch
                      );
                    }}
                    hasModifyAccess={hasModifyAccess}
                  />
                ))}
              </ul>
            )}
          </div>
        );
      }
      return (
        <div className="notFound">
          <h5>There are no advanced skills</h5>
        </div>
      );
    }
    return null;
  }, [dispatch, hasModifyAccess, userSkill, userSkillLoading]);

  return (
    <Grid item xs={6}>
      <div className="items">
        <div className="title">
          <Work />
          <h1>Skillset</h1>
        </div>
        {!userSkillLoading && userSkill && userSkill.length > 0 && (
          <>
            <div className="skillDivider">
              <div className="title">
                <h5 className="beginner">Beginners</h5>
              </div>
              {beginnerSkills}
            </div>
            <div className="skillDivider">
              <div className="title">
                <h5 className="intermediate">Intermediate</h5>
              </div>
              {intermediateSkills}
            </div>
            <div className="skillDivider">
              <div className="title">
                <h5 className="advanced">Advanced</h5>
              </div>
              {advancedSkills}
            </div>
          </>
        )}

        {!userSkillLoading && userSkill && userSkill.length <= 0 && (
          <div className="notFound">
            <h5>There are no skills</h5>
          </div>
        )}

        {userSkillLoading && (
          <div className="flex justify-center" style={{ width: 150 }}>
            <SideLoading />
          </div>
        )}
      </div>
    </Grid>
  );
};

export default SkillSet;
