import { useState } from "react";
import AppSidebar from "../../components/appSidebarComp/AppSidebar";
import "../../components/appSidebarComp/appSidebar.css";
import AppointmentReminderPage from "../../components/workplace-content/appointment-reminder-pages/AppointmentReminderPage";
const AppointmentReminder = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="app-dashboard">
      <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className={`content ${isOpen ? "squeeze" : ""}`}>
        <AppointmentReminderPage />
      </div>
    </div>
  );
};

export default AppointmentReminder;
