import React from "react";

export const OrganizationModal = ({ showDynamicStatus, showTaskType }) => {
  return (
    <div>
      {" "}
      <div className="osj-modal absolute right-14 top-10 py-1 shadow">
        <div
          onClick={showDynamicStatus}
          className="px-3 osj-modal-child py-1 cursor-pointer"
        >
          Dynamic Status
        </div>
        <div
          onClick={showTaskType}
          className="px-3 osj-modal-child py-1 cursor-pointer"
        >
          Tasks Type
        </div>
      </div>{" "}
    </div>
  );
};
