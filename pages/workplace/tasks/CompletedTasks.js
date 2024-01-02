import React, { useState } from "react";
import AppSidebar from "components/appSidebarComp/AppSidebar";
import { TasksCompletedPage } from "components/workplace-content/tasks-pages/tasks-cards/tasks-completed/TasksCompletedPage";
import { CompleteTaskDetails } from "components/workplace-content/tasks-pages/tasks-cards/tasks-completed/tasks/task-details/CompleteTaskDetails";
export const CompletedTasks = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const toggleTaskDetails = () => {
    setShowDetails(!showDetails);
  };
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="app-dashboard">
      {showDetails && (
        <CompleteTaskDetails toggleTaskDetails={toggleTaskDetails} />
      )}
      <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className={`content ${isOpen ? "squeeze" : ""}`}>
        <TasksCompletedPage toggleTaskDetails={toggleTaskDetails} />
      </div>
    </div>
  );
};
