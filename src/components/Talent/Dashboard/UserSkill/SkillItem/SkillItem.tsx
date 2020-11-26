import React from 'react';
import { UserSkill, VerificationStatus } from 'redux/action-types/skill';
import { VerifiedUser, DataUsage, Announcement } from '@material-ui/icons';

interface Props {
  userSkill: UserSkill[];
  level: string;
}
export const SkillItem = (props: Props) => {
  const { userSkill, level } = props;

  return (
    <div className="w-full">
      <p className="text-right text-xs py-4 pb-6">{level}</p>
      {userSkill && userSkill.length > 0 && (
        <ul className="p-0 m-0 bg-card-preview ">
          {userSkill.map((item, i) => (
            <li className=" py-2 py-2 rounded-sm" key={i}>
              <div className="flex flex-row text-sm justify-between">
                <h4 className="medium-fonts px-4">{item.skill.skill}</h4>
                {item.verificationStatus === VerificationStatus.Verified && (
                  <VerifiedUser className="verified-color mr-4" />
                )}
                {item.verificationStatus === VerificationStatus.Unverified && (
                  <Announcement className="not-verified-color mr-4" />
                )}
                {item.verificationStatus === VerificationStatus.InProgress && (
                  <DataUsage className="verify-progress-color mr-4" />
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SkillItem;
