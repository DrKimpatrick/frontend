import React, { FC } from 'react';
import { useDrag } from 'react-dnd';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertTwoToneIcon from '@material-ui/icons/MoreVertTwoTone';
import ClearIcon from '@material-ui/icons/Clear';
import AdjustIcon from '@material-ui/icons/Adjust';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import './SkillComponent.scss';

import { SKILL_RANKING } from 'constants/draggable-types';

const ITEM_HEIGHT = 48;

type props = {
  skill: any;
  index: number;
  area: string;
  onRemove: ({ skill, index, area }: any) => void;
  moveSkill: (
    { skill, index, area }: any,
    droppedOn: string
  ) => undefined | void;
};
const SkillComponent: FC<props> = ({
  skill,
  index,
  area,
  onRemove,
  moveSkill
}: any) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const options = [
    {
      id: 'remove',
      label: 'Remove',
      icon: <ClearIcon fontSize="small" />,
      onClick: () => onRemove({ skill, index, area })
    },
    {
      id: 'beginner',
      label: 'Beginner',
      icon: <RadioButtonUncheckedIcon fontSize="small" />,
      onClick: () => moveSkill({ skill, index, area }, 'beginner')
    },
    {
      id: 'intermediate',
      label: 'Intermediate',
      icon: <AdjustIcon fontSize="small" />,
      onClick: () => moveSkill({ skill, index, area }, 'intermediate')
    },
    {
      id: 'advanced',
      label: 'Advanced',
      icon: <RadioButtonCheckedIcon fontSize="small" />,
      onClick: () => moveSkill({ skill, index, area }, 'advanced')
    }
  ];

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [{ isDragging }, dragRef] = useDrag({
    item: {
      id: index,
      index,
      area,
      skill,
      type: SKILL_RANKING
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  return (
    <div className="ml-2 mb-2 h-8 skill-container mx-4" ref={dragRef}>
      <div
        className="w-auto p-1  inline-flex items-center skill"
        style={{
          userSelect: 'none',
          opacity: isDragging ? 0 : 1,
          backgroundColor: '#fafafa',
          borderRadius: '1px',
          boxShadow: '0px 1px 2px rgba(0,0,0,0.2)'
        }}
      >
        <div className="cursor-pointer label-icon" onClick={handleClick}>
          <MoreVertTwoToneIcon fontSize="small" />
        </div>

        <div className="label-text cursor-move">
          <span>{skill.label}</span>
        </div>
      </div>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 'auto'
          }
        }}
        className="skill-menu"
      >
        {options.map(option => (
          <MenuItem
            key={option.label}
            onClick={option.onClick}
            className="bg-black"
          >
            <div className="">
              {option.icon}
              <span className="ml-3">{option.label}</span>
            </div>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default SkillComponent;
