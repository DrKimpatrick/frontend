import React, { FC } from 'react';
import { Grid } from '@material-ui/core';
import { UserRole, User } from 'redux/action-types/user';
import { ProfilePreview } from 'components/Reusable';
import { SkillSet, UserEducation, UserEmployment } from 'components/Admin';
import './TalentProfile.scss';

type props = {
  user: User;
  userEmploymentLoading?: boolean;
  userEducationLoading?: boolean;
  hasModifyAccess?: boolean;
};

const TalentProfile: FC<props> = ({
  user,
  userEmploymentLoading,
  userEducationLoading,
  hasModifyAccess = false
}) => {
  return (
    <>
      {user.roles && user.roles.includes(UserRole.Talent) && (
        <div className="userProfile">
          <ProfilePreview user={user} />
          <div className="profileShowcase">
            <Grid container spacing={10}>
              <SkillSet userId={user._id} hasModifyAccess={hasModifyAccess} />
              <Grid item xs={6}>
                {user.employmentHistory && (
                  <UserEmployment
                    employment={user.employmentHistory}
                    userEmploymentLoading={userEmploymentLoading}
                    hasModifyAccess={hasModifyAccess}
                  />
                )}
                {user.educationHistory && (
                  <UserEducation
                    education={user.educationHistory}
                    userEducationLoading={userEducationLoading}
                    hasModifyAccess={hasModifyAccess}
                  />
                )}
              </Grid>
            </Grid>
          </div>
        </div>
      )}
    </>
  );
};

export default TalentProfile;
