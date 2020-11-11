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
import {
  Employment as EmploymentType,
  VerificationStatus
} from 'redux/action-types/employment';
import { deleteEmployment, listEmployments } from 'redux/actions/employment';
import { RootState } from 'redux/store';
import { AddNewEmployment, EditEmployment } from '.';
import './style.scss';

const useStyles = makeStyles(() => ({
  actionIcon: {
    fontSize: 20
  }
}));

const Employment: FC = () => {
  const [action = false, setAction] = useState<boolean>();

  const [currentItem, setCurrentItem] = useState<string | undefined>();

  const [addEmployment = false, setAddEmployment] = useState<boolean>();

  const [editEmployment, setEditEmployment] = useState<
    EmploymentType | undefined
  >();

  const [warning, setWarning] = useState<boolean>(false);

  const [employmentId, setEmploymentId] = useState<string>();

  const dispatch = useDispatch();

  const styles = useStyles();

  const reducer = useSelector((state: RootState) => {
    const { employments, loading } = state.employments;

    return { employments, loading };
  });

  useEffect(() => {
    listEmployments()(dispatch);
  }, [dispatch]);

  if (reducer.loading && reducer.loading === true) {
    return null;
  }

  return (
    <>
      {warning && employmentId && (
        <Warning
          message="Are you sure you want to delete this employment"
          cancel={() => {
            setWarning(false);
            setEmploymentId(undefined);
          }}
          accept={() => {
            setWarning(false);
            setEmploymentId(undefined);
            deleteEmployment(employmentId)(dispatch);
          }}
        />
      )}
      {addEmployment && (
        <AddNewEmployment close={() => setAddEmployment(false)} />
      )}
      {editEmployment && (
        <EditEmployment
          close={() => setEditEmployment(undefined)}
          employment={editEmployment}
        />
      )}
      <div className="w-full">
        <p className="text-right text-xs py-4 pb-6" />
        {reducer.employments && (
          <ul className="p-0 m-2 bg-card-preview">
            {reducer.employments.length > 0 &&
              reducer.employments.map((item, index) => (
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
                    <h4 className="medium-fonts px-4">{item.companyName}</h4>
                    <div className="flex flex-row">
                      {action && currentItem && currentItem === item._id && (
                        <div className="listAction">
                          <button
                            type="button"
                            onClick={() => setEditEmployment(item)}
                            className="edit"
                          >
                            <Edit className={styles.actionIcon} />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setWarning(true);
                              setEmploymentId(item._id);
                            }}
                            className="delete"
                          >
                            <Delete className={styles.actionIcon} />
                          </button>
                        </div>
                      )}
                      {item.verificationStatus ===
                        VerificationStatus.VERIFIED && (
                        <VerifiedUser className="verified-color mr-4" />
                      )}
                      {item.verificationStatus ===
                        VerificationStatus.UNVERIFIED && (
                        <Announcement className="not-verified-color mr-4" />
                      )}
                      {item.verificationStatus ===
                        VerificationStatus.IN_PROGRESS && (
                        <DataUsage className="verify-progress-color mr-4" />
                      )}
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        )}
        <button
          className="mt-4 bg-gray-800 w-full text-white hover:bg-gray-900 outline-none font-semibold h-12 py-1 px-1 rounded-sm shadow"
          type="button"
          onClick={() => setAddEmployment(true)}
        >
          <Add /> <span>Add new Employment</span>
        </button>
      </div>
    </>
  );
};

export default Employment;
