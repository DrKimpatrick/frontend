import React, { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ArrowBackTwoTone } from '@material-ui/icons';
import { Modal } from '@material-ui/core';
import { format } from 'date-fns';
import { EducationInput, InitialValue } from '..';
import '../../Employment/AddNewEmployment/style.scss';
import { addEducation } from '../../../../redux/actions/education';
import { RootState } from '../../../../redux/store';

interface Props {
  close: () => void;
}

const AddEducation: FC<Props> = props => {
  const [open, setOpen] = useState<boolean>(true);

  const { close } = props;

  const dispatch = useDispatch();

  const reducer = useSelector((state: RootState) => {
    const { loading, errors } = state.educations;

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
      tabIndex={0}
      style={{ zIndex: 100 }}
      className="addNewEmployment"
    >
      <div className="containers">
        <div className="recent-employer-section">
          <div className="flex relative h-auto my-8">
            <button
              className="back-arrow cursor-pointer"
              onClick={() => close()}
              type="button"
            >
              <ArrowBackTwoTone />
            </button>
            <h1 className="font-bold text-base title">Add Education</h1>
          </div>
          <EducationInput
            initialValue={{
              schoolName: '',
              level: '',
              degreeOrCertification: '',
              isCurrentEducation: false,
              specializations: [],
              specialization: '',
              accomplishments: [],
              accomplishment: '',
              startDate: '',
              endDate: ''
            }}
            submit={(values: InitialValue) => {
              const { startDate, endDate } = values;
              addEducation({
                ...values,
                startDate: format(new Date(startDate), 'yyyy-MM-dd'),
                endDate: format(new Date(String(endDate)), 'yyyy-MM-dd')
              })(dispatch);
            }}
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

export default AddEducation;
