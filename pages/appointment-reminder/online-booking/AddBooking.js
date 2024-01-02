import { useState } from "react";
import AppSidebar from "../../../components/appSidebarComp/AppSidebar";
import "../../../components/appSidebarComp/appSidebar.css";
import AddBookingPage from "../../../components/workplace-content/appointment-reminder-pages/online-booking-pages/bookings/add-booking-pages/AddBookingPage";
const AddBooking = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="app-dashboard">
      <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className={`content ${isOpen ? "squeeze" : ""}`}>
        <AddBookingPage />
      </div>
    </div>
  );
};
export default AddBooking;
