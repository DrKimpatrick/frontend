import React, { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from '@material-ui/core';
import {
  NavBar,
  MainBackground,
  AdminProfile,
  AdminTab
} from 'components/Reusable';
import {
  Code as CodeIcon,
  ImportantDevices,
  AccountCircle,
  Link
} from '@material-ui/icons';
import { useLocation, useHistory } from 'react-router-dom';
import { RootState } from 'redux/store';
import { Routes } from 'utils/routes';
import { listUsedCode } from 'redux/actions/hrAdmin';
import useWindowSize from 'utils/useWindowSize';
import { UserRole } from 'redux/action-types/user';
import { HrLeftSideItem } from './HrLeftSideItem';
import './HrAdminLayout.scss';

export enum Tab {
  PotentialCandidate = 'Potential Candidates',
  UsedCode = 'Used code',
  Code = 'codes',
  SubsidyStudent = 'Subsidy students',
  EnrolledStudent = 'Enrolled students'
}

interface Props {
  role: string;
}
export const HrLayout: FC<Props> = props => {
  const [currentTab = Routes.HrAdminDashboard, setCurrentTab] = useState<
    string
  >();

  const location = useLocation();

  const history = useHistory();

  const size = useWindowSize();

  const dispatch = useDispatch();

  const { children, role } = props;

  const reducer = useSelector((state: RootState) => {
    const { user } = state.users;

    const { usedCode } = state.hrAdmin;

    return { user, usedCode };
  });

  const { user, usedCode } = reducer;

  const redirectBack = () => {
    history.goBack();
    return <></>;
  };

  const leftSideItem = () => {
    return (
      <div className="leftSide">
        {usedCode && (
          <HrLeftSideItem
            item={{
              header: { name: 'Used code', icon: <Link /> },
              list: [
                {
                  name: 'Used code',
                  rightItem:
                    usedCode.length > 0 ? String(usedCode.length) : 'N/A'
                }
              ]
            }}
          />
        )}
      </div>
    );
  };

  useEffect(() => {
    setCurrentTab(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    listUsedCode()(dispatch);
  }, [dispatch]);

  if (!user) {
    return null;
  }

  return (
    <>
      {user.roles.length > 0 && user.roles.includes(role) ? (
        <>
          <NavBar />
          <div className="hrAdminLayout">
            <Container>
              <div className="layout">
                <div className="itemCenter">
                  <div className="profileDetail">
                    <AdminProfile />
                  </div>
                  {size?.width && size?.width < 768 && leftSideItem()}
                  <div className="hrAdminChildren">
                    {role === UserRole.RecruitmentAdmin && (
                      <AdminTab
                        menu={[
                          {
                            name: Tab.UsedCode,
                            icon: <ImportantDevices />,
                            onClick: value => setCurrentTab(value),
                            url: Routes.HrAdminDashboard
                          },
                          {
                            name: Tab.PotentialCandidate,
                            icon: <AccountCircle />,
                            onClick: value => setCurrentTab(value),
                            url: Routes.PotentialCandidate
                          },
                          {
                            name: Tab.Code,
                            icon: <CodeIcon />,
                            onClick: value => setCurrentTab(value),
                            url: Routes.Code
                          }
                        ]}
                        currentTab={currentTab}
                      />
                    )}
                    {role === UserRole.EducationUser && (
                      <AdminTab
                        menu={[
                          {
                            name: Tab.SubsidyStudent,
                            icon: <ImportantDevices />,
                            onClick: value => setCurrentTab(value),
                            url: Routes.HrAdminDashboard
                          },
                          {
                            name: Tab.EnrolledStudent,
                            icon: <AccountCircle />,
                            onClick: value => setCurrentTab(value),
                            url: Routes.PotentialCandidate
                          }
                        ]}
                        currentTab={currentTab}
                      />
                    )}
                    {children}
                  </div>
                </div>
                {size?.width && size?.width > 768 && leftSideItem()}
              </div>
            </Container>
          </div>
          <MainBackground />
        </>
      ) : (
        <>{redirectBack()}</>
      )}
    </>
  );
};

export default HrLayout;
