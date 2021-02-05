import React, { FC, useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import {
  NavBar,
  MainBackground,
  AdminTab,
  SearchTalents,
  ProfilePreview,
  SplashScreen
} from 'components/Reusable';
import {
  Code as CodeIcon,
  ImportantDevices,
  AccountCircle,
  Work,
  LibraryBooks,
  Share,
  FileCopy,
  FolderShared
} from '@material-ui/icons';
import { useLocation, useHistory } from 'react-router-dom';
import { RootState } from 'redux/store';
import { Routes } from 'utils/routes';
import { listUsedCode } from 'redux/actions/hrAdmin';
import { UserRole } from 'redux/action-types/user';
import './HrAdminLayout.scss';

export enum Tab {
  PotentialCandidate = 'Potential Candidates',
  UsedCode = 'Used code',
  Code = 'codes',
  SubsidyStudent = 'Subsidy students',
  EnrolledStudent = 'Enrolled students',
  Recommendation = 'Recommendation'
}

interface Props {
  role: string;
}
export const HrLayout: FC<Props> = props => {
  const [
    currentTab = Routes.HrAdminDashboard,
    setCurrentTab
  ] = useState<string>();

  const [link, setLink] = useState<string>();

  const linkRef = useRef<any>();

  const location = useLocation();

  const history = useHistory();

  const dispatch = useDispatch();

  const { children, role } = props;

  const reducer = useSelector((state: RootState) => {
    const { user, errors } = state.users;

    const { usedCode } = state.hrAdmin;

    return { user, usedCode, apiError: errors };
  });

  const { user, apiError } = reducer;

  const redirectBack = () => {
    history.goBack();
    return <></>;
  };

  useEffect(() => {
    setCurrentTab(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    listUsedCode()(dispatch);
  }, [dispatch]);

  if (!user) {
    return <SplashScreen />;
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
                    <ProfilePreview user={user} />
                  </div>
                  {apiError && apiError.message && (
                    <div style={{ marginTop: 5 }}>
                      <Alert severity="error">{apiError.message}</Alert>
                    </div>
                  )}
                  {apiError && apiError.error && (
                    <div style={{ marginTop: 5 }}>
                      <Alert severity="error">{apiError.error}</Alert>
                    </div>
                  )}
                  <div className="hrAdminChildren">
                    <div className="searchAndLink flex justify-between items-center">
                      {user.sharedLink && (
                        <div className="flex flex-col shared">
                          <div className="flex items-center w-full heading">
                            <Share />
                            <span>Shareable link</span>
                          </div>
                          <div
                            className="sharedLink flex justify-between w-full"
                            onClick={() => {
                              if (linkRef && linkRef.current) {
                                linkRef.current.select();
                                document.execCommand('copy');
                              }
                              return undefined;
                            }}
                          >
                            <input
                              type="text"
                              value={link || user.sharedLink}
                              ref={linkRef}
                              onChange={() => setLink(user.sharedLink)}
                            />
                            <span>
                              <FileCopy />
                            </span>
                          </div>
                        </div>
                      )}
                      {history.location.pathname ===
                        Routes.PotentialCandidate && (
                        <div className="mb-8 float-right search-wrapper">
                          <SearchTalents />
                        </div>
                      )}
                    </div>
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
                          },
                          {
                            name: Tab.Recommendation,
                            icon: <FolderShared />,
                            onClick: value => setCurrentTab(value),
                            url: Routes.HrAdminRecommendation
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
                            icon: <Work />,
                            onClick: value => setCurrentTab(value),
                            url: Routes.SubsidyStudent
                          },
                          {
                            name: Tab.EnrolledStudent,
                            icon: <LibraryBooks />,
                            onClick: value => setCurrentTab(value),
                            url: '#'
                          },
                          {
                            name: Tab.Recommendation,
                            icon: <FolderShared />,
                            onClick: value => setCurrentTab(value),
                            url: Routes.HrAdminRecommendation
                          }
                        ]}
                        currentTab={currentTab}
                      />
                    )}
                    {children}
                  </div>
                </div>
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
