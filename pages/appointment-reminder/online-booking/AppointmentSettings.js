import { useState } from "react";
import AppSidebar from "../../../components/appSidebarComp/AppSidebar";
import "../../../components/appSidebarComp/appSidebar.css";
import AppointmentSettingsPage from "../../../components/workplace-content/appointment-reminder-pages/appointment-settings-pages/AppointmentSettingsPage";
import DefaultReminderSettings from "../../../components/workplace-content/appointment-reminder-pages/appointment-settings-pages/DefaultReminderSettings";
const AppointmentSettings = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showDefaultReminderSettings, setShowDefaultReminderSettings] =
    useState(true);

  const toggleDefaultReminderSettings = () => {
    setShowDefaultReminderSettings(!showDefaultReminderSettings);
  };
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="app-dashboard">
      {showDefaultReminderSettings && (
        <DefaultReminderSettings
          toggleDefaultReminderSettings={toggleDefaultReminderSettings}
        />
      )}
      <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className={`content ${isOpen ? "squeeze" : ""}`}>
        <AppointmentSettingsPage />
      </div>
    </div>
  );
};

export default AppointmentSettings;
