import { useState } from "react";
import AppSidebar from "../../../components/appSidebarComp/AppSidebar";
import "../../../components/appSidebarComp/appSidebar.css";
import IntegrationsPage from "../../../components/workplace-content/appointment-reminder-pages/online-booking-pages/integrations-pages/IntegrationsPage";
const Integrations = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="app-dashboard">
      <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className={`content ${isOpen ? "squeeze" : ""}`}>
        <IntegrationsPage />
      </div>
    </div>
  );
};

export default Integrations;
