import React, { FC } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import FolderSharedIcon from '@material-ui/icons/FolderShared';
import DesktopWindowsOutlinedIcon from '@material-ui/icons/DesktopWindowsOutlined';
import SchoolIcon from '@material-ui/icons/School';
import CoverImage from 'coverImage/CoverImage';
import NavBar from 'components/Layout/NavBar/NavBar';
import useWindowSize from 'utils/useWindowSize';
import {
  expertSkills,
  beginnerSkills,
  intermediateSkills
} from 'utils/staticData';

import { MainBackground } from 'components/Layout/MainBackground';
import UserInformationCard from './UserInformationCard';
import Headline from './Headline';
import Verification from './Verification';
import { Employment } from './Employment';
import { Education } from './Education';
import './userDashboard.scss';

const UserDashboard: FC = () => {
  const size = useWindowSize();

  const history = useHistory();

  return (
    <>
      <div>
        <CoverImage />
      </div>
      <div>
        <NavBar userDashboard />
        <div className="user-dashboard-container mx-auto">
          <div className="w-4/6 py-10 mx-auto ">
            <small className="flex-1 font-medium text-center text-base pl-2 pr-3 my-4">
              this is profile
            </small>
          </div>
          {size?.width && size?.width > 768 ? (
            <div className="flex flex-nowrap mx-auto w-5/6">
              <Verification monitor />
            </div>
          ) : (
            ''
          )}
          <div className="pb-48">
            {size?.width && size?.width > 768 ? (
              <div className="flex flex-nowrap w-full justify-evenly">
                <div className="flex flex-col w-1/4 mt-12">
                  <div className="mb-16">
                    <Headline
                      headline="Employment"
                      icon={<DesktopWindowsOutlinedIcon />}
                    />
                    <Employment />
                  </div>
                  <div>
                    <Headline headline="Education" icon={<SchoolIcon />} />
                    <Education />
                  </div>
                </div>
                <div className="flex flex-col w-1/4 mt-12">
                  <div>
                    <Headline headline="SkillSet" icon={<FolderSharedIcon />} />
                    <UserInformationCard
                      type="skills"
                      data={beginnerSkills}
                      level="Beginner"
                    />
                    <UserInformationCard
                      type="skills"
                      data={intermediateSkills}
                      level="Intermediate"
                    />
                    <UserInformationCard
                      type="skills"
                      data={expertSkills}
                      level="Expert"
                      index
                    />
                  </div>
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <MainBackground allowImageColor />
    </>
  );
};

export default withRouter(UserDashboard);
