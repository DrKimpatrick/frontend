import React, { FC } from 'react';
import ComputerIcon from '@material-ui/icons/Computer';
import SchoolIcon from '@material-ui/icons/School';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import WorkIcon from '@material-ui/icons/Work';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

type accountsProps = {
  title: string;
  description: string;
};

const AccountType: FC<accountsProps> = ({ title, description }) => {
  return (
    <div data-testid="accountType" className="mt-12 ml-4 mr-4 account-type">
      <div className="rounded overflow-hidden shadow-lg mainColor">
        <div className="bg-blue-200 account-type-header text-white flex justify-center pt-4 pb-4">
          {title === 'Talent' ? (
            <ComputerIcon />
          ) : title === 'Education' ? (
            <SchoolIcon />
          ) : title === 'Training' ? (
            <ImportContactsIcon />
          ) : (
            <WorkIcon />
          )}
          <p className="pl-4">{title.toUpperCase()}</p>
        </div>
        <section className="account-status">
          <div className="px-6 py-4 ">
            {/* <div className="font-bold text-xl mb-2">The Coldest Sunset</div> */}
            <p className="text-gray-700 text-base">{description}</p>
          </div>
          <div className="account-hovered px-6 py-4 border-t-2 ">
            <div className="text-white flex justify-center mt-8">
              {title === 'Talent' ? <CheckCircleIcon /> : <TrendingUpIcon />}

              {title === 'Talent' ? (
                <p className="pl-4">Recommended</p>
              ) : (
                <p className="pl-4">Trending</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AccountType;
