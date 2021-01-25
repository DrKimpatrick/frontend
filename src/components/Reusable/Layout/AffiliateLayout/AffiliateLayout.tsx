import React, { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from '@material-ui/core';
import { Publish } from '@material-ui/icons';
import { RootState } from 'redux/store';
import { listCurrentUser } from 'redux/actions/user';
import { UserRole } from 'redux/action-types/user';
import {
  NavBar,
  MainBackground,
  SideLoading,
  AddCourse
} from 'components/Reusable';
import './AffiliateLayout.scss';

interface Props {
  title?: string;
}

const AffiliateLayout: FC<Props> = props => {
  const [add = false, setAdd] = useState<boolean>();

  const { children } = props;

  const history = useHistory();

  const dispatch = useDispatch();

  const reducer = useSelector((state: RootState) => {
    const { user, loading } = state.users;

    return { user, loading };
  });

  const { user, loading } = reducer;

  useEffect(() => {
    listCurrentUser()(dispatch);
  }, [dispatch]);

  if (
    user &&
    user.roles &&
    user.roles.find(item => item !== UserRole.TrainingAffiliate)
  ) {
    history.goBack();
    return <></>;
  }

  return (
    <div className="adminLayout">
      {add && (
        <AddCourse title="Add course" closeModal={() => setAdd(false)} add />
      )}
      <NavBar />
      <div style={{ position: 'relative', marginTop: 20, minHeight: 350 }}>
        {loading && <SideLoading />}
        {!loading && (
          <Container>
            <div className="courseStatistic w-full flex items-center">
              <div className="export">
                <button type="button" className="flex items-center">
                  <Publish />
                  <h5>Export</h5>
                </button>
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
