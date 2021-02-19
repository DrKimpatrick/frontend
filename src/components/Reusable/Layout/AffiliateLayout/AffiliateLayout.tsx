import React, { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from '@material-ui/core';
import { Publish } from '@material-ui/icons';
import { RootState } from 'redux/store';
import { listCurrentUser } from 'redux/actions/user';
import { UserRole } from 'redux/action-types/user';
import { PDFDownloadLink } from '@react-pdf/renderer';
import {
  NavBar,
  MainBackground,
  SideLoading,
  AddCourse,
  Loader
} from 'components/Reusable';
import './AffiliateLayout.scss';
import { AdminReports } from 'components/Reports/AdminReports';

interface Props {
  title?: string;
}

const AffiliateLayout: FC<Props> = props => {
  const [add = false, setAdd] = useState<boolean>();
  const [down, setDown] = useState<boolean>(false);

  const { children } = props;

  const history = useHistory();

  const dispatch = useDispatch();

  const reducer = useSelector((state: RootState) => {
    const { user, loading } = state.users;

    return { user, loading };
  });

  const courseReducer = useSelector((state: RootState) => {
    const { courses, courseLoading } = state.courses;

    return { courses, courseLoading };
  });

  const { user, loading } = reducer;
  const { courses } = courseReducer;

  const headers = ['Price', 'Duration', 'Level', 'Views', 'Instructor'];

  useEffect(() => {
    listCurrentUser()(dispatch);
    setDown(false);
  }, [dispatch]);

  const downLoad = () => {
    setDown(true);
  };

  const removeDownLoad = () => {
    setDown(false);
  };

  if (
    user &&
    user.roles &&
    user.roles.find(item => item !== UserRole.TrainingAffiliate)
  ) {
    history.goBack();
    return <></>;
  }

  return (
    <div className="adminLayout affiliateLayout">
      {add && (
        <AddCourse
          title="Add course"
          closeModal={() => setAdd(false)}
          add
          downLoad={() => removeDownLoad()}
        />
      )}

      <NavBar />
      <div style={{ position: 'relative', marginTop: 20, minHeight: 350 }}>
        {loading && <SideLoading />}
        {!loading && (
          <Container>
            <div className="courseStatistic w-full flex items-center">
              <div className="export">
                {down && (
                  <PDFDownloadLink
                    document={
                      <AdminReports
                        title="Affiliate Report"
                        name={user?.username}
                        description={user?.bio}
                        headers={headers}
                        items={courses?.data}
                        mainHeader="Course"
                        type="course"
                      />
                    }
                    fileName="ttlc-report.pdf"
                  >
                    {({ loading: loadingP }) =>
                      loadingP ? (
                        <button
                          data-testid="next-button"
                          className="next-btn text-white font-semibold py-1 px-3 w-32 rounded-sm flex justify-around"
                          type="submit"
                        >
                          <Loader loading command={<></>} />
                        </button>
                      ) : (
                        <button type="button" className="flex items-center">
                          <Publish />
                          <h5>Export</h5>
                        </button>
                      )
                    }
                  </PDFDownloadLink>
                )}
                {!down && (
                  <button
                    type="button"
                    className="flex items-center"
                    onClick={downLoad}
                  >
                    <Publish />
                    <h5>Generate Report</h5>
                  </button>
                )}
              </div>
              <div className="statistic">
                <ul>
                  <li>
                    <button type="button" onClick={() => setAdd(true)}>
                      Create Course
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <>{children}</>
          </Container>
        )}
      </div>
      <div className="customBackground">
        <MainBackground />
      </div>
    </div>
  );
};

export default AffiliateLayout;
