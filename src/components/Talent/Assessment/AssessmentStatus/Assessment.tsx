import React, { FC } from 'react';

type Props = {
  assessments: any[];
};

type Status = {
  status: string;
  marks?: number;
};

const Status: FC<Status> = props => {
  const { status, marks } = props;
  switch (status) {
    case 'inprogress':
      return (
        <>
          <button type="button" className="inprogress btn-border-none">
            In progress
          </button>
        </>
      );
    case 'incomplete':
      return (
        <>
          <button type="button" className="incomplete btn-border-none">
            Incomplete
          </button>
        </>
      );
    case 'rejected':
      return (
        <>
          <button type="button" className="reject btn-border-none">
            Rejected
          </button>
        </>
      );
    case 'failed':
      return (
        <>
          <button type="button" className="failed  btn-border">
            Failed
          </button>
          <button type="button" className="failed">
            {marks}%
          </button>
        </>
      );
    default:
      return <h3>Not specified</h3>;
  }
};

const AssessmentStatus: FC<Props> = ({ assessments }) => {
  return (
    <div className="new-assessment-container">
      <div className="w-full">
        {assessments.length > 0 && (
          <ul className="p-0 m-0 bg-card-preview ">
            {assessments.map((item, i) => (
              <li key={i} className=" py-2 py-2 rounded-sm">
                <div className="flex flex-row text-sm justify-between">
                  <h4 className="medium-fonts px-4">{item.item}</h4>
                  <div className="assessmentListAction2">
                    <Status status={item.status} marks={item.marks} />
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

export { AssessmentStatus };
