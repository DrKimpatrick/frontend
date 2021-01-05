import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addEmployment } from 'redux/actions/employment';
import { EmploymentInput, InitialEmploymentValue } from 'components/Reusable';
import { RootState } from 'redux/store';
import './RecentEmployer.scss';
import { TalentProcess } from 'redux/action-types/user';

interface Props {
  setPreviousStep: (value: string) => void;
}

const RecentEmployer: FC<Props> = () => {
  const dispatch = useDispatch();

  const reducer = useSelector((state: RootState) => {
    const { submitLoading: loading, errors, employment } = state.employments;

    const { message } = state.messages;

    const { user } = state.users;

    return { message, loading, errors, employment, user };
  });

  return (
    <>
      <div className="recent-employer-section m-auto text-gray-texts">
        <div className="containers">
          <div
            className="flex relative h-auto my-8"
            style={{ flexDirection: 'column' }}
          >
            <div style={{ display: 'flex' }}>
              <h1
                className="font-bold text-base title"
                style={{ marginLeft: 0 }}
              >
                Who was your most recent employer?
              </h1>
            </div>

            <EmploymentInput
              initialValue={{
                companyName: '',
                title: '',
                supervisor: {
                  name: '',
                  detail: {
                    email: '',
                    phoneNumber: '',
                    name: ''
                  }
                },
                isCurrentPosition: false,
                responsibilities: [],
                skillsUsed: [],
                favoriteProject: '',
                accomplishments: [],
                responsibility: '',
                accomplishment: '',
                startDate: '',
                endDate: '',
                currentSupervisor: '',
                employmentType: '',
                reference: {
                  name: '',
                  detail: { name: '', phoneNumber: '', email: '' }
                }
              }}
              submit={(values: InitialEmploymentValue) => {
                if (reducer.user) {
                  addEmployment({
                    ...values,
                    user: reducer.user,
                    profileProcess: TalentProcess.SingleEmployment
                  })(dispatch);
                }
              }}
              backendErrors={
                reducer.errors && reducer.errors.errors && reducer.errors.errors
              }
              loading={!!reducer.loading}
              buttonName="Next"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentEmployer;
