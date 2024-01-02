import { useState } from "react";
import AppSidebar from "../../../components/appSidebarComp/AppSidebar";
import "../../../components/appSidebarComp/appSidebar.css";
import BookingPageContent from "../../../components/workplace-content/appointment-reminder-pages/online-booking-pages/booking-page-content/BookingPageContent";
import AddBooking from "../../../components/workplace-content/appointment-reminder-pages/online-booking-pages/booking-page-content/AddBooking";
const BookingPage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showAddBooking, setShowAddBooking] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleAddBooking = () => {
    setShowAddBooking(!showAddBooking);
  };

  return (
    <div className="app-dashboard">
      {showAddBooking && <AddBooking toggleAddBooking={toggleAddBooking} />}

      <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className={`content ${isOpen ? "squeeze" : ""}`}>
        <BookingPageContent toggleAddBooking={toggleAddBooking} />
      </div>
    </div>
  );
};

export default BookingPage;
