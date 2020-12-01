import React, { FC, useEffect, useMemo, useState } from 'react';
import { withRouter, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import { Computer, School, Work } from '@material-ui/icons';
import { AdminLayout as Layout, SideLoading } from 'components/Reusable';
import {
  listSpecificUser,
  listUserSkill,
  setActivePath
} from 'redux/actions/user';
import { RootState } from 'redux/store';
import Avatar from 'assets/images/avatar.jpg';
import { SkillLevel } from 'redux/action-types/skill';
import { RouteUrl } from 'utils/routes';
import { UserRole } from 'redux/action-types/user';
import { changeEducationStatus } from 'redux/actions/education';
import { changeEmploymentStatus } from 'redux/actions/employment';
import { changeSkillStatus } from 'redux/actions/skill';
import { ListItem, ProfileNotFound } from '.';
import './UserProfile.scss';

const UserProfile: FC = () => {
  const [topMenu = [], setTopMenu] = useState<
    { url: string; name: string }[]
  >();

  const location = useLocation<{ userId: string }>();

  const dispatch = useDispatch();

  const params = useParams<{ username: string }>();

  const reducer = useSelector((state: RootState) => {
    const {
      specificUser,
      loading,
      userSkill,
      errors,
      userEducationLoading,
      userEmploymentLoading,
      userSkillLoading
    } = state.users;

    return {
      specificUser,
      loading,
      userSkill,
      errors,
      userEducationLoading,
      userEmploymentLoading,
      userSkillLoading
    };
  });

  const {
    specificUser,
    userSkill,
    errors,
    loading,
    userEducationLoading,
    userEmploymentLoading,
    userSkillLoading
  } = reducer;

  useEffect(() => {
    listSpecificUser(params.username)(dispatch);
  }, [dispatch, params.username]);

  useEffect(() => {
    if (specificUser) {
      listUserSkill(specificUser._id)(dispatch);
    }
  }, [dispatch, specificUser]);

  useEffect(() => {
    if (specificUser) {
      const roles = specificUser.roles ? specificUser.roles : [];
      const profilePath = { name: 'Profile', url: location.pathname };

      roles.map(item => {
        switch (item) {
          case UserRole.CompanyAdmin:
            setActivePath(RouteUrl.Company)(dispatch);
            setTopMenu([
              { url: RouteUrl.Company, name: 'Company' },
              profilePath
            ]);
            break;

          case UserRole.HrAdmin:
            setActivePath(RouteUrl.Company)(dispatch);
            setTopMenu([
              { url: RouteUrl.HrAdmin, name: 'Hr Admin' },
              profilePath
            ]);
            break;

          case UserRole.TrainingAffiliate:
            setActivePath(RouteUrl.TrainingAffiliate)(dispatch);
            setTopMenu([
              { url: RouteUrl.TrainingAffiliate, name: 'Training Affiliate' },
              profilePath
            ]);
            break;

          case UserRole.Talent:
            setActivePath(RouteUrl.SuperAdminDashboard)(dispatch);
            setTopMenu([
              { url: RouteUrl.SuperAdminDashboard, name: 'Talent' },
              profilePath
            ]);
            break;

          case UserRole.RecruitmentAdmin:
            setActivePath(RouteUrl.Recruiter)(dispatch);
            setTopMenu([
              { url: RouteUrl.Recruiter, name: 'Recruiter' },
              profilePath
            ]);
            break;

          default:
            return undefined;
        }
        return undefined;
      });
    }
  }, [dispatch, location, specificUser]);

  const educationHistory = useMemo(() => {
    if (specificUser && specificUser.educationHistory) {
      const data = specificUser.educationHistory;

      if (data && data.length > 0) {
        return (
          <div className="listItems">
            {userEducationLoading && (
              <div className="flex justify-center" style={{ width: 150 }}>
                <SideLoading />
              </div>
            )}
            {!userEducationLoading && (
              <ul className="p-0 m-2 bg-card-preview">
                {data.map((item, index) => (
                  <ListItem
                    listItem={{
                      id: item._id,
                      name: item.schoolName,
                      status: item.verificationStatus
                    }}
                    changeStatus={value => {
                      changeEducationStatus({ status: value, id: item._id })(
                        dispatch
                      );
                    }}
                    key={index}
                  />
                ))}
              </ul>
            )}
          </div>
        );
      }
      return (
        <div className="notFound">
          <h5>There are no education</h5>
        </div>
      );
    }
    return <></>;
  }, [dispatch, specificUser, userEducationLoading]);

  const employmentHistory = useMemo(() => {
    if (specificUser && specificUser.employmentHistory) {
      const data = specificUser.employmentHistory;

      if (data && data.length > 0) {
        return (
          <div className="listItems">
            {userEmploymentLoading && (
              <div className="flex justify-center" style={{ width: 150 }}>
                <SideLoading />
              </div>
            )}
            {!userEmploymentLoading && (
              <ul className="p-0 m-2 bg-card-preview">
                {data.map((item, index) => (
                  <ListItem
                    listItem={{
                      id: item._id,
                      name: item.companyName,
                      status: item.verificationStatus
                    }}
                    key={index}
                    changeStatus={value => {
                      changeEmploymentStatus({ status: value, id: item._id })(
                        dispatch
                      );
                    }}
                  />
                ))}
              </ul>
            )}
          </div>
        );
      }
      return (
        <div className="notFound">
          <h5>There are no employment</h5>
        </div>
      );
    }
    return <></>;
  }, [dispatch, specificUser, userEmploymentLoading]);

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
  }, [dispatch, userSkill, userSkillLoading]);

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
  }, [dispatch, userSkill, userSkillLoading]);

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
  }, [dispatch, userSkill, userSkillLoading]);

  if (loading) {
    return (
      <Layout>
        <div style={{ marginTop: 200 }}>
          <SideLoading />
        </div>
      </Layout>
    );
  }

  if (errors || !specificUser) {
    return (
      <Layout topMenu={topMenu}>
        <ProfileNotFound />
      </Layout>
    );
  }

  return (
    <Layout topMenu={topMenu}>
      {specificUser && (
        <div className="userProfile">
          <div className="profilePreview">
            <div className="profilePicture">
              <img src={Avatar} alt="" />
            </div>
            <div className="preview">
              <h5 className="title">{specificUser.username}</h5>
              <div className="biography">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam
                maiores ipsum dolor sit amet consectetur adipisicing elit. Ullam
              </div>
            </div>
          </div>
          <div className="profileShowcase">
            <Grid container spacing={10}>
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
              <Grid item xs={6}>
                <div className="items">
                  <div className="title">
                    <Computer />
                    <h1>Employment</h1>
                  </div>
                  {employmentHistory}
                </div>
                <div className="items educationItem">
                  <div className="title">
                    <School />
                    <h1>Education</h1>
                  </div>
                  {educationHistory}
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default withRouter(UserProfile);
