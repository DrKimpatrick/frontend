import React, { FC, useState, useEffect } from 'react';
import ArrowRightAltTwoToneIcon from '@material-ui/icons/ArrowRightAltTwoTone';
import { SKILL_RANKING } from 'constants/draggable-types';
import './SkillRanking.scss';
import { addedSkillsUser } from 'redux/actions/user';
import { AddSkill } from 'redux/action-types/skill';
import { VerificationStatus } from 'redux/action-types/education';
import { useDispatch, useSelector } from 'react-redux';
import { TalentProcess } from 'redux/action-types/user';
import DraggableArea from './DraggableArea';
import SkillComponent from './SkillComponent';

interface Props {
  setPreviousStep: (value: string) => void;
}

const SkillRanking: FC<Props> = () => {
  const dispatch = useDispatch();

  const reducer = useSelector((state: any) => state.users);

  const [skills, setSkills] = useState<
    {
      _id: string;
      skill: string;
    }[]
  >([]);

  const [beginnerskills, setBeginnerskills] = useState<
    {
      _id: string;
      skill: string;
    }[]
  >([]);
  const [intermediateskills, setIntermediateskills] = useState<
    {
      _id: string;
      skill: string;
    }[]
  >([]);
  const [advancedskills, setAdvancedskills] = useState<
    {
      _id: string;
      skill: string;
    }[]
  >([]);

  useEffect(() => {
    if (reducer.skills) {
      setSkills(reducer.skills);
    }
  }, [reducer.loading, reducer.skills]);

  const submitSkills = async () => {
    const allSkills: AddSkill[] = [];

    beginnerskills.map(skill =>
      allSkills.push({
        skill: skill._id,
        level: 'beginner',
        verificationStatus: VerificationStatus.Unverified
      })
    );
    intermediateskills.map(skill =>
      allSkills.push({
        skill: skill._id,
        level: 'intermediate',
        verificationStatus: VerificationStatus.Unverified
      })
    );
    advancedskills.map(skill =>
      allSkills.push({
        skill: skill._id,
        level: 'advanced',
        verificationStatus: VerificationStatus.Unverified
      })
    );

    if (reducer.user) {
      addedSkillsUser(allSkills, {
        profileProcess: TalentProcess.RecentEmployer,
        userId: reducer.user._id
      })(dispatch);
    }
  };

  const onDropSkill = ({ skill, index, area }: any, droppedOn: string) => {
    if (area === droppedOn) {
      return;
    }
    switch (area) {
      case 'skills': {
        const newSkills = skills.filter((_: any, i: any) => i !== index);
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
    <>
      <section className="skill-ranking-section m-auto text-gray-texts">
        <div className="flex relative h-auto my-8">
          <h1 className="font-bold text-xl title" style={{ marginLeft: 0 }}>
            Tell us how awesome you are
          </h1>
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
          <span className="" />
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
            onClick={submitSkills}
            type="button"
          >
            <span className="">Next</span> <ArrowRightAltTwoToneIcon />
          </button>
        </div>
      </section>
    </>
  );
};

export default SkillRanking;
