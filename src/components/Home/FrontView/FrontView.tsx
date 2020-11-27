import React, { FC } from 'react';
import { frontData } from 'utils/staticData';
import frontStyles from './FrontView.style';

const FrontView: FC = () => {
  return (
    <frontStyles.FrontContainer data-testid="frontView">
      <frontStyles.FrontText>
        <h1 className="pt-24 text-4xl text-white font-semibold">
          {frontData.title}
        </h1>
        <div className="mt-4 text-white w-2/4 front-mob">
          {frontData.description1}
        </div>
        <div className="mt-4 text-white w-2/4 front-mob">
          {frontData.description2}
        </div>
        <div className="flex justify-between w-2/4 mt-8 pb-8 front-mob">
          <a
            href="/register"
            className="bg-green-500 w-40 text-white font-medium py-2 px-4 rounded text-center m-2"
          >
            Get Started
          </a>
          <button
            className="bg-white w-40 text-green font-medium py-2 px-4 rounded text-center m-2"
            style={{ color: 'green' }}
            type="button"
          >
            Watch Demo
          </button>
        </div>
      </frontStyles.FrontText>
    </frontStyles.FrontContainer>
  );
};

export default FrontView;
