import React from "react";

export const SortModal = ({ toggleSortModal, handleSort }) => {
  return (
    <div className="sort-modal  rounded-md">
      <div onClick={() => handleSort("ASC")} className="sort-txt p-1">
        {" "}
        Ascending
      </div>
      <div onClick={() => handleSort("DESC")} className="sort-txt p-1 ">
        {" "}
        Descending{" "}
      </div>
    </div>
  );
};
