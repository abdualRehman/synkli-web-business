import React from "react";

const Pagination = ({ page, pageSize, count, rows, onChangePage }) => {
  const totalPages = count < 1 || !count ? 1 : Math.ceil(count / pageSize);

  const handlePrevClick = () => {
    if (page > 1) {
      onChangePage(page - 1);
    }
  };

  const handleNextClick = () => {
    if (page < totalPages) {
      onChangePage(page + 1);
    }
  };

  const renderPaginationItems = () => {
    const paginationItems = [];
    for (let i = 1; i <= totalPages; i++) {
      paginationItems.push(
        <button
          key={i}
          onClick={() => onChangePage(i)}
          className={`${i === page && "opacity-40"}`}
          disabled={i === page}
        >
          {i}
        </button>
      );
    }
    return paginationItems;
  };

  return (
    <div className=" mt-5 pagination mb-5 ">
      <div className="pagination-info">
        Showing {page} of {totalPages} entries
      </div>
      <div className="pagination-btns">
        <button
          onClick={handlePrevClick}
          className={`${page === 1 && "opacity-40"}`}
          disabled={page === 1}
        >
          Previous
        </button>
        {renderPaginationItems()}
        <button
          className={`${page === totalPages && "opacity-40"}`}
          onClick={handleNextClick}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
