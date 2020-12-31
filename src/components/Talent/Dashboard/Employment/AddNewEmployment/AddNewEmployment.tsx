import React, { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ArrowBackTwoTone } from '@material-ui/icons';
import { Modal } from '@material-ui/core';
import './style.scss';
import { EmploymentInput, InitialEmploymentValue } from 'components/Reusable';
import { addEmployment } from 'redux/actions/employment';
import { RootState } from 'redux/store';

interface Props {
  close: () => void;
}
const AddNewEmployment: FC<Props> = props => {
  const [open = true, setOpen] = useState<boolean>();

  const { close } = props;

  const dispatch = useDispatch();

  const reducer = useSelector((state: RootState) => {
    const { submitLoading: loading, errors } = state.employments;

    const { message } = state.messages;

    return { message, loading, errors };
  });

  useEffect(() => {
    if (reducer.message) {
      close();
    }
  }, [reducer.message, close]);

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
        close();
      }}
      className="addNewEmployment"
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
            <h1 className="font-bold text-base title">
              Who else did you work for?
            </h1>
          </div>
          <EmploymentInput
            initialValue={{
              companyName: '',
              title: '',
              supervisor: {
                name: '',
                detail: { name: '', phoneNumber: '', email: '' }
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
            submit={(values: InitialEmploymentValue) =>
              addEmployment(values)(dispatch)
            }
            backendErrors={
              reducer.errors && reducer.errors.errors && reducer.errors.errors
            }
            loading={!!reducer.loading}
            buttonName="Save"
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddNewEmployment;
