import React, { useState } from 'react';
import {
  Announcement,
  DataUsage,
  VerifiedUser,
  Edit,
  Delete
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { VerificationStatus } from 'redux/action-types/education';

export interface CustomListItemProps {
  id: string;
  name: string;
  status?: string;
}
interface Props {
  setEdit: (value: string) => void;
  setDelete: (value: string) => void;
  listItem: CustomListItemProps;
}

const useStyles = makeStyles(() => ({
  actionIcon: {
    fontSize: 20
  }
}));

const CustomListItem = (props: Props) => {
  const [action = false, setAction] = useState<boolean>();

  const [currentItem, setCurrentItem] = useState<string>();

  const { listItem, setEdit, setDelete } = props;

  const styles = useStyles();

  return (
    <>
      <li
        className="py-2 py-2 rounded-sm"
        onMouseOver={() => {
          setAction(true);
          setCurrentItem(listItem.id);
        }}
        onMouseLeave={() => {
          setAction(false);
          setCurrentItem(undefined);
        }}
      >
        <div className="flex flex-row text-sm justify-between">
          <h4 className="medium-fonts px-4">{listItem.name}</h4>
          <div className="flex flex-row">
            {action && currentItem && currentItem === listItem.id && (
              <div
                className="listAction"
                style={{ borderRight: listItem.status ? '' : 'none' }}
              >
                <button
                  type="button"
                  onClick={() => setEdit(listItem.id)}
                  className="edit"
                >
                  <Edit className={styles.actionIcon} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDelete(listItem.id);
                  }}
                  className="delete"
                >
                  <Delete className={styles.actionIcon} />
                </button>
              </div>
            )}
            {listItem.status === VerificationStatus.Verified && (
              <VerifiedUser className="verified-color mr-4" />
            )}
            {listItem.status === VerificationStatus.Unverified && (
              <Announcement className="not-verified-color mr-4" />
            )}
            {listItem.status === VerificationStatus.InProgress && (
              <DataUsage className="verify-progress-color mr-4" />
            )}
          </div>
        </div>
      </li>
    </>
  );
};

export default CustomListItem;
