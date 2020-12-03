import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArrowBackTwoToneIcon from '@material-ui/icons/ArrowBackTwoTone';
import ArrowRightAltTwoToneIcon from '@material-ui/icons/ArrowRightAltTwoTone';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { RootState } from 'redux/store';
import { listEmployments } from 'redux/actions/employment';
import './EmploymentHistoryList.scss';
import { TalentProcess } from 'redux/action-types/user';
import { setProfileProcess } from 'redux/actions/user';
import { SideLoading } from 'components/Reusable';

interface Props {
  setPreviousStep: (value: string) => void;
}

const EmploymentHistoryList: FC<Props> = props => {
  const dispatch = useDispatch();

  const { setPreviousStep } = props;

  useEffect(() => {
    listEmployments()(dispatch);
  }, [dispatch]);

  const reducer = useSelector((state: RootState) => {
    const { loading, errors, employments } = state.employments;

    const { message } = state.messages;

    const { user } = state.users;

    return { message, loading, errors, employments, user };
  });

  const { employments, user, loading } = reducer;

  if (loading) {
    return (
      <div style={{ marginTop: '200px' }}>
        <SideLoading />
      </div>
    );
  }

  if (!employments) {
    return null;
  }
  return (
    <>
      <section className="employment-history-list-section w-1/3 m-auto text-textGray">
        <div className="flex relative h-auto my-8">
          <div
            className="back-arrow cursor-pointer"
            onClick={() => setPreviousStep(TalentProcess.SingleEmployment)}
          >
            <ArrowBackTwoToneIcon />
          </div>
          <h1 className="font-bold text-xl title">Employment History List</h1>
        </div>

        {employments &&
          employments.map((item, i) => (
            <div
              className="text-textGray mt-4 border border-borderGray card"
              key={i}
            >
              <div className=" text-white font-bold py-3 px-4 card-title">
                {item.companyName} , {item.title}
              </div>
              <div className="py-3 px-4 card-content">
                {new Date(item.startDate).toDateString()}{' '}
                {item.endDate && ` to ${new Date(item.endDate).toDateString()}`}
              </div>
            </div>
          ))}

        <div className="flex justify-center mt-12">
          <button
            data-testid="next-button"
            className="add-employer-btn text-white hover:bg-gray-800 font-semibold py-1 px-3 w-64 rounded-sm shadow flex justify-around"
            onClick={() => setPreviousStep(TalentProcess.RecentEmployer)}
            type="button"
          >
            <span className="">Add another employer</span>
            <AddCircleOutlineOutlinedIcon />
          </button>
        </div>
        <div className="flex justify-center mt-12">
          <button
            data-testid="next-button"
            className="next-btn text-white hover:bg-gray-800 font-semibold py-1 px-3 w-32 rounded-sm shadow flex justify-around"
            onClick={() => {
              if (user) {
                setProfileProcess({
                  userId: user._id,
                  profileProcess: TalentProcess.AddEducation
                })(dispatch);
              }
            }}
            type="button"
          >
            <span className="">Next</span> <ArrowRightAltTwoToneIcon />
          </button>
        </div>
      </section>
    </>
  );
};

export default EmploymentHistoryList;
