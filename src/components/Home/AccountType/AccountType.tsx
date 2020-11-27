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
        <section className="account-status flex items-center">
          <div className="px-6 py-4">
            {description.split('\n').map((str, index) => (
              <p key={index} className="text-gray-700 text-sm">
                {str}
              </p>
            ))}
          </div>
          <div
            className={`account-hovered ${
              clicked ? 'clicked' : ''
            } px-6 py-4 border-t-2 flex items-center justify-center`}
          >
            <div className="text-white flex justify-center">
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
