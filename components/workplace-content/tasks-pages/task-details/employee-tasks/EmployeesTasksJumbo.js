import React from "react";

export const EmployeesTasksJumbo = ({ empInfo }) => {
  return (
    <div>
      <div className="profle-jumbo ann-jumbo  app-jumbo  md:flex md:flex-row flex-col  py-5 md:justify-between ">
        <div className="profile-jumbo-flex">
          <div className="jumbo-flex-1 ">
            <div className="flex justify-between">
              <div className="jumbo-name">
                {empInfo && empInfo[0]?.first_name}{" "}
                {empInfo && empInfo[0]?.last_name}
              </div>
            </div>
            <div className="jumbo-dir mt-2">
              Workspace <span className="special-jumbo-text">&gt; Tasks</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
