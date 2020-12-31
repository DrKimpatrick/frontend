import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { withRouter, Redirect, useHistory } from 'react-router-dom';
import {
  DesktopWindowsOutlined,
  School,
  FolderShared
} from '@material-ui/icons';
import { CoverImage, MainBackground } from 'components/Reusable';
import NavBar from 'components/Reusable/Layout/NavBar/NavBar';
import useWindowSize from 'utils/useWindowSize';
import { RootState } from 'redux/store';
import { TalentProcess, UserRole } from 'redux/action-types/user';
import { Routes } from 'utils/routes';
import Headline from './Headline';
import Verification from './Verification';
import { Employment } from './Employment';
import { Education } from './Education';
import { UserSkill } from './UserSkill';
import { ResponsiveDashboard } from './ResponsiveDashboard';
import './Dashboard.scss';

const Dashboard: FC = () => {
  const size = useWindowSize();

  const history = useHistory();

  const reducer = useSelector((state: RootState) => {
    const { user } = state.users;

    return { user };
  });

  const { user } = reducer;

  if (user && user.roles && user.roles.find(item => item !== UserRole.Talent)) {
    history.goBack();
    return <></>;
  }

  if (
    user &&
    user.profileProcess &&
    user.profileProcess !== TalentProcess.Completed
  ) {
    return <Redirect to={Routes.CompleteProfile} />;
  }

  if (user && !user.profileProcess) {
    return <Redirect to={Routes.CompleteProfile} />;
  }

  if (
    user &&
    user.profileProcess === TalentProcess.Completed &&
    !user.stripeSubscriptionId
  ) {
    return <Redirect to={Routes.GetHired} />;
  }

  return (
    <>
      <div>
        <CoverImage />
      </div>
      <div>
        <NavBar userDashboard />
        <div className="user-dashboard-container mx-auto">
          {user && user.bio && (
            <div className="w-4/6 py-10 mx-auto biography">
              <small className="flex-1 font-medium text-center text-base pl-2 pr-3 my-4">
                {user.bio}
              </small>
            </div>
          )}
          {size?.width && size?.width > 768 ? (
            <div className="flex flex-nowrap mx-auto w-5/6">
              <Verification monitor />
            </div>
          ) : (
            ''
          )}
          <div className="pb-48 tDashboardItem">
            {size?.width && size?.width > 768 ? (
              <div className="flex flex-nowrap w-full justify-evenly">
                <div className="flex flex-col w-1/4 mt-12">
                  <div className="mb-16">
                    <Headline
                      headline="Employment"
                      icon={<DesktopWindowsOutlined />}
                    />
                    <Employment />
                  </div>
                  <div>
                    <Headline headline="Education" icon={<School />} />
                    <Education />
                  </div>
                </div>
                <div className="flex flex-col w-1/4 mt-12">
                  <div>
                    <Headline headline="SkillSet" icon={<FolderShared />} />
                    <UserSkill />
                  </div>
                </div>
              </div>
            ) : (
              <ResponsiveDashboard />
            )}
          </div>
        </div>
      </div>
      <MainBackground allowImageColor />
    </>
  );
};

export default withRouter(Dashboard);
