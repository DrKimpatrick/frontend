import React from 'react';
import { User } from 'redux/actions/user';
import Avatar from 'assets/images/avatar.jpg';
import './ProfilePreview.scss';

interface Props {
  user: User;
}

const ProfilePreview = (props: Props) => {
  const { user } = props;
  return (
    <div className="profilePreview">
      <div className="profilePicture">
        <img src={user.profilePicture ? user.profilePicture : Avatar} alt="" />
      </div>
      <div className={`preview ${!user.bio ? 'm40' : 'm20'}`}>
        <h5 className="title">{user.username}</h5>
        {user.bio && <div className="biography">{user.bio}</div>}
      </div>
    </div>
  );
};

export default ProfilePreview;
