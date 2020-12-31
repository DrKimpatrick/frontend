import React, { useState } from 'react';
import { UserSkill, VerificationStatus } from 'redux/action-types/skill';
import {
  VerifiedUser,
  DataUsage,
  Announcement,
  Edit,
  Delete
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

interface Props {
  userSkill: UserSkill[];
  level: string;
  editItem: (values: UserSkill) => void;
  deleteItem: (value: string) => void;
}

const useStyles = makeStyles(() => ({
  actionIcon: {
    fontSize: 20
  }
}));

export const SkillItem = (props: Props) => {
  const [currentItem, setCurrentItem] = useState<string>();

  const [action, setAction] = useState<boolean>();

  const { userSkill, level, editItem, deleteItem } = props;

  const styles = useStyles();

  return (
    <div className="w-full">
      <p className="text-right text-xs py-2 pb-2 pr-3">{level}</p>
      {userSkill && userSkill.length > 0 && (
        <ul className="p-0 m-0 bg-card-preview ">
          {userSkill.map((item, i) => (
            <li
              className=" py-2 py-2 rounded-sm"
              key={i}
              onMouseOver={() => {
                setAction(true);
                setCurrentItem(item._id);
              }}
              onMouseLeave={() => {
                setAction(false);
                setCurrentItem(undefined);
              }}
              onClick={() => {
                setAction(true);
                setCurrentItem(item._id);
              }}
            >
              <div className="flex flex-row text-sm justify-between">
                <h4 className="medium-fonts px-4">{item.skill.skill}</h4>
                <div className="flex flex-row">
                  {action && currentItem && currentItem === item._id && (
                    <div className="listAction">
                      <button
                        type="button"
                        onClick={() => editItem(item)}
                        className="edit editEmployment"
                      >
                        <Edit className={styles.actionIcon} />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          deleteItem(item._id);
                        }}
                        className="delete"
                      >
                        <Delete className={styles.actionIcon} />
                      </button>
                    </div>
                  )}
                  {item.verificationStatus === VerificationStatus.Verified && (
                    <VerifiedUser className="verified-color mr-4" />
                  )}
                  {item.verificationStatus ===
                    VerificationStatus.Unverified && (
                    <Announcement className="not-verified-color mr-4" />
                  )}
                  {item.verificationStatus ===
                    VerificationStatus.InProgress && (
                    <DataUsage className="verify-progress-color mr-4" />
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SkillItem;
