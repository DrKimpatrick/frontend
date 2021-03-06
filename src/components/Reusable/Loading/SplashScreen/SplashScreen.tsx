import React, { FC } from 'react';
import './SplashScreen.scss';
import { BeatLoader } from 'react-spinners';
import { css } from '@emotion/core';
import Logo from 'assets/images/logo-image.png';

const override = css`
  display: block;
  margin-left: 10px;
`;

type splashScreenProps = {
  classes?: string;
};

export const SplashScreen: FC<splashScreenProps> = ({ classes = '' }) => {
  return (
    <div className={`splashScreen ${classes}`}>
      <div className="logo">
        <img src={Logo} alt="logo" />
      </div>
      <div className="loading">
        <h5>Loading</h5>
        <BeatLoader color="#828282" css={override} size={10} />
      </div>
    </div>
  );
};

export default SplashScreen;
