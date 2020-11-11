import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, useHistory } from 'react-router-dom';
import { ArrowBackTwoTone } from '@material-ui/icons';
import { EducationInput, InitialEducationValue } from 'components/Reusable';
import { addEducation } from 'redux/actions/education';
import { format } from 'date-fns';
import { RootState } from 'redux/store';
import NavBar from 'components/Reusable/Layout/NavBar/NavBar';
import { MainBackground } from 'components/Reusable/Layout/MainBackground';
import './AddEducation.scss';

const AddEducation: FC = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const reducer = useSelector((state: RootState) => {
    const { loading, errors, education } = state.educations;

    const { message } = state.messages;

    return { message, loading, errors, education };
  });

  useEffect(() => {
    if (reducer.message && reducer.education) {
      history.push({
        pathname: '/education-history',
        state: { educationId: reducer.education._id }
      });
    }
  }, [reducer.message, reducer.education, history]);

  return (
    <>
      <NavBar />
      <div className="containers">
        <div className="recent-employer-section w-1/3 m-auto text-textGray">
          <div className="flex relative h-auto my-8">
            <button className="back-arrow cursor-pointer" type="button">
              <ArrowBackTwoTone />
            </button>
            <h1 className="font-bold text-base title">
              What was the last school you attended?
            </h1>
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
            submit={(values: InitialEducationValue) => {
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
            buttonName="Next"
          />
        </div>
      </div>
      <MainBackground />
    </>
  );
};

export default withRouter(AddEducation);
