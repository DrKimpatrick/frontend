import React, { FC, useEffect, useState } from 'react';
import { withRouter, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import {
  AdminLayout as Layout,
  SideLoading,
  AffiliateProfile
} from 'components/Reusable';
import { listSpecificUser, setActivePath } from 'redux/actions/user';
import { RootState } from 'redux/store';
import Avatar from 'assets/images/avatar.jpg';
import { Routes } from 'utils/routes';
import { UserRole } from 'redux/action-types/user';
import { ProfileNotFound } from '.';
import './UserProfile.scss';
import { SkillSet } from './SkillSet';
import { UserEducation } from './UserEducation';
import { UserEmployment } from './UserEmployment';

const UserProfile: FC = () => {
  const [topMenu = [], setTopMenu] = useState<
    { url: string; name: string }[]
  >();

  const [showCourse = false, setShowCourse] = useState<boolean>();

  const location = useLocation<{ userId: string }>();

  const dispatch = useDispatch();

  const params = useParams<{ username: string }>();

  const reducer = useSelector((state: RootState) => {
    const {
      specificUser,
      loading,
      errors,
      userEducationLoading,
      userEmploymentLoading
    } = state.users;

    return {
      specificUser,
      loading,
      errors,
      userEducationLoading,
      userEmploymentLoading
    };
  });

  const {
    specificUser,
    errors,
    loading,
    userEducationLoading,
    userEmploymentLoading
  } = reducer;

  useEffect(() => {
    listSpecificUser(params.username)(dispatch);
  }, [dispatch, params.username]);

  useEffect(() => {
    if (specificUser) {
      const roles = specificUser.roles ? specificUser.roles : [];
      const profilePath = { name: 'Profile', url: location.pathname };

      roles.map(item => {
        switch (item) {
          case UserRole.CompanyAdmin:
            setActivePath(Routes.Company)(dispatch);
            setTopMenu([{ url: Routes.Company, name: 'Company' }, profilePath]);
            break;

          case UserRole.HrAdmin:
            setActivePath(Routes.Company)(dispatch);
            setTopMenu([
              { url: Routes.HrAdmin, name: 'Hr Admin' },
              profilePath
            ]);
            break;

          case UserRole.TrainingAffiliate:
            setActivePath(Routes.Affiliate)(dispatch);
            setTopMenu([
              { url: Routes.Affiliate, name: 'Affiliate' },
              profilePath
            ]);
            setShowCourse(true);
            break;

          case UserRole.Talent:
            setActivePath(Routes.SuperAdminDashboard)(dispatch);
            setTopMenu([
              { url: Routes.SuperAdminDashboard, name: 'Talent' },
              profilePath
            ]);
            break;

          case UserRole.RecruitmentAdmin:
            setActivePath(Routes.Recruiter)(dispatch);
            setTopMenu([
              { url: Routes.Recruiter, name: 'Recruiter' },
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
    <Layout topMenu={topMenu} showCourse={showCourse}>
      {specificUser && (
        <div className="userProfile">
          <div className="profilePreview">
            <div className="profilePicture">
              <img
                src={
                  specificUser.profilePicture
                    ? specificUser.profilePicture
                    : Avatar
                }
                alt=""
              />
            </div>
            <div
              className="preview"
              style={{ marginTop: !specificUser.bio ? '40px' : '20px' }}
            >
              <h5 className="title">{specificUser.username}</h5>
              {specificUser.bio && (
                <div className="biography">{specificUser.bio}</div>
              )}
            </div>
          </div>
          <div className="profileShowcase">
            {specificUser.roles && (
              <>
                {specificUser.roles.includes(UserRole.Talent) && (
                  <Grid container spacing={10}>
                    <SkillSet userId={specificUser._id} />
                    <Grid item xs={6}>
                      {specificUser.employmentHistory && (
                        <UserEmployment
                          employment={specificUser.employmentHistory}
                          userEmploymentLoading={userEmploymentLoading}
                        />
                      )}
                      {specificUser.educationHistory && (
                        <UserEducation
                          education={specificUser.educationHistory}
                          userEducationLoading={userEducationLoading}
                        />
                      )}
                    </Grid>
                  </Grid>
                )}
              </>
            )}
            {specificUser.roles &&
              specificUser.roles.includes(UserRole.TrainingAffiliate) && (
                <AffiliateProfile user={specificUser} />
              )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default withRouter(UserProfile);
