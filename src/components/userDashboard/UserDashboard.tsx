import AccordionMenu from 'components/accordion/AccordionMenu';
import Avatars from 'components/avatar/Avatars';
import React, { Fragment, FC } from 'react';
import Verification from './Verification';
import FilterListOutlinedIcon from '@material-ui/icons/FilterListOutlined';
import Headline from './Headline';
import UserInformationCard from './UserInformationCard';
import FingerprintOutlinedIcon from '@material-ui/icons/FingerprintOutlined';
import FolderSharedIcon from '@material-ui/icons/FolderShared';
import DesktopWindowsOutlinedIcon from '@material-ui/icons/DesktopWindowsOutlined';
import SchoolIcon from '@material-ui/icons/School';

type props = {
  //   test: number;
};

export const data = [
  {
    id: 1,
    name: 'angula',
    status: 'verified'
  },
  {
    id: 3,
    name: 'Reat',
    status: 'unverified'
  },
  {
    id: 2,
    name: 'aPy',
    status: 'processing'
  }
];

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
    headline: (
      <Headline headline="SkillSet" icon={<FolderSharedIcon />} />
    ),
    details: [
      <UserInformationCard data={data} level="Beginner" />,
      <UserInformationCard data={data} level="Expert" />
    ]
  },
  {
    id: 3,
    headline: (
      <Headline headline="Employment" icon={<DesktopWindowsOutlinedIcon />} />
    ),
    details: [
      <UserInformationCard data={data} level="Beginner" />,
      <UserInformationCard data={data} level="Expert" />
    ]
  },
  {
    id: 4,
    headline: (
      <Headline headline="Education" icon={<SchoolIcon />} />
    ),
    details: [
      <UserInformationCard data={data} level="Beginner" />,
      <UserInformationCard data={data} level="Expert" />
    ]
  }
];

const UserDashboard: FC<props> = () => {
  return (
    <Fragment>
      <div className="container mx-auto">
        <section className="flex mx-auto w-2/4 justify-center items-center">
          <div className="my-3 mx-3 flex-initial">
            <Avatars />
          </div>
          <small className="flex-1 font-medium text-left text-base pl-2 pr-3 my-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis quisquam modi distinctio libero quo mollitia asperiores
            laboriosam? Nobis molestias distinctio suscipit cupiditate
            necessitatibus, ab corporis repellendus aut explicabo. Temporibus,
            enim.
          </small>
        </section>
        <section className="flex flex-row flex-no-wrap justify-center my-5 mx-auto w-2/4">
          <input
            type="text"
            className="border border-grey-600 w-full  h-10 rounded-sm px-3 placeholder-gray-500 placeholder-opacity-25"
            placeholder="Search"
          />
          <div className="flex text-blue-600 hover:text-red-600 text-1xl py-2 mx-2">
            <FilterListOutlinedIcon />
            <span>Filter</span>
          </div>
        </section>
        <section>
          <AccordionMenu components={components} />
        </section>
      </div>
    </Fragment>
  );
};

export default UserDashboard;
