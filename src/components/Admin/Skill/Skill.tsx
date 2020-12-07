import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Add } from '@material-ui/icons';
import {
  AdminLayout as Layout,
  SideLoading,
  Warning,
  CustomListItem,
  NoItemFound
} from 'components/Reusable';
import {
  listSkill,
  deleteSkill,
  addSkill,
  updateSkill
} from 'redux/actions/skill';
import { RootState } from 'redux/store';
import { setActivePath } from 'redux/actions/user';
import { Skill as SkillType } from 'redux/action-types/skill';
import { AddNewSkill } from './AddSkill';
import './Skill.scss';

export const Skill: FC = () => {
  const [skillId, setSkillId] = useState<string>();

  const [warning = false, setWarning] = useState<boolean>();

  const [add = false, setAdd] = useState<boolean>();

  const [edit = false, setEdit] = useState<boolean>();

  const [loadingSpinner = false, setLoadingSpinner] = useState<boolean>();

  const [currentSkill = false, setCurrentSkill] = useState<SkillType>();

  const dispatch = useDispatch();

  const location = useLocation();

  const reducer = useSelector((state: RootState) => {
    const { loading, skills, errors, action } = state.skills;

    return { loading, skills, errors, action };
  });

  const { loading, skills, errors, action } = reducer;

  useEffect(() => {
    listSkill()(dispatch);
    setActivePath(location.pathname)(dispatch);
  }, [dispatch, location]);

  useEffect(() => {
    if (!action) {
      setAdd(false);
      setLoadingSpinner(false);
      setEdit(false);
    }
    if (errors) {
      setLoadingSpinner(false);
    }
  }, [action, errors]);

  if (loading) {
    return (
      <Layout>
        <div style={{ marginTop: 200 }}>
          <SideLoading />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {add && (
        <AddNewSkill
          buttonName="save"
          close={() => setAdd(false)}
          initialValue={{ skill: '' }}
          loading={loadingSpinner}
          submit={values => {
            setLoadingSpinner(true);
            addSkill([values])(dispatch);
          }}
          title="Add new skill"
          apiError={errors}
        />
      )}

      {edit && currentSkill && skillId && (
        <AddNewSkill
          buttonName="update"
          close={() => setEdit(false)}
          initialValue={{ skill: currentSkill.skill }}
          loading={loadingSpinner}
          submit={values => {
            setLoadingSpinner(true);
            updateSkill({ ...values, skillId: currentSkill._id })(dispatch);
          }}
          title="Edit Skill"
          apiError={errors}
        />
      )}
      {warning && skillId && (
        <Warning
          message="are you sure you want to delete this skill"
          cancel={() => {
            setWarning(false);
            setSkillId(undefined);
          }}
          accept={() => {
            setWarning(false);
            setSkillId(undefined);
            deleteSkill(skillId)(dispatch);
          }}
        />
      )}
      <div className="adminSkills">
        <div className="w-1/3">
          <p className="text-right text-xs py-4 pb-6" />
          {skills && skills.length > 0 && (
            <ul className="bg-card-preview">
              {skills.map((item, index) => (
                <CustomListItem
                  setEdit={value => {
                    const find = skills.find(list => list._id === value);
                    if (find) {
                      setSkillId(value);
                      setEdit(true);
                      setCurrentSkill(find);
                      setAdd(false);
                    }
                  }}
                  setDelete={value => {
                    const find = skills.find(list => list._id === value);
                    if (find) {
                      setWarning(true);
                      setSkillId(find._id);
                    }
                  }}
                  listItem={{ id: item._id, name: item.skill }}
                  key={index}
                />
              ))}
            </ul>
          )}
          {skills && skills.length <= 0 && <NoItemFound />}
          <button
            className="mt-4 bg-gray-800 w-full text-white hover:bg-gray-900 outline-none font-semibold py-1 px-1 rounded-sm shadow"
            type="button"
            style={{ height: 40 }}
            onClick={() => setAdd(true)}
          >
            <Add /> <span>Add new skill</span>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Skill;
