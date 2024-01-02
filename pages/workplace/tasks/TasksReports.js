import AppSidebar from "components/appSidebarComp/AppSidebar";
import { TasksReportsPage } from "components/workplace-content/tasks-pages/tasks-reports/TasksReportsPage";
import React, { useState } from "react";

export const TasksReports = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {" "}
      <div className="app-dashboard">
        <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

        <div className={`content ${isOpen ? "squeeze" : ""}`}>
          <TasksReportsPage />
        </div>
      </div>
    </div>
  );
};
