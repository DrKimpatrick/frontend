import React, { FC } from 'react';
import { frontData } from 'utils/staticData';
import frontStyles from './FrontView.style';

const FrontView: FC = () => {
  return (
    <frontStyles.FrontContainer data-testid="frontView">
      <frontStyles.FrontText>
        <frontStyles.TopHeading className="pt-24 text-4xl text-white font-semibold">
          {frontData.title}
        </frontStyles.TopHeading>
        <div className="mt-4 text-white w-2/4 front-mob">
          <frontStyles.FrontViewList>
            {frontData.list1.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </frontStyles.FrontViewList>
        </div>
        <div className="mt-4 text-white w-4/6 front-mob">
          <frontStyles.H5Title className="mb-1">
            {frontData.title2}
          </frontStyles.H5Title>
          <frontStyles.FrontViewList>
            {frontData.list2.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </frontStyles.FrontViewList>
        </div>
        <frontStyles.ButtonDiv className="flex justify-between w-2/4 mt-8 pb-8 front-mob">
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
        </frontStyles.ButtonDiv>
      </frontStyles.FrontText>
    </frontStyles.FrontContainer>
  );
};

export default FrontView;
