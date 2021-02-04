import React, { FC, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  DesktopWindowsOutlined,
  School,
  FolderShared,
  FileCopy,
  Share,
  TextFields
} from '@material-ui/icons';
import { Container } from '@material-ui/core';
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
  const [link, setLink] = useState<string>();

  const size = useWindowSize();

  const linkRef = useRef<any>();

  const reducer = useSelector((state: RootState) => {
    const { user } = state.users;

    return { user };
  });

  const { user } = reducer;

  return (
    <TalentLayout>
      <div className="user-dashboard-container mx-auto">
        {user && user.bio && (
          <Container>
            <div className="w-4/6 biography flex flex-col">
              <span className="heading d-flex items-center">
                <TextFields />
                <span>Bio</span>
              </span>
              <small className="flex-1 font-medium text-base">{user.bio}</small>
            </div>
          </Container>
        )}
        {user && user.sharedLink && (
          <Container>
            <div className="flex flex-col shared">
              <div className="flex items-center w-full heading">
                <Share />
                <span>Shareable link</span>
              </div>
              <div
                className="sharedLink flex justify-between w-full"
                onClick={() => {
                  if (linkRef && linkRef.current) {
                    linkRef.current.select();
                    document.execCommand('copy');
                  }
                  return undefined;
                }}
              >
                <input
                  type="text"
                  value={link || user.sharedLink}
                  ref={linkRef}
                  onChange={() => setLink(user.sharedLink)}
                />
                <span>
                  <FileCopy />
                </span>
              </div>
            </div>
          </Container>
        )}
        {size?.width && size?.width > 768 ? (
          <Container>
            <Verification monitor />
          </Container>
        ) : (
          ''
        )}
        <div className="pb-48 tDashboardItem">
          {size?.width && size?.width > 768 ? (
            <Container>
              <div className="flex flex-nowrap w-full justify-between">
                <div className="flex flex-col w-2/5 mt-4">
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
                <div className="flex flex-col w-2/5 mt-4">
                  <div>
                    <Headline headline="SkillSet" icon={<FolderShared />} />
                    <UserSkill />
                  </div>
                </div>
              </div>
            </Container>
          ) : (
            <ResponsiveDashboard />
          )}
        </div>
      </div>
    </TalentLayout>
  );
};

export default withRouter(Dashboard);
