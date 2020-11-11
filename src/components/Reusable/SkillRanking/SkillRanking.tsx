import React, { FC, Fragment, useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import ArrowBackTwoToneIcon from '@material-ui/icons/ArrowBackTwoTone';
import ArrowRightAltTwoToneIcon from '@material-ui/icons/ArrowRightAltTwoTone';
import SkillComponent from './SkillComponent';
import DraggableArea from './DraggableArea';
import { SKILL_RANKING } from 'constants/draggable-types';
import NavBar from 'components/Reusable/Layout/NavBar/NavBar';
import './SkillRanking.scss';


const rawSkills = [
  { id: 5, label: 'BDD' },
  { id: 5, label: 'SQL' },
  { id: 5, label: 'HTML' },
  { id: 5, label: 'BDD' },
  { id: 5, label: 'SQL' },
  { id: 5, label: 'HTML' },
  { id: 5, label: 'BDD' },
  { id: 5, label: 'SQL' },
  { id: 5, label: 'HTML' },
  { id: 5, label: 'React' }
];

type props = {};
const SkillRanking: FC<props> = (props: any) => {
  const history = useHistory();
  const [skills, setSkills] = useState<
    {
      id: number;
      label: string;
    }[]
  >(rawSkills);

  const [beginnerskills, setBeginnerskills] = useState<
    {
      id: number;
      label: string;
    }[]
  >([]);
  const [intermediateskills, setIntermediateskills] = useState<
    {
      id: number;
      label: string;
    }[]
  >([]);
  const [advancedskills, setAdvancedskills] = useState<
    {
      id: number;
      label: string;
    }[]
  >([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      props.history.push('/login');
    }
  });


  console.log('greeeeeeee', beginnerskills, intermediateskills, advancedskills)
  const onDropSkill = ({ skill, index, area }: any, droppedOn: string) => {
    if (area === droppedOn) {
      return;
    }
    switch (area) {
      case 'skills': {
        const newSkills = skills.filter((_, i) => i !== index);
        setSkills(newSkills);

        switch (droppedOn) {
          case 'beginner':
            setBeginnerskills([...beginnerskills, skill]);
            break;
          case 'intermediate':
            setIntermediateskills([...intermediateskills, skill]);
            break;
          case 'advanced':
            setAdvancedskills([...advancedskills, skill]);
            break;

          default:
            break;
        }

        break;
      }
      case 'beginner': {
        const newSkills = beginnerskills.filter((_, i) => i !== index);
        setBeginnerskills(newSkills);

        switch (droppedOn) {
          case 'skills':
            setSkills([...skills, skill]);
            break;
          case 'intermediate':
            setIntermediateskills([...intermediateskills, skill]);
            break;
          case 'advanced':
            setAdvancedskills([...advancedskills, skill]);
            break;

          default:
            break;
        }

        break;
      }
      case 'intermediate': {
        const newSkills = intermediateskills.filter((_, i) => i !== index);
        setIntermediateskills(newSkills);

        switch (droppedOn) {
          case 'skills':
            setSkills([...skills, skill]);
            break;
          case 'beginner':
            setBeginnerskills([...beginnerskills, skill]);
            break;
          case 'advanced':
            setAdvancedskills([...advancedskills, skill]);
            break;

          default:
            break;
        }

        break;
      }
      case 'advanced': {
        const newSkills = advancedskills.filter((_, i) => i !== index);
        setAdvancedskills(newSkills);

        switch (droppedOn) {
          case 'skills':
            setSkills([...skills, skill]);
            break;
          case 'beginner':
            setBeginnerskills([...beginnerskills, skill]);
            break;
          case 'intermediate':
            setIntermediateskills([...intermediateskills, skill]);
            break;

          default:
            break;
        }

        break;
      }

      default:
        break;
    }
  };

  const onRemove = ({ index, area }: any) => {
    switch (area) {
      case 'skills': {
        const newSkills = skills.filter((_, i) => i !== index);
        setSkills(newSkills);

        break;
      }
      case 'beginner': {
        const newSkills = beginnerskills.filter((_, i) => i !== index);
        setBeginnerskills(newSkills);

        break;
      }
      case 'intermediate': {
        const newSkills = intermediateskills.filter((_, i) => i !== index);
        setIntermediateskills(newSkills);

        break;
      }
      case 'advanced': {
        const newSkills = advancedskills.filter((_, i) => i !== index);
        setAdvancedskills(newSkills);

        break;
      }

      default:
        break;
    }
  };

  return (
    <Fragment>
      <NavBar />
      <section className="skill-ranking-section w-1/3 m-auto text-textGray">
        <div className="flex relative h-auto my-8">
          <div
            className="back-arrow cursor-pointer"
            onClick={() => history.push('/current-role')}
          >
            <ArrowBackTwoToneIcon />
          </div>
          <h1 className="font-bold text-xl title">Rank your skillset!</h1>
        </div>

        <div className="mt-6">
          <DraggableArea
            types={SKILL_RANKING}
            onDrop={(e: any) => onDropSkill(e, 'skills')}
            title="My Skills"
          >
            {skills.map((skill, index) => (
              <SkillComponent
                area="skills"
                key={Math.random()}
                index={index}
                skill={skill}
                onRemove={onRemove}
                moveSkill={onDropSkill}
              />
            ))}
          </DraggableArea>
        </div>
        <div className="mt-6">
          <DraggableArea
            types={SKILL_RANKING}
            onDrop={(e: any) => onDropSkill(e, 'beginner')}
            title="Beginner"
            titleClass="text-green-700"
          >
            {beginnerskills.map((skill, index) => (
              <SkillComponent
                area="beginner"
                key={Math.random()}
                index={index}
                skill={skill}
                onRemove={onRemove}
                moveSkill={onDropSkill}
              />
            ))}
          </DraggableArea>
        </div>
        <div className="mt-6">
          <DraggableArea
            types={SKILL_RANKING}
            onDrop={(e: any) => onDropSkill(e, 'intermediate')}
            title="Intermediate"
            titleClass="text-blue-700"
          >
            {intermediateskills.map((skill, index) => (
              <SkillComponent
                area="intermediate"
                key={Math.random()}
                index={index}
                skill={skill}
                onRemove={onRemove}
                moveSkill={onDropSkill}
              />
            ))}
          </DraggableArea>
        </div>
        <div className="mt-6">
          <span className=""></span>
          <DraggableArea
            types={SKILL_RANKING}
            onDrop={(e: any) => onDropSkill(e, 'advanced')}
            title="Advanced"
            titleClass="text-black"
          >
            {advancedskills.map((skill, index) => (
              <SkillComponent
                area="advanced"
                key={Math.random()}
                index={index}
                skill={skill}
                onRemove={onRemove}
                moveSkill={onDropSkill}
              />
            ))}
          </DraggableArea>
        </div>
        <div className="flex justify-center mt-12">
          <button
            className="next-btn text-white hover:bg-gray-800 font-semibold py-1 px-3 w-32 rounded-sm shadow flex justify-around"
            onClick={() => history.push('/recent-employer')}
          >
            <span className="">Next</span> <ArrowRightAltTwoToneIcon />
          </button>
        </div>
      </section>
    </Fragment>
  );
};

export default withRouter(SkillRanking);
