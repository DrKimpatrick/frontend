import React from 'react';
import './NoItemFound.scss';
import Image from 'assets/images/itemNotFound.png';

interface Props {
  message?: string;
}

const NoItemFound = (props: Props) => {
  const { message } = props;
  return (
    <div className="noItemFound">
      <div className="notItemImage">
        <img src={Image} alt="" />
      </div>
      <div className="message">{message || 'No result found'}</div>
    </div>
  );
};

export default NoItemFound;
