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
  clicked?: boolean;
  setStepName?: (value: string) => void;
};

const AccountType: FC<accountsProps> = ({
  title,
  description,
  clicked = false,
  setStepName
}) => {
  return (
    <div
      data-testid="accountType"
      className="account-type"
      onClick={() => {
        if (setStepName) {
          setStepName(title);
        }
      }}
    >
      <div className="rounded overflow-hidden shadow-lg mainColor">
        <div className="bg-blue-200 py-4 account-type-header text-white flex justify-center items-center">
          {title === 'Talent' ? (
            <ComputerIcon />
          ) : title === 'Education' ? (
            <SchoolIcon />
          ) : title === 'Training' ? (
            <ImportContactsIcon />
          ) : (
            <WorkIcon />
          )}
          <p className="ml-4 account-type-title">{title.toUpperCase()}</p>
        </div>
        <section className="account-status flex items-center">
          <div className="px-6 py-4 account-type-main-content">
            {description.split('\n').map((str, index) => (
              <p key={index} className="text-gray-700 text-sm">
                {str}
              </p>
            ))}
          </div>
          <div
            className={`account-hovered ${
              clicked ? 'clicked' : ''
            } px-6 py-4 border-t-2 flex justify-center items-center`}
          >
            <div className="text-white flex justify-center items-center">
              {title === 'Talent' ? <CheckCircleIcon /> : <TrendingUpIcon />}

              {title === 'Talent' ? (
                <p className="ml-4">Recommended</p>
              ) : (
                <p className="ml-4">Trending</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AccountType;
