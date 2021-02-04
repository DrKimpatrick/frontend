import React from 'react';
import './QuarterList.scss';
import { VerifiedUser, Announcement } from '@material-ui/icons';

interface Props {
  name: string;
  amount: string;
  isPaid: boolean;
}

const QuarterList = (props: Props) => {
  const { name, amount, isPaid } = props;

  return (
    <li className="flex items-center py-2 py-2 rounded-sm quarter">
      <div>{name}</div>
      <div className="flex items-center justify-between">
        <span>{amount}</span>
        {isPaid ? (
          <span className="verified">
            <VerifiedUser />
          </span>
        ) : (
          <span className="notVerified">
            <Announcement />
          </span>
        )}
      </div>
    </li>
  );
};

export default QuarterList;
