import React, { FC } from 'react';

interface Props {
  assessmentItems: any[];
  activeTab: string;
  updateActiveTab(tab: string): any;
}

const AssessmentTab: FC<Props> = props => {
  const { assessmentItems, activeTab, updateActiveTab } = props;

  return (
    <ul className="flex flex-nowrap justify-between assessment-items-ul">
      {assessmentItems.map((item, i) => (
        <li
          className={activeTab === item.item ? 'assessment-active' : ''}
          key={i}
        >
          <div
            onClick={() => updateActiveTab(item.item)}
            className="flex flex-nowrap text-sm text-gray-600"
          >
            <span className="px-2 text-xs">{item.icon}</span>{' '}
            <span className="px-2">{item.item}</span>
          </div>
          <div
            className={activeTab === item.item ? 'assessment-active-line' : ''}
          >
            {' '}
          </div>
          <div className="assessment-line"> </div>
        </li>
      ))}
    </ul>
  );
};

export default AssessmentTab;
