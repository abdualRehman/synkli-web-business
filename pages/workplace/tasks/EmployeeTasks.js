import AppSidebar from "components/appSidebarComp/AppSidebar";
import { EmployeeTasksPage } from "components/workplace-content/tasks-pages/task-details/employee-tasks/EmployeeTasksPage";
import React, { useState } from "react";

export const EmployeeTasks = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="app-dashboard">
      <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className={`content ${isOpen ? "squeeze" : ""}`}>
        <EmployeeTasksPage />
      </div>
    </div>
  );
};
