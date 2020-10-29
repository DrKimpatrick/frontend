import React, { FC } from 'react';
import Image from '../../../assets/images/motif-image.png';
import './style.scss';

const MainBackground: FC = () => {
  return (
    <div className="mainBackground">
      <img src={Image} alt="" />
    </div>
  );
};

export default MainBackground;
