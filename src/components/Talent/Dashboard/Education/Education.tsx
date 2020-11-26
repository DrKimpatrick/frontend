/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { FC, useState, useEffect } from 'react';
import {
  Add,
  Announcement,
  DataUsage,
  VerifiedUser,
  Edit,
  Delete
} from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Warning } from 'components/Reusable/Warning';
import { deleteEducation, listEducation } from 'redux/actions/education';
import { RootState } from 'redux/store';
import {
  Education as EducationType,
  VerificationStatus
} from 'redux/action-types/education';
import { AddEducation, EditEducation } from '.';
import './Education.scss';

const useStyles = makeStyles(() => ({
  actionIcon: {
    fontSize: 20
  }
}));

const Education: FC = () => {
  const [action = false, setAction] = useState<boolean>();

  const [currentItem, setCurrentItem] = useState<string | undefined>();

  const [addEducation = false, setAddEducation] = useState<boolean>();

  const [editEducation, setEditEducation] = useState<
    EducationType | undefined
  >();

  const [warning, setWarning] = useState<boolean>(false);

  const [educationId, setEducationId] = useState<string>();

  const dispatch = useDispatch();

  const styles = useStyles();

  const reducer = useSelector((state: RootState) => {
    const { educations, loading } = state.educations;

    return { educations, loading };
  });

  useEffect(() => {
    listEducation()(dispatch);
  }, [dispatch]);

  if (reducer.loading && reducer.loading === true) {
    return null;
  }

  return (
    <>
      {warning && educationId && (
        <Warning
          message="Are you sure you want to delete this education"
          cancel={() => {
            setWarning(false);
            setEducationId(undefined);
          }}
          accept={() => {
            setWarning(false);
            setEducationId(undefined);
            deleteEducation(educationId)(dispatch);
          }}
        />
      )}
      {addEducation && <AddEducation close={() => setAddEducation(false)} />}
      {editEducation && (
        <EditEducation
          close={() => setEditEducation(undefined)}
          education={editEducation}
        />
      )}
      <div className="w-full">
        <p className="text-right text-xs py-4 pb-6" />
        {reducer.educations && (
          <ul className="p-0 m-2 bg-card-preview">
            {reducer.educations.length > 0 &&
              reducer.educations.map((item, index) => (
                <li
                  className="py-2 py-2 rounded-sm"
                  key={index}
                  onMouseOver={() => {
                    setAction(true);
                    setCurrentItem(item._id);
                  }}
                  onMouseLeave={() => {
                    setAction(false);
                    setCurrentItem(undefined);
                  }}
                >
                  <div className="flex flex-row text-sm justify-between">
                    <h4 className="medium-fonts px-4">{item.schoolName}</h4>
                    <div className="flex flex-row">
                      {action && currentItem && currentItem === item._id && (
                        <div className="listAction">
                          <button
                            type="button"
                            onClick={() => setEditEducation(item)}
                            className="edit"
                          >
                            <Edit className={styles.actionIcon} />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setWarning(true);
                              setEducationId(item._id);
                            }}
                            className="delete"
                          >
                            <Delete className={styles.actionIcon} />
                          </button>
                        </div>
                      )}
                      {item.verificationStatus ===
                        VerificationStatus.Verified && (
                        <VerifiedUser className="verified-color mr-4" />
                      )}
                      {item.verificationStatus ===
                        VerificationStatus.Unverified && (
                        <Announcement className="not-verified-color mr-4" />
                      )}
                      {item.verificationStatus ===
                        VerificationStatus.InProgress && (
                        <DataUsage className="verify-progress-color mr-4" />
                      )}
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        )}

        {reducer.educations && reducer.educations.length <= 0 && (
          <div className="notFound my-4">
            <h5>There are no education</h5>
          </div>
        )}
        <button
          className="mt-4 bg-gray-800 w-full text-white hover:bg-gray-900 outline-none font-semibold h-12 py-1 px-1 rounded-sm shadow"
          type="button"
          onClick={() => setAddEducation(true)}
        >
          <Add /> <span>Add new Education</span>
        </button>
      </div>
    </>
  );
};

export default Education;
