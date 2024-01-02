import "./css/bookings.css";
import BookingsJumbo from "./BookingsJumbo";
import BookingsOperations from "./BookingsOperations";
import BookingsTable from "./BookingsTable";
const BookingsPage = () => {
  return (
    <div>
      <div>
        <BookingsJumbo />
      </div>
      <div>
        <BookingsOperations />
      </div>
      <div>
        <BookingsTable />
      </div>
    </div>
  );
};

export default BookingsPage;
