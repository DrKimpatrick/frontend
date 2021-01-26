import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'redux/store';
import {
  HrAdminLayout as Layout,
  HrListItem,
  SideLoading,
  HorizontalPagination as Pagination,
  AddItemOnModal,
  TalentProfile
} from 'components/Reusable';
import { listSpecificUser } from 'redux/actions/user';
import { UserRole, User } from 'redux/action-types/user';
import { HrAdmin } from 'redux/actions/hrAdmin/interface';
import '../HrAdmin.scss';

const PotentialCandidate = () => {
  const [page = 0, setPage] = useState<number>();
  const [showModal, setShowModal] = useState<boolean>(false);

  const itemPerPage = 4;

  const reducer = useSelector((state: RootState) => {
    const { searchedTalents, usedCode, loading, errors } = state.hrAdmin;
    const {
      specificUser,
      loading: userLoading,
      errors: userError
    } = state.users;
    return {
      searchedTalents,
      loading,
      errors,
      usedCode,
      specificUser,
      userLoading,
      userError
    };
  });

  const {
    searchedTalents,
    loading,
    errors,
    usedCode,
    specificUser,
    userLoading,
    userError
  } = reducer;

  const dispatch = useDispatch();

  const onClickListHandler = (uId: string) => {
    listSpecificUser(uId)(dispatch);
    setShowModal(true);
  };

  const closeModel = () => {
    setShowModal(false);
  };

  let talents: User[] = [];

  if (usedCode?.length) {
    talents = usedCode.reduce((arr: User[], uCode: HrAdmin) => {
      const users: User[] = uCode.usedBy;
      if (users.length) {
        return arr.concat(users);
      }
      return arr;
    }, []);
  }

  if (searchedTalents) {
    talents = searchedTalents;
  }

  let displayErrorOrLoading = null;

  if (loading) {
    displayErrorOrLoading = (
      <div style={{ marginTop: '30px' }}>
        <SideLoading />
      </div>
    );
  }

  if (errors) {
    displayErrorOrLoading = <p className="text-center">{reducer.errors}!</p>;
  }

  let userErrorOrLoading = null;

  if (userLoading) {
    userErrorOrLoading = (
      <div style={{ marginTop: '30px' }}>
        <SideLoading />
      </div>
    );
  }

  if (userError) {
    userErrorOrLoading = <p>Profile not found. Please try again!</p>;
  }

  return (
    <Layout role={UserRole.RecruitmentAdmin}>
      <div className="hrAdminDashboard">
        <ul className="ulList w-full flex flex-column bg-card-preview">
          {talents.length && !displayErrorOrLoading
            ? talents.map((talent: any) => (
                <HrListItem
                  name={talent.username ? talent.username : talent.email}
                  link={`/hr/potential-candidate/${talent._id}`}
                  key={talent._id}
                  onclickHandler={() => onClickListHandler(talent._id)}
                />
              ))
            : displayErrorOrLoading}
        </ul>
        {/* Pagination is not shown for now */}
        {false && (
          <div className="my-10 w-full flex items-center justify-center">
            <Pagination
              pageCount={itemPerPage}
              onPageChange={setPage}
              page={page}
            />
          </div>
        )}
        <>
          {showModal && (
            <AddItemOnModal
              title="Talent Profile"
              closeModal={() => closeModel()}
            >
              {specificUser && !userLoading && !userError ? (
                <TalentProfile user={specificUser} />
              ) : (
                userErrorOrLoading
              )}
            </AddItemOnModal>
          )}
        </>
      </div>
    </Layout>
  );
};

export default PotentialCandidate;
