import React, { FC } from 'react';
import './AffiliateItem.scss';
import ReactPaginate from 'react-paginate';
import { Course, CourseStatus } from 'redux/action-types/course';
import { ArrowDropDown } from '@material-ui/icons';
import { changeCourseStatus } from 'redux/actions/course';
import { useDispatch } from 'react-redux';
import { NoItemFound } from 'components/Reusable';
import { OnPageChangeCallback } from '..';

const options = [
  { label: CourseStatus.Accepted, value: CourseStatus.Accepted },
  { label: CourseStatus.Pending, value: CourseStatus.Pending },
  { label: CourseStatus.Declined, value: CourseStatus.Declined }
];

export interface ChangeAffiliateStatus {
  course: Course;
  status: string;
  pageCount: number;
}

interface Props {
  items: Course[];
  totalItems: number;
  currentPage: number;
  itemPerPage: number;
  pageChange: OnPageChangeCallback;
  setPage: (value: number) => void;
  setOffset: (value: number) => void;
  offset: number;
  type: string;
}

const AffiliateItem: FC<Props> = props => {
  const {
    items,
    totalItems,
    currentPage,
    itemPerPage,
    pageChange,
    setOffset,
    setPage,
    offset,
    type
  } = props;

  const pageCount = Math.ceil(totalItems / itemPerPage);

  const dispatch = useDispatch();

  const changeStatus = (values: ChangeAffiliateStatus) => {
    const { course, status } = values;

    if (items.length === 1) {
      const newPage = Math.ceil(currentPage - 1);
      const newOffset = Math.ceil(newPage * itemPerPage);
      setPage(newPage);
      setOffset(offset === 0 ? 0 : newOffset);
      changeCourseStatus({
        offset: offset === 0 ? 0 : newOffset,
        limit: itemPerPage,
        status,
        course,
        type
      })(dispatch);
    } else {
      changeCourseStatus({ offset, limit: itemPerPage, status, course, type })(
        dispatch
      );
    }
  };

  return (
    <>
      <div className="userContainer affiliateContainer">
        {items && items.length > 0 && (
          <div className="userItemList">
            <ul className="userItems affiliateItems">
              {items.map((item, index) => (
                <li key={index}>
                  <div className="image">
                    <img src={item.coverImageLink} alt="" />
                  </div>
                  <div className="details">
                    <h1>{item.name}</h1>
                    <h6>{item.userId.username}</h6>
                    <button
                      type="button"
                      onClick={() =>
                        window.open(item.existingCourseLink, '_blank')
                      }
                    >
                      View
                    </button>
                  </div>
                  <div className="action">
                    <h5>Change Status</h5>
                    <div className="customSelect">
                      <select
                        name="options"
                        value={item.verificationStatus}
                        onChange={e =>
                          changeStatus({
                            status: e.target.value,
                            course: item,
                            pageCount
                          })
                        }
                      >
                        <option value={item.verificationStatus}>
                          {item.verificationStatus}
                        </option>
                        {options
                          .filter(opt => opt.value !== item.verificationStatus)
                          .map((opt, i) => (
                            <option key={i} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                      </select>
                      <span className="customArrow">
                        <ArrowDropDown />
                      </span>
                    </div>
                  </div>
                </li>
              ))}
              {pageCount > 1 && (
                <li className="paginationSection">
                  <ReactPaginate
                    pageRangeDisplayed={5}
                    previousLabel={'<'}
                    nextLabel={'>'}
                    pageCount={pageCount}
                    onPageChange={pageChange}
                    marginPagesDisplayed={2}
                    breakLabel="..."
                    forcePage={currentPage}
                    activeClassName="active"
                  />
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
      {items && items.length <= 0 && <NoItemFound />}
    </>
  );
};

export default AffiliateItem;
