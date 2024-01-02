import { useNavigate } from "react-router-dom";
import { SearchIcon } from "../../../../../utills/svgs/SearchIcon";
const BookingsOperations = () => {
  const navigate = useNavigate();
  return (
    <div className="bookings-operations mx-10 ">
      <div className="booking-page-main-heading mt-2">Bookings</div>
      <div className="bookings-inputs flex gap-5 flex-wrap mt-3">
        <div>
          <input type="text" placeholder="First Name" />
        </div>
        <div>
          <input type="text" placeholder="Last Name" />
        </div>
        <div>
          <input type="email" placeholder="Email" />
        </div>
        <div>
          <input type="tel" placeholder="Mobile" />
        </div>
      </div>

      <div className="bookings-inputs flex flex-wrap items-center gap-5 mt-3">
        <div>
          <label>Start Date</label>
        </div>
        <div>
          <input type="date" />
        </div>
        <div>
          <label> End Date</label>
        </div>
        <div>
          <input type="date" />
        </div>
        <div>
          <select>
            <option value="" selected disabled>
              Select Service
            </option>
          </select>
        </div>
        <div>
          <select>
            <option value="" selected disabled>
              Select Booking Status
            </option>
          </select>
        </div>
      </div>

      <div className="flex justify-between flex-wrap gap-3 items-center">
        <div className="flex gap-3 flex-wrap mt-3">
          <div>
            <div className="bookings-input-wrapper">
              <input
                type="text"
                placeholder="Search"
                className="bookings-input"
              />
              <div className="bookings-input-icon">
                <SearchIcon />
              </div>
            </div>
          </div>
          <div>
            <button className="bookings-reset-btn">Reset</button>
          </div>
        </div>

        <div>
          <button
            onClick={() => navigate("/add/booking")}
            className="service-save-btn"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
export default BookingsOperations;
