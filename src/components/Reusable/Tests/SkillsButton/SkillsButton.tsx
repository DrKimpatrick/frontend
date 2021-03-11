import React from 'react';
import './skillsButton.scss';

interface Props {
  javascript?: any;
  python?: any;
}

const SkillsButton = (props: Props) => {
  const { javascript, python } = props;
  return (
    <div>
      <div className="languageFilter flex pt-2">
        <div className="langDiv mr-4">
          {javascript && (
            <button className="language" type="button">
              Javascript
            </button>
          )}
        </div>
        <div className="langDiv">
          {python && (
            <button className="language" type="button">
              Python
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillsButton;
