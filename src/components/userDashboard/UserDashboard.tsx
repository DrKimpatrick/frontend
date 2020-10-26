import AccordionMenu from 'components/accordion/AccordionMenu';
import Avatars from 'components/avatar/Avatars';
import React, { Fragment, FC, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Verification from './Verification';
import FilterListOutlinedIcon from '@material-ui/icons/FilterListOutlined';
import Headline from './Headline';
import UserInformationCard from './UserInformationCard';
import FingerprintOutlinedIcon from '@material-ui/icons/FingerprintOutlined';
import FolderSharedIcon from '@material-ui/icons/FolderShared';
import DesktopWindowsOutlinedIcon from '@material-ui/icons/DesktopWindowsOutlined';
import SchoolIcon from '@material-ui/icons/School';
import CoverImage from 'coverImage/CoverImage';
import NavBar from 'components/Layout/NavBar/NavBar';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import useWindowSize from 'utils/useWindowSize';
import Footer from 'components/Layout/Footer';
import motif from '../../assets/images/motif-image.png';
import { employment, expertSkills, beginnerSkills, intermediateSkills, education } from 'utils/staticData'

type props = {
  //   test: number;
};

const components = [
  {
    id: 1,
    headline: (
      <Headline
        headline="verification and Access"
        icon={<FingerprintOutlinedIcon />}
      />
    ),
    details: [<Verification />]
  },
  {
    id: 2,
    headline: <Headline headline="SkillSet" icon={<FolderSharedIcon />} />,
    details: [
      <UserInformationCard type="skills" data={beginnerSkills} level="Beginner" />,
      <UserInformationCard type="skills" data={intermediateSkills} level="Intermediate" />,
      <UserInformationCard
        type="skills"
        data={expertSkills}
        level="Expert"
        index={true}
      />
    ]
  },
  {
    id: 3,
    headline: (
      <Headline headline="Employment" icon={<DesktopWindowsOutlinedIcon />} />
    ),
    details: [
      <UserInformationCard type="employment" data={employment} />,
    ]
  },
  {
    id: 4,
    headline: <Headline headline="Education" icon={<SchoolIcon />} />,
    details: [
      <UserInformationCard type="education" data={education} />,
    ]
  }
];

const UserDashboard: FC<props> = (props:any) => {

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      props.history.push('/login');
    }
  });

  const size = useWindowSize();
  return (
    <Fragment>
      <div>
        <CoverImage />
      </div>
      <div>
        <NavBar userDashboard={true} />

        <div className="user-dashboard-container mx-auto bg-gray-300">
          <section className="w-4/6 py-10 mx-auto ">
            <small className="flex-1 font-medium text-center text-base pl-2 pr-3 my-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis quisquam modi distinctio libero quo mollitia
              asperiores laboriosam? Nobis molestias distinctio suscipit
              cupiditate necessitatibus, ab corporis repellendus aut explicabo.
              Temporibus, enim. Lorem ipsum dolor sit, amet consectetur
              adipisicing elit. Consequuntur veniam earum, vitae quasi autem
              eaque quam officiis adipisci nostrum hic dolorem ipsa ipsum, odio
              ratione. Error voluptatum asperiores consequuntur laudantium!
            </small>
          </section>
          {size?.width && size?.width > 768 ? (
            <div className="flex flex-nowrap mx-auto w-5/6">
              <Verification monitor={true} />
            </div>
          ) : (
            ''
          )}
          <section className="mb-48">
            {size?.width && size?.width > 768 ? (
              <div className="flex flex-nowrap w-full justify-evenly">
                <div className="flex flex-col w-1/4 mt-12">
                  <section className="mb-16">
                    <Headline
                      headline="Employment"
                      icon={<DesktopWindowsOutlinedIcon />}
                    />
                    <UserInformationCard
                      type="employment"
                      data={employment}
                      index={true}
                    />
                  </section>
                  <section>
                    <Headline headline="Education" icon={<SchoolIcon />} />
                    <UserInformationCard
                      type="education"
                      data={education}
                      index={true}
                    />
                  </section>
                </div>
                <div className="flex flex-col w-1/4 mt-12">
                  <section>
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
                      index={true}
                    />
                  </section>
                </div>
              </div>
            ) : (
              <AccordionMenu components={components} />
            )}
          </section>
        </div>
        {/* c6b7b7 */}
      </div>
      {size?.width && size?.width > 768 && (
        <div
          className="main-background"
          style={{ backgroundColor: '#c6b7b7' }}
        />
      )}
    </Fragment>
  );
};

export default withRouter(UserDashboard);
