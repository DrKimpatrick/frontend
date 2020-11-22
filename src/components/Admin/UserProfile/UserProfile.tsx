import React, { FC, useEffect, useMemo } from 'react';
import { withRouter, useLocation, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import { Computer, School, Work } from '@material-ui/icons';
import { AdminLayout as Layout, SplashScreen } from 'components/Reusable';
import { listSpecificUser, listUserSkill } from 'redux/actions/user';
import { RootState } from 'redux/store';
import Avatar from 'assets/images/avatar.jpg';
import { SkillLevel } from 'redux/action-types/skill';
import { RouteUrl } from 'utils/routes';
import { ListItem, ListItemProps } from '.';
import './UserProfile.scss';

const UserProfile: FC = () => {
  const location = useLocation<{ userId: string }>();

  const dispatch = useDispatch();

  const reducer = useSelector((state: RootState) => {
    const { specificUser, loading, userSkill } = state.users;

    return { specificUser, loading, userSkill };
  });

  const { specificUser, loading, userSkill } = reducer;

  useEffect(() => {
    if (location && location.state && location.state.userId) {
      listSpecificUser(location.state.userId)(dispatch);
      listUserSkill(location.state.userId)(dispatch);
    }
  }, [dispatch, location]);

  const educationHistory = useMemo(() => {
    if (specificUser && specificUser.educationHistory) {
      const data: ListItemProps[] = specificUser.educationHistory.map(item => ({
        id: item._id,
        name: item.schoolName,
        status: item.verificationStatus
      }));

      if (data && data.length > 0) {
        return <ListItem listItem={data} />;
      }
      return (
        <div className="notFound">
          <h5>There are no education</h5>
        </div>
      );
    }
    return <></>;
  }, [specificUser]);

  const employmentHistory = useMemo(() => {
    if (specificUser && specificUser.employmentHistory) {
      const data: ListItemProps[] = specificUser.employmentHistory.map(
        item => ({
          id: item._id,
          name: item.companyName,
          status: item.verificationStatus
        })
      );

      if (data && data.length > 0) {
        return <ListItem listItem={data} />;
      }
      return (
        <div className="notFound">
          <h5>There are no employment</h5>
        </div>
      );
    }
    return <></>;
  }, [specificUser]);

  const beginnerSkills = useMemo(() => {
    if (userSkill) {
      const data: ListItemProps[] = userSkill
        .filter(item => item.level === SkillLevel.Beginner)
        .map(item => ({
          id: item._id,
          name: item.skill.skill,
          status: item.verificationStatus
        }));

      if (data && data.length > 0) {
        return <ListItem listItem={data} />;
      }
      return (
        <div className="notFound">
          <h5>There are no beginner skills</h5>
        </div>
      );
    }
    return null;
  }, [userSkill]);

  const intermediateSkills = useMemo(() => {
    if (userSkill) {
      const data: ListItemProps[] = userSkill
        .filter(item => item.level === SkillLevel.Intermediate)
        .map(item => ({
          id: item._id,
          name: item.skill.skill,
          status: item.verificationStatus
        }));

      if (data && data.length > 0) {
        return <ListItem listItem={data} />;
      }
      return (
        <div className="notFound">
          <h5>There are no intermediate skills</h5>
        </div>
      );
    }
    return null;
  }, [userSkill]);

  const advancedSkills = useMemo(() => {
    if (userSkill) {
      const data: ListItemProps[] = userSkill
        .filter(item => item.level === SkillLevel.Advanced)
        .map(item => ({
          id: item._id,
          name: item.skill.skill,
          status: item.verificationStatus
        }));

      if (data && data.length > 0) {
        return <ListItem listItem={data} />;
      }
      return (
        <div className="notFound">
          <h5>There are no advanced skills</h5>
        </div>
      );
    }
    return null;
  }, [userSkill]);

  if (location && !location.state) {
    return <Redirect to={RouteUrl.SuperAdminDashboard} />;
  }

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Layout
      topMenu={[
        { name: 'Talent', url: '/admin-dashboard' },
        { name: 'Profile', url: location.pathname }
      ]}
    >
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
                  {userSkill && userSkill.length > 0 && (
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

                  {userSkill && userSkill.length <= 0 && (
                    <div className="notFound">
                      <h5>There are no skills</h5>
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
