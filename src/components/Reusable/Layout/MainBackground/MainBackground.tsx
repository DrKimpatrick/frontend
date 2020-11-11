import React, { FC } from 'react';
import Image from 'assets/images/motif-image.png';
import './style.scss';

interface Props {
  allowImageColor?: boolean;
}
const MainBackground: FC<Props> = props => {
  const { allowImageColor } = props;

  return (
    <div className="mainBackground">
      <img
        src={Image}
        alt=""
        style={
          allowImageColor
            ? { backgroundColor: '#c4bdbd' }
            : { backgroundColor: 'none' }
        }
      />
    </div>
  );
};

export default MainBackground;
