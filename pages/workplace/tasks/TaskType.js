import AppSidebar from "../../../components/appSidebarComp/AppSidebar";
import { useState } from "react";
import "../../../components/appSidebarComp/appSidebar.css";
import TaskTypePage from "../../../components/workplace-content/tasks-pages/organizational-settings-pages/TaskTypePage";
import AddTaskType from "../../../components/workplace-content/tasks-pages/organizational-settings-pages/AddTaskType";
const TaskType = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTaskType, setShowTaskType] = useState(false);
  const [typesUpdated, setTypesUpdated] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleTaskType = () => {
    setShowTaskType(!showTaskType);
  };

  const toggletypesUpdated = () => {
    setTypesUpdated(!typesUpdated);
  };

  return (
    <div className="app-dashboard">
      {showTaskType && (
        <AddTaskType
          toggleTaskType={toggleTaskType}
          toggletypesUpdated={toggletypesUpdated}
        />
      )}

      <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className={`content ${isOpen ? "squeeze" : ""}`}>
        <TaskTypePage
          toggleTaskType={toggleTaskType}
          typesUpdated={typesUpdated}
        />
      </div>
    </div>
  );
};

export default TaskType;
