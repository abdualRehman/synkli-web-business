import "./css/bookingPage.css";
import BookingPageJumbo from "./BookingPageJumbo";
import BookingPageTable from "./BookingPageTable";
const BookingPageContent = ({ toggleAddBooking }) => {
  return (
    <div>
      <BookingPageJumbo />
      <div>
        <BookingPageTable toggleAddBooking={toggleAddBooking} />
      </div>
    </div>
  );
};

export default BookingPageContent;
