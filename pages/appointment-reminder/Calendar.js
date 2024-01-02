import { useState } from "react";
import AppSidebar from "../../components/appSidebarComp/AppSidebar";
import "../../components/appSidebarComp/appSidebar.css";
import CalendarPage from "../../components/workplace-content/appointment-reminder-pages/calendar-pages/CalendarPage";
import EditEmp from "../../components/workplace-content/appointment-reminder-pages/calendar-pages/calendar-side/EditEmp";

const Calendar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showEditEmp, setShowEditEmp] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleEditEmp = () => {
    setShowEditEmp(!showEditEmp);
  };

  return (
    <div className="app-dashboard">
      {showEditEmp && <EditEmp toggleEditEmp={toggleEditEmp} />}
      <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className={`content ${isOpen ? "squeeze" : ""}`}>
        <CalendarPage toggleEditEmp={toggleEditEmp} />
      </div>
    </div>
  );
};
export default Calendar;
