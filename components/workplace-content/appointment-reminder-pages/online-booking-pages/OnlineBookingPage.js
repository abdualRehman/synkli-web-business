import "./css/onlineBooking.css";
import OnlineBookingJumbo from "./OnlineBookingJumbo";
import ServicesCards from "./ServicesCards";
const OnlineBookingPage = ({ toggleAddService, toggleBookingQuestionForm }) => {
  return (
    <div>
      <OnlineBookingJumbo
        toggleBookingQuestionForm={toggleBookingQuestionForm}
      />
      <div>
        <ServicesCards toggleAddService={toggleAddService} />
      </div>
    </div>
  );
};

export default OnlineBookingPage;
