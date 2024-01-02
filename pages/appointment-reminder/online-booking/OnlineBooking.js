import { useState } from "react";
import AppSidebar from "../../../components/appSidebarComp/AppSidebar";
import "../../../components/appSidebarComp/appSidebar.css";
import OnlineBookingPage from "../../../components/workplace-content/appointment-reminder-pages/online-booking-pages/OnlineBookingPage";
import AddServicePage from "../../../components/workplace-content/appointment-reminder-pages/online-booking-pages/AddServicePage";
import BookingQuestionForm from "../../../components/workplace-content/appointment-reminder-pages/online-booking-pages/BookingQuestionForm";
const OnlineBooking = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showAddService, setShowAddService] = useState(false);
  const [showBookingQuestionForm, setShowBookingQuestionForm] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleAddService = () => {
    setShowAddService(!showAddService);
  };

  const toggleBookingQuestionForm = () => {
    setShowBookingQuestionForm(!showBookingQuestionForm);
  };
  return (
    <div className="app-dashboard">
      {showAddService && (
        <AddServicePage
          toggleAddService={toggleAddService}
          toggleBookingQuestionForm={toggleBookingQuestionForm}
        />
      )}
      {showBookingQuestionForm && (
        <BookingQuestionForm
          toggleBookingQuestionForm={toggleBookingQuestionForm}
        />
      )}
      <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className={`content ${isOpen ? "squeeze" : ""}`}>
        <OnlineBookingPage
          toggleAddService={toggleAddService}
          toggleBookingQuestionForm={toggleBookingQuestionForm}
        />
      </div>
    </div>
  );
};
export default OnlineBooking;
