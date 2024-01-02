import AppSidebar from "../../components/appSidebarComp/AppSidebar";
import "../../components/appSidebarComp/appSidebar.css";
import { useState } from "react";
import { TimesheetPage } from "../../components/payrol-pages/timesheet-pages/TimesheetPage";
import { AddTimesheet } from "../../components/payrol-pages/timesheet-pages/AddTimesheet";
export const Timesheet = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showAddTimesheet, setShowAddTimesheet] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleAddTimesheet = () => {
    setShowAddTimesheet(!showAddTimesheet);
  };
  return (
    <div className="app-dashboard">
      {showAddTimesheet && (
        <AddTimesheet toggleAddTimesheet={toggleAddTimesheet} />
      )}
      <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className={`content ${isOpen ? "squeeze" : ""}`}>
        <TimesheetPage toggleAddTimesheet={toggleAddTimesheet} />
      </div>
    </div>
  );
};
