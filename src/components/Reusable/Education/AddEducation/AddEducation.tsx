import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ArrowBackTwoTone } from '@material-ui/icons';
import { EducationInput, InitialEducationValue } from 'components/Reusable';
import { addEducation } from 'redux/actions/education';
import { format } from 'date-fns';
import { RootState } from 'redux/store';
import './AddEducation.scss';
import { TalentProcess } from 'redux/action-types/user';

interface Props {
  setPreviousStep: (value: string) => void;
}
const AddEducation: FC<Props> = props => {
  const { setPreviousStep } = props;

  const dispatch = useDispatch();

  const reducer = useSelector((state: RootState) => {
    const { loading, errors, education } = state.educations;

    const { message } = state.messages;

    const { user } = state.users;

    return { message, loading, errors, education, user };
  });

  return (
    <>
      <div className="recent-employer-section m-auto text-gray-texts">
        <div className="containers">
          <div className="flex relative h-auto my-8">
            <button
              className="back-arrow cursor-pointer"
              type="button"
              onClick={() => setPreviousStep(TalentProcess.ListEmployment)}
            >
              <ArrowBackTwoTone />
            </button>
            <h1 className="font-bold text-base title">
              What was the last school you attended?
            </h1>
          </div>
          <EducationInput
            initialValue={{
              schoolName: '',
              schoolWebsite: '',
              level: '',
              degreeOrCertification: '',
              certificateType: '',
              isCurrentEducation: false,
              specializations: [],
              specialization: '',
              accomplishments: [],
              accomplishment: '',
              startDate: '',
              endDate: ''
            }}
            submit={(values: InitialEducationValue) => {
              if (reducer.user) {
                const { startDate, endDate } = values;
                addEducation(
                  {
                    ...values,
                    startDate: format(new Date(startDate), 'yyyy-MM-dd'),
                    endDate: format(new Date(String(endDate)), 'yyyy-MM-dd')
                  },
                  {
                    profileProcess: TalentProcess.SingleEducation,
                    userId: reducer.user._id
                  }
                )(dispatch);
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
    </>
  );
};

export default AddEducation;
