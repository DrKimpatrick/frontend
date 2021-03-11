import React from 'react';
import { SkillsButton } from 'components/Reusable';
import './SkillFilter.scss';

const SkillsFilter = () => {
  return (
    <div>
      <div className="title text-xl">
        <h1>Skills</h1>
      </div>
      <SkillsButton javascript python />
      <div className="filterDesc pt-10">
        <p className="text-xs">
          Showing 29 question(s) that satisfy the criteria
        </p>
      </div>
    </div>
  );
};

export default SkillsFilter;
