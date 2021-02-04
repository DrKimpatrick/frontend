import React, { FC } from 'react';
import './UserItem.scss';
import ReactPaginate, { ReactPaginateProps } from 'react-paginate';
import { differenceInYears, differenceInMonths } from 'date-fns';
import { User } from 'redux/actions/user';
import Avatar from 'assets/images/avatar.jpg';
import { ArrowDropDown } from '@material-ui/icons';
import { Employment } from 'redux/action-types/employment';
import { NoItemFound } from 'components/Reusable';

export const options = ['Verified', 'UnVerified'];

export type OnPageChangeCallback = ReactPaginateProps['onPageChange'];
interface Props {
  items?: User[];
  view: (values: { userId: string; username: string }) => void;
  totalItems: number;
  currentPage: number;
  itemPerPage: number;
  pageChange: OnPageChangeCallback;
}

const UserItem: FC<Props> = props => {
  const {
    items,
    view,
    pageChange,
    currentPage,
    totalItems,
    itemPerPage
  } = props;

  const pageCount = Math.ceil(totalItems / itemPerPage);

  const yearsAndMonth = (value: string) => {
    const years = differenceInYears(new Date(), new Date(value));

    const months = differenceInMonths(new Date(), new Date(value));

    if (years && years > 0) {
      return <h6>{years} years of experience </h6>;
    }

    if (months && months > 0) {
      return <h6>{months} months </h6>;
    }

    return <></>;
  };

  const currentPosition = (values: Employment[]) => {
    const find = values.find(item => item.isCurrentPosition === true);

    if (find) {
      return (
        <>
          {yearsAndMonth(find.updatedAt)}
          <h6>{find.title}</h6>
        </>
      );
    }

    if (!find) {
      const sortItems = values.sort((a, b) => {
        return (
          new Date(b.updatedAt).valueOf() - new Date(a.updatedAt).valueOf()
        );
      });

      return (
        <>
          {yearsAndMonth(sortItems[0].updatedAt)}
          <h6>{sortItems[0].title}</h6>
        </>
      );
    }
    return <></>;
  };

  return (
    <div
      className="userContainer"
      style={{
        border: items && items.length > 0 ? '2px solid #dadada5e' : 'none'
      }}
    >
      <div className="userItemList">
        {items && items.length > 0 && (
          <ul className="userItems">
            {items.map((item, index) => (
              <li key={index}>
                <div className="image">
                  <img src={Avatar} alt="" />
                </div>
                <div className="details">
                  <h1>{item.username}</h1>
                  {item.employmentHistory &&
                    item.employmentHistory.length > 0 && (
                      <>{currentPosition(item.employmentHistory)}</>
                    )}
                  <button
                    type="button"
                    onClick={() =>
                      view({ userId: item._id, username: item.username })
                    }
                  >
                    View
                  </button>
                </div>
                <div className="action">
                  <h5>Account Verified</h5>
                  <div className="customSelect">
                    <select
                      name="options"
                      value={item.verified ? options[0] : options[1]}
                      onChange={e => e.target.value}
                    >
                      {item.verified ? (
                        <>
                          <option value={options[0]}>{options[0]}</option>
                          <option value={options[1]}>{options[1]}</option>
                        </>
                      ) : (
                        <>
                          <option value={options[1]}>{options[1]}</option>
                          <option value={options[0]}>{options[0]}</option>
                        </>
                      )}
                    </select>
                    <span className="customArrow">
                      <ArrowDropDown />
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {items && items.length <= 0 && (
          <div className="userNotFound">
            <NoItemFound message="There are no users" />
          </div>
        )}
      </div>
      {pageCount > 1 && (
        <ul className="userItems userPagination">
          <li className="paginationSection">
            <ReactPaginate
              pageRangeDisplayed={5}
              previousLabel="<"
              nextLabel=">"
              pageCount={pageCount}
              onPageChange={pageChange}
              marginPagesDisplayed={2}
              breakLabel="..."
              forcePage={currentPage}
              activeClassName="active"
            />
          </li>
        </ul>
      )}
    </div>
  );
};

export default UserItem;
