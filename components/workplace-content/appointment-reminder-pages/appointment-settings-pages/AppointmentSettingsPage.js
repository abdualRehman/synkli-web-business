import "./css/appointmentSettings.css";
import AppointmentSettingsJumbo from "./AppointmentSettingsJumbo";
import AppointmentSettingsOperations from "./AppointmentSettingsOperations";
import AppointmentSettingsCards from "./AppointmentSettingsCards";
const AppointmentSettingsPage = () => {
  return (
    <div>
      <div>
        <AppointmentSettingsJumbo />
      </div>
      <div>
        <AppointmentSettingsOperations />
      </div>
      <div>
        <AppointmentSettingsCards />
      </div>
    </div>
  );
};

export default AppointmentSettingsPage;
