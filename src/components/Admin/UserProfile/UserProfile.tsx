import React, { FC, useEffect, useState } from 'react';
import { withRouter, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  AdminLayout as Layout,
  SideLoading,
  AffiliateProfile,
  ProfilePreview,
  TalentProfile
} from 'components/Reusable';
import { listSpecificUser, setActivePath } from 'redux/actions/user';
import { RootState } from 'redux/store';
import { Routes } from 'utils/routes';
import { UserRole } from 'redux/action-types/user';
import { ProfileNotFound } from '.';
import './UserProfile.scss';

const UserProfile: FC = () => {
  const [topMenu = [], setTopMenu] = useState<
    { url: string; name: string }[]
  >();

  const [showCourse = false, setShowCourse] = useState<boolean>();

  const [showPreview = false, setShowPreview] = useState<boolean>();

  const location = useLocation<{ userId: string }>();

  const dispatch = useDispatch();

  const params = useParams<{ username: string }>();

  const reducer = useSelector((state: RootState) => {
    const {
      specificUser,
      specificUserLoading,
      errors,
      userEducationLoading,
      userEmploymentLoading
    } = state.users;

    return {
      specificUser,
      loading: specificUserLoading,
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
          case UserRole.EducationUser:
            setActivePath(Routes.Education)(dispatch);
            setTopMenu([
              { url: Routes.Education, name: 'Education' },
              profilePath
            ]);
            setShowPreview(true);
            break;

          case UserRole.HrAdmin:
            setActivePath(Routes.HrAdmin)(dispatch);
            setTopMenu([
              { url: Routes.HrAdmin, name: 'Hr Admin' },
              profilePath
            ]);
            setShowPreview(true);
            break;

          case UserRole.TrainingAffiliate:
            setActivePath(Routes.Affiliate)(dispatch);
            setTopMenu([
              { url: Routes.Affiliate, name: 'Affiliate' },
              profilePath
            ]);
            setShowCourse(true);
            setShowPreview(false);
            break;

          case UserRole.Talent:
            setActivePath(Routes.SuperAdminDashboard)(dispatch);
            setTopMenu([
              { url: Routes.SuperAdminDashboard, name: 'Talent' },
              profilePath
            ]);
            setShowPreview(false);
            break;

          case UserRole.RecruitmentAdmin:
            setActivePath(Routes.Recruiter)(dispatch);
            setTopMenu([
              { url: Routes.Recruiter, name: 'Recruiter' },
              profilePath
            ]);

            setShowPreview(true);
            break;

          default:
            setShowPreview(true);
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

  if (errors && !specificUser) {
    return (
      <Layout topMenu={topMenu}>
        <ProfileNotFound />
      </Layout>
    );
  }

  return (
    <Layout topMenu={topMenu} showCourse={showCourse}>
      {specificUser && (
        <>
          <TalentProfile
            user={specificUser}
            userEducationLoading={userEducationLoading}
            userEmploymentLoading={userEmploymentLoading}
            hasModifyAccess
          />
          {specificUser.roles &&
            specificUser.roles.includes(UserRole.TrainingAffiliate) && (
              <div className="userProfile">
                <ProfilePreview user={specificUser} />
                <div className="profileShowcase">
                  <AffiliateProfile courses={specificUser.courses} />
                </div>
              </div>
            )}
          {showPreview && (
            <div className="userProfile">
              <ProfilePreview user={specificUser} />
            </div>
          )}
        </>
      )}
    </Layout>
  );
};

export default withRouter(UserProfile);
