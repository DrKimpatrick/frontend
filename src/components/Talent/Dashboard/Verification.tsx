import React, { FC } from 'react';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import AnnouncementIcon from '@material-ui/icons/Announcement';

type props = {
  monitor?: boolean;
};
const Verification: FC<props> = ({ monitor }) => {
  return (
    <>
      <div className="w-full my-3">
        <ul
          className={`${
            (monitor && 'flex justify-between mx-auto w-4/5') || 'p-0 m-0'
          }`}
        >
          <li className="pb-4">
            <div className="flex flex-row text-sm">
              <VerifiedUserIcon className="verified-color" />
              <h4 className="verified-color px-4">Certified and Verified</h4>
            </div>
          </li>
          <li className="pb-4">
            <div className="flex flex-row text-sm">
              <DataUsageIcon className="verify-progress-color" />
              <h4 className="verify-progress-color px-4">
                Verification in progress
              </h4>
            </div>
          </li>
          <li className="pb-4">
            <div className="flex flex-row text-sm">
              <AnnouncementIcon className="not-verified-color" />
              <h4 className="not-verified-color px-4">Not Verified</h4>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Verification;
