import React, { FC, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ArrowBackTwoToneIcon from '@material-ui/icons/ArrowBackTwoTone';
import NavBar from 'components/Reusable/Layout/NavBar/NavBar';
import { addEmployment } from 'redux/actions/employment';
import { EmploymentInput, InitialEmploymentValue } from 'components/Reusable';
import { RootState } from 'redux/store';
import { MainBackground } from 'components/Reusable/Layout/MainBackground';
import './RecentEmployer.scss';

const RecentEmployer: FC = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const reducer = useSelector((state: RootState) => {
    const { loading, errors, employment } = state.employments;
    const { message } = state.messages;
    return { message, loading, errors, employment };
  });

  useEffect(() => {
    if (reducer.message && reducer.employment) {
      history.push(`/employment-history/${reducer.employment._id}`);
    }
  }, [reducer.message, reducer.employment, history]);

  return (
    <>
      <NavBar />
      <div className="containers">
        <div className="recent-employer-section w-1/3 m-auto text-textGray">
          <div
            className="flex relative h-auto my-8"
            style={{ flexDirection: 'column' }}
          >
            <div style={{ display: 'flex' }}>
              <div
                className="back-arrow cursor-pointer"
                onClick={() => history.push('/skill-ranking')}
              >
                <ArrowBackTwoToneIcon />
              </div>
              <h1 className="font-bold text-base title">
                Who was your most recent employer?
              </h1>
            </div>

            <EmploymentInput
              initialValue={{
                companyName: '',
                title: '',
                supervisor: '',
                isCurrentPosition: false,
                responsibilities: [],
                skillsUsed: [],
                favoriteProject: '',
                accomplishments: [],
                responsibility: '',
                accomplishment: '',
                startDate: '',
                endDate: ''
              }}
              submit={(values: InitialEmploymentValue) =>
                addEmployment(values)(dispatch)
              }
              backendErrors={
                reducer.errors && reducer.errors.errors && reducer.errors.errors
              }
              loading={!!reducer.loading}
              buttonName="Next"
            />
          </div>
        </div>
      </div>
      <MainBackground />
    </>
  );
};

export default withRouter(RecentEmployer);
