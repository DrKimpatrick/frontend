import React from 'react';
import ReactPaginate from 'react-paginate';
import './HorizontalPagination.scss';

interface Props {
  pageCount: number;
  page: number;
  onPageChange: (value: number) => void;
}

const HorizontalPagination = (props: Props) => {
  const { page, pageCount, onPageChange } = props;
  return (
    <div className="horizontalPagination">
      <ReactPaginate
        pageCount={pageCount}
        forcePage={page}
        onPageChange={e => {
          if (e.selected) {
            onPageChange(e.selected === 0 ? 0 : e.selected);
          }
        }}
        marginPagesDisplayed={5}
        pageRangeDisplayed={5}
        previousLabel="<"
        nextLabel=">"
        activeClassName="active"
      />
    </div>
  );
};

export default HorizontalPagination;
