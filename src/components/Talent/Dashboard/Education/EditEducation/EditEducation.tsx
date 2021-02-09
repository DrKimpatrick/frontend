import React, { FC, useState, useEffect } from 'react';
import { Modal } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { ArrowBackTwoTone } from '@material-ui/icons';
import { format } from 'date-fns';
import { EducationInput, InitialEducationValue } from 'components/Reusable';
import { Education } from 'redux/action-types/education';
import { updateEducation } from 'redux/actions/education';
import { RootState } from 'redux/store';

interface Props {
  close: () => void;
  education: Education;
}

const EditEducation: FC<Props> = props => {
  const [open, setOpen] = useState<boolean>(true);

  const { close, education } = props;

  const dispatch = useDispatch();

  const reducer = useSelector((state: RootState) => {
    const { loading, errors } = state.educations;
    const { user }: any = state.users;

    const { message } = state.messages;

    return { message, loading, errors, user };
  });

  useEffect(() => {
    if (reducer.message) {
      close();
    }
  }, [reducer.message, close]);

  if (!reducer.user) {
    return null;
  }

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
        close();
      }}
      tabIndex={0}
      style={{ zIndex: 100 }}
    >
      <div className="containers">
        <div className="recent-employer-section">
          <div className="flex relative h-auto my-8 headingSection">
            <button
              className="back-arrow cursor-pointer"
              onClick={() => close()}
              type="button"
            >
              <ArrowBackTwoTone />
            </button>
            <h1 className="font-bold text-base title">Edit Education</h1>
          </div>
          <EducationInput
            initialValue={{
              ...education,
              specialization: '',
              accomplishment: '',
              startDate: format(new Date(education.startDate), 'yyyy-MM-dd'),
              endDate: education.endDate
                ? format(new Date(String(education.endDate)), 'yyyy-MM-dd')
                : '',
              schoolWebsite: education.schoolWebsite
                ? education.schoolWebsite
                : '',
              certificateType: education.certificateType
                ? education.certificateType
                : ''
            }}
            submit={(values: InitialEducationValue) => {
              const { startDate, endDate, isCurrentEducation } = values;
              if (!reducer.user) {
                return null;
              }
              return updateEducation(
                {
                  ...values,
                  startDate: format(new Date(startDate), 'yyyy-MM-dd'),
                  endDate: isCurrentEducation
                    ? undefined
                    : format(new Date(String(endDate)), 'yyyy-MM-dd')
                },
                String(reducer.user._id),
                education._id
              )(dispatch);
            }}
            backendErrors={
              reducer.errors && reducer.errors.errors && reducer.errors.errors
            }
            loading={!!reducer.loading}
            buttonName="Update"
          />
        </div>
      </div>
    </Modal>
  );
};

export default EditEducation;
