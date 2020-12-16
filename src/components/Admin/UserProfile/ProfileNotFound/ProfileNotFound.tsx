import React from 'react';
import './ProfileNotFound.scss';
import { useHistory } from 'react-router-dom';
import Image from 'assets/images/profileNotFound.png';
import { ArrowBack } from '@material-ui/icons';
import { Routes } from 'utils/routes';

export const ProfileNotFound = () => {
  const history = useHistory();

  return (
    <div className="profileNotFound flex justify-center items-center">
      <div className="notFoundContainer">
        <div className="details">
          <div className="notFoundImage">
            <img src={Image} alt="profile not found" />
          </div>
          <div className="message text-center my-5 font-bold">
            Profile is not available
          </div>
        </div>
        <div className="my-5 w-full">
          <button
            type="button"
            onClick={() => history.push(Routes.SuperAdminDashboard)}
            className="flex items-center justify-center text-center w-full"
            style={{ color: '#b3adad', outline: 'none', border: 'none' }}
            id="goBack"
          >
            <ArrowBack />
            <h5 className="mx-3 text-sm">go to dashboard</h5>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileNotFound;
