import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { get } from 'lodash';
import { Image, SideLoading } from 'components/Reusable';
import './AdminProfile.scss';

const image =
  'https://www.qualitylogic.com/wp-content/uploads/2018/09/learning.svg';

const AdminProfile = () => {
  const reducer = useSelector((state: RootState) => {
    const { user } = state.users;

    return { user };
  });

  const { user } = reducer;

  if (!user) {
    return null;
  }

  return (
    <div className="adminProfile">
      <div className="coverImage min-w-0 bg-clip-border relative cover-image w-full">
        <Suspense fallback={<SideLoading />}>
          <Image src={image} />
        </Suspense>
      </div>
      <div className="userDetail">
        <div className="username">{get(user, 'username', 'None')}</div>
        {user && user.bio && <div className="bio">{user.bio}</div>}
      </div>
    </div>
  );
};

export default AdminProfile;
