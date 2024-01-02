import { useState } from "react";
import AppSidebar from "../../../components/appSidebarComp/AppSidebar";
import "../../../components/appSidebarComp/appSidebar.css";
import EmailTemplatesPage from "../../../components/workplace-content/appointment-reminder-pages/online-booking-pages/email-templates/EmailTemplatesPage";
const EmailTemplates = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="app-dashboard">
      <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className={`content ${isOpen ? "squeeze" : ""}`}>
        <EmailTemplatesPage />
      </div>
    </div>
  );
};

export default EmailTemplates;
