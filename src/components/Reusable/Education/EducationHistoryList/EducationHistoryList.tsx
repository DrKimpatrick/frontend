import React, { FC, useEffect } from 'react';
import { format } from 'date-fns';
import ArrowBackTwoToneIcon from '@material-ui/icons/ArrowBackTwoTone';
import ArrowRightAltTwoToneIcon from '@material-ui/icons/ArrowRightAltTwoTone';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { listEducation } from 'redux/actions/education';
import { RootState } from 'redux/store';
import './EducationHistoryList.scss';
import { TalentProcess } from 'redux/action-types/user';
import { setProfileProcess } from 'redux/actions/user';
import { SideLoading } from 'components/Reusable';

interface Props {
  setPreviousStep: (value: string) => void;
}

const EducationHistory: FC<Props> = props => {
  const { setPreviousStep } = props;

  const dispatch = useDispatch();

  const getMonthAndYear = (value: string) => {
    const date = format(new Date(value), 'MMMM yyyy');

    return date;
  };

  useEffect(() => {
    listEducation()(dispatch);
  }, [dispatch]);

  const reducer = useSelector((state: RootState) => {
    const { loading, errors, educations } = state.educations;

    const { message } = state.messages;

    const { user } = state.users;

    return { message, loading, errors, educations, user };
  });

  const { loading, educations, user } = reducer;

  if (loading && loading === true) {
    return (
      <div style={{ marginTop: 200 }}>
        <SideLoading />
      </div>
    );
  }
  return (
    <>
      <section className="education-history-list-section m-auto text-gray-texts">
        <div className="flex relative h-auto my-8">
          <div
            className="back-arrow cursor-pointer"
            onClick={() => setPreviousStep(TalentProcess.SingleEducation)}
          >
            <ArrowBackTwoToneIcon />
          </div>
          <h1 className="font-bold text-xl title">Education History</h1>
        </div>

        {educations &&
          educations.map((item, i) => (
            <div
              className="text-gray-texts mt-4 border border-gray-borders card"
              key={i}
            >
              <div className=" text-white font-bold py-3 px-4 card-title">
                {item.schoolName}
              </div>
              <div className="py-3 px-4 card-content">
                {getMonthAndYear(item.startDate)}{' '}
                {item.endDate && ` to ${getMonthAndYear(item.endDate)}`}
              </div>
            </div>
          ))}

        <div className="flex justify-center mt-12">
          <button
            data-testid="next-button"
            className="add-education-btn text-white hover:bg-gray-800 font-semibold py-1 px-3 w-64 rounded-sm shadow flex justify-around"
            type="button"
            onClick={() => setPreviousStep(TalentProcess.AddEducation)}
          >
            <span className="">Add another school</span>
            <AddCircleOutlineOutlinedIcon />
          </button>
        </div>
        <div className="flex justify-center mt-12">
          <button
            data-testid="next-button"
            className="next-btn text-white hover:bg-gray-800 font-semibold py-1 px-3 w-32 rounded-sm shadow flex justify-around"
            type="button"
            onClick={() => {
              if (user) {
                setProfileProcess({
                  userId: user._id,
                  profileProcess: TalentProcess.Completed
                })(dispatch);
              }
            }}
          >
            <span className="">Next</span> <ArrowRightAltTwoToneIcon />
          </button>
        </div>
      </section>
    </>
  );
};

export default EducationHistory;
