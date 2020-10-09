import React, { FC, Fragment } from 'react';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import AnnouncementIcon from '@material-ui/icons/Announcement';

type props = {
  level?: string;
  data: Array<any>;
};

const UserInformationCard: FC<props> = ({ level, data }) => {
  return (
    <Fragment>
      <div className="w-full">
        <p className="text-right text-xs py-4 pb-6">{level}</p>
        <ul className="p-0 m-0 bg-card-preview ">
          {data.map((info: any) => (
            <li className=" py-2 py-2 rounded-sm">
              <div className="flex flex-row text-sm justify-between">
                <h4 className="medium-fonts px-4">{info.name}</h4>
                {info.status === 'verified' ? (
                  <VerifiedUserIcon className="verified-color mr-4" />
                ) : info.status === 'processing' ? (
                  <DataUsageIcon className="verify-progress-color mr-4" />
                ) : info.status === 'unverified' ? (
                  <AnnouncementIcon className="not-verified-color mr-4" />
                ) : (
                  ''
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default UserInformationCard;
