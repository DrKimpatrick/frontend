import React, { FC } from 'react';
import './CodingRunner.scss';

interface Props {
  items?: any;
}

const CodingRunner: FC<Props> = () => {
  return (
    <div className="codingQuestionRunner">
      <div className="flex justify-end items-center outputHeading">
        <span>Output</span>
        <span>Test: 0 pass / 2 fail</span>
      </div>
      <div className="runner">
        <span className="placeHolder">Runner</span>
      </div>
    </div>
  );
};

export default CodingRunner;
