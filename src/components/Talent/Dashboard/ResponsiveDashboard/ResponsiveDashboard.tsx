import React, { useState } from 'react';
import {
  DesktopWindowsOutlined,
  School,
  FolderShared,
  Remove,
  Add
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import Headline from '../Headline';
import './ResponsiveDashboard.scss';
import { Education } from '../Education';
import { Employment } from '../Employment';
import { UserSkill } from '../UserSkill';

const useStyle = makeStyles({
  Icon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#514a4a',
    fontSize: '1rem'
  }
});
const ResponsiveDashboard = () => {
  const [showSkill = true, setShowSkill] = useState<boolean>();

  const [showEmployment = false, setShowEmployment] = useState<boolean>();

  const [showEducation = false, setShowEducation] = useState<boolean>();

  const classes = useStyle();

  return (
    <div className="talentResponsive">
      <div className="tItem">
        <div className="tItemHeading px-3 pr-3">
          <div className="tHeadline">
            <Headline headline="SkillSet" icon={<FolderShared />} />
          </div>
          <div
            className="tIcon"
            onClick={() => {
              setShowEducation(false);
              setShowEmployment(false);
              setShowSkill(true);
            }}
          >
            {showSkill ? (
              <Remove className={classes.Icon} />
            ) : (
              <Add className={classes.Icon} />
            )}
          </div>
        </div>
        {showSkill && (
          <div className="tItemBody">
            <UserSkill />
          </div>
        )}
      </div>
      <div className="tItem">
        <div className="tItemHeading px-3 pr-3">
          <div className="tHeadline">
            <Headline headline="Employment" icon={<DesktopWindowsOutlined />} />
          </div>
          <div
            className="tIcon"
            onClick={() => {
              setShowEducation(false);
              setShowEmployment(true);
              setShowSkill(false);
            }}
          >
            {showEmployment ? (
              <Remove className={classes.Icon} />
            ) : (
              <Add className={classes.Icon} />
            )}
          </div>
        </div>
        {showEmployment && (
          <div className="tItemBody">
            <Employment />
          </div>
        )}
      </div>
      <div className="tItem">
        <div className="tItemHeading px-3 pr-3">
          <div className="tHeadline">
            <Headline headline="Education" icon={<School />} />
          </div>
          <div
            className="tIcon"
            onClick={() => {
              setShowEducation(true);
              setShowEmployment(false);
              setShowSkill(false);
            }}
          >
            {showEducation ? (
              <Remove className={classes.Icon} />
            ) : (
              <Add className={classes.Icon} />
            )}
          </div>
        </div>
        {showEducation && (
          <div className="tItemBody">
            <Education />
          </div>
        )}
      </div>
    </div>
  );
};

export default ResponsiveDashboard;
