import React, { FC } from 'react';

type Props = {
  assessments: any[];
  marks: number;
};

const AssessmentPassed: FC<Props> = ({ assessments, marks }) => {
  return (
    <div className="new-assessment-container">
      <div className="w-full">
        {assessments.length > 0 && (
          <ul className="p-0 m-0 bg-card-preview ">
            {assessments.map((item, i) => (
              <li key={i} className=" py-2 py-2 rounded-sm">
                <div className="flex flex-row text-sm justify-between">
                  <h4 className="medium-fonts px-4">{item}</h4>
                  <div className="assessmentListAction">
                    <button type="button" className="passed">
                      Passed
                    </button>
                    <button type="button" className="passed">
                      {marks}%
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export { AssessmentPassed };
