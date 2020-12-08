import React, { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ArrowBackTwoTone } from '@material-ui/icons';
import { Modal } from '@material-ui/core';
import { format } from 'date-fns';
import '../AddNewEmployment/style.scss';
import { EmploymentInput, InitialEmploymentValue } from 'components/Reusable';
import { updateEmployment } from 'redux/actions/employment';
import { RootState } from 'redux/store';
import { Employment } from 'redux/action-types/employment';
import { get } from 'lodash';

interface Props {
  close: () => void;
  employment: Employment;
}
const EditEmployment: FC<Props> = props => {
  const [open = true, setOpen] = useState<boolean>();

  const { close, employment } = props;

  const {
    responsibilities,
    accomplishments,
    favoriteProject,
    startDate,
    endDate
  } = employment;

  const dispatch = useDispatch();

  const reducer = useSelector((state: RootState) => {
    const { loading, errors } = state.employments;

    const { message } = state.messages;

    return { message, loading, errors };
  });

  useEffect(() => {
    if (reducer.message) {
      close();
    }
  }, [reducer.message, close]);

  if (!employment) {
    return null;
  }

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
        <div className="recent-employer-section w-1/3 m-auto text-textGray">
          <div className="flex relative h-auto my-8">
            <button
              className="back-arrow cursor-pointer"
              onClick={() => close()}
              type="button"
            >
              <ArrowBackTwoTone />
            </button>
            <h1 className="font-bold text-base title">Edit Employment</h1>
          </div>
          <EmploymentInput
            initialValue={{
              ...employment,
              responsibility: '',
              accomplishment: '',
              accomplishments:
                accomplishments && accomplishments.length > 0
                  ? accomplishments
                  : [],
              responsibilities:
                responsibilities && responsibilities.length > 0
                  ? responsibilities
                  : [],
              skillsUsed: employment.skillsUsed ? employment.skillsUsed : [],
              favoriteProject: favoriteProject || '',
              startDate: startDate
                ? format(new Date(startDate), 'yyyy-MM-dd')
                : '',
              endDate: endDate ? format(new Date(endDate), 'yyyy-MM-dd') : '',
              supervisor: {
                name: get(employment.supervisor, 'name', ''),
                detail: {
                  name: get(employment.supervisor.detail, 'name', ''),
                  email: get(employment.supervisor.detail, 'email', ''),
                  phoneNumber: get(
                    employment.supervisor.detail,
                    'phoneNumber',
                    ''
                  )
                }
              },
              currentSupervisor: get(employment.supervisor, 'name', ''),
              showDetail: true
            }}
            submit={(values: InitialEmploymentValue) =>
              updateEmployment(values, employment._id)(dispatch)
            }
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

export default EditEmployment;
