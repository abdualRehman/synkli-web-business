import "./css/appointmentReminderPage.css";
import AppointmentJumbo from "./AppointmentJumbo";
import AppointmentOperations from "./AppointmentOperations";
import AppointmentCards from "./AppointmentCards";
const AppointmentReminderPage = () => {
  return (
    <div>
      <div>
        <AppointmentJumbo />
      </div>
      <div>
        <AppointmentOperations />
      </div>
      <div>
        <AppointmentCards />
      </div>
    </div>
  );
};

export default AppointmentReminderPage;
