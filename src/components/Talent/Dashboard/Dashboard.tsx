import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  DesktopWindowsOutlined,
  School,
  FolderShared
} from '@material-ui/icons';
import { TalentLayout } from 'components/Reusable';
import useWindowSize from 'utils/useWindowSize';
import { RootState } from 'redux/store';
import Headline from './Headline';
import Verification from './Verification';
import { Employment } from './Employment';
import { Education } from './Education';
import { UserSkill } from './UserSkill';
import { ResponsiveDashboard } from './ResponsiveDashboard';
import './Dashboard.scss';

const Dashboard: FC = () => {
  const size = useWindowSize();

  const reducer = useSelector((state: RootState) => {
    const { user } = state.users;

    return { user };
  });

  const { user } = reducer;

  return (
    <TalentLayout>
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
    </TalentLayout>
  );
};

export default withRouter(Dashboard);
