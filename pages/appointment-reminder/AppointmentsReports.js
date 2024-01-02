import AppSidebar from "../../components/appSidebarComp/AppSidebar";
import "../../components/appSidebarComp/appSidebar.css";
import { useState } from "react";
import AppointmentsReportsPage from "../../components/workplace-content/appointment-reminder-pages/appointments-report-pages/AppoimentsReportsPage";
const AppointmentsReports = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="app-dashboard">
      <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className={`content ${isOpen ? "squeeze" : ""}`}>
        <AppointmentsReportsPage />
      </div>
    </div>
  );
};
export default AppointmentsReports;
