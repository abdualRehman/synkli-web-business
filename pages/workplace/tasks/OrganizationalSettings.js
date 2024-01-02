import OrganizationalSettingsPage from "../../../components/workplace-content/tasks-pages/organizational-settings-pages/OrganizationalSettingsPage";
import AppSidebar from "../../../components/appSidebarComp/AppSidebar";
import { useState } from "react";
import "../../../components/appSidebarComp/appSidebar.css";
import AddTask from "../../../components/workplace-content/tasks-pages/add-task/AddTask";
import AddDynamicStatus from "../../../components/workplace-content/tasks-pages/organizational-settings-pages/AddDynamicStatus";
import { Logs } from "components/workplace-content/tasks-pages/organizational-settings-pages/Logs";
const OrganizationalSettings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showAddStatus, setShowAddStatus] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const [statusUpdated, setStatusUpdated] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  function toggleAddTask() {
    setShowAddTask(!showAddTask);
  }

  function toggleAddStatus() {
    setShowAddStatus(!showAddStatus);
  }

  const toggleLogs = () => {
    setShowLogs(!showLogs);
  };

  const toggleStatusUpdate = () => {
    setStatusUpdated(!statusUpdated);
  };
  return (
    <div className="app-dashboard">
      {showLogs && <Logs toggleLogs={toggleLogs} />}
      {showAddTask && <AddTask toggleAddTask={toggleAddTask} />}
      {showAddStatus && (
        <AddDynamicStatus
          toggleAddStatus={toggleAddStatus}
          toggleStatusUpdate={toggleStatusUpdate}
        />
      )}
      <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className={`content ${isOpen ? "squeeze" : ""}`}>
        <OrganizationalSettingsPage
          toggleAddStatus={toggleAddStatus}
          toggleLogs={toggleLogs}
          statusUpdated={statusUpdated}
        />
      </div>
    </div>
  );
};
export default OrganizationalSettings;
