import { useState } from "react";
import { EyeIcon } from "../../../../../utills/svgs/EyeIcon";
import { BgDeleteIcon } from "../../../../../utills/svgs/BgDeleteIcon";
import { ArrowUpdown } from "../../../../../utills/svgs/ArrowUpdown";
const BookingsTable = () => {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      firstname: "John",
      lastname: "Doe",
      email: "john.doe@example.com",
      mobile: "1234567890",
      service: "Cleaning",
      status: "Confirmed",
      startdate: "2023-06-05",
      enddate: "2023-06-06",
      createddate: "2023-06-01",
    },
    {
      id: 2,
      firstname: "Jane",
      lastname: "Smith",
      email: "jane.smith@example.com",
      mobile: "9876543210",
      service: "Gardening",
      status: "Pending",
      startdate: "2023-06-08",
      enddate: "2023-06-10",
      createddate: "2023-05-28",
    },
    {
      id: 3,
      firstname: "Alice",
      lastname: "Johnson",
      email: "alice.johnson@example.com",
      mobile: "5555555555",
      service: "Painting",
      status: "Confirmed",
      startdate: "2023-06-12",
      enddate: "2023-06-15",
      createddate: "2023-05-30",
    },
    {
      id: 4,
      firstname: "Bob",
      lastname: "Anderson",
      email: "bob.anderson@example.com",
      mobile: "9999999999",
      service: "Plumbing",
      status: "Pending",
      startdate: "2023-06-18",
      enddate: "2023-06-19",
      createddate: "2023-05-25",
    },
    {
      id: 5,
      firstname: "Emily",
      lastname: "Wilson",
      email: "emily.wilson@example.com",
      mobile: "7777777777",
      service: "Electrical",
      status: "Confirmed",
      startdate: "2023-06-22",
      enddate: "2023-06-24",
      createddate: "2023-05-27",
    },
  ]);
  return (
    <div className="mx-10 mt-3 ">
      <div className="flex gap-1 items-center">
        <div>
          <input type="checkbox" />
        </div>
        <div className="app-needed-txt">Approval Needed</div>
      </div>
      <div className="bookings-table">
        <div className="bookings-table-headings mt-2">
          <div className="bookings-headings">
            <div className="flex gap-1 items-center">
              <div>First Name</div>
              <div>
                <ArrowUpdown />
              </div>
            </div>
            <div>Last Name</div>
            <div>Email</div>
            <div>Mobile</div>
            <div>Service</div>
            <div>Status</div>
            <div>Start Date</div>
            <div>End Date</div>
            <div>Created Date</div>
            <div>Action</div>
          </div>
        </div>
        <div className="bookings-table-body mt-2">
          {bookings.map((booking, index) => (
            <div>
              <div key={index} className="bookings-table-list mt-3">
                <div> {booking.firstname} </div>
                <div>{booking.lastname}</div>
                <div className="overflow-hidden">{booking.email}</div>
                <div>{booking.mobile}</div>
                <div>{booking.service}</div>
                <div>{booking.status}</div>
                <div>{booking.startdate}</div>
                <div>{booking.enddate}</div>
                <div>{booking.createddate}</div>
                <div className="flex gap-2 items-center">
                  <div>
                    <EyeIcon />
                  </div>
                  <div>
                    <BgDeleteIcon />
                  </div>
                </div>
              </div>
              <div className="team-line mt-3"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="  pagination my-5">
        <div className="recently-added">Showing 6 to 10 of 26 entries</div>
        <div className="pagination-btns">
          <button>Previous</button>
          <button className="btn-1-pag">1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button className="next-btn">Next</button>
        </div>
      </div>
    </div>
  );
};

export default BookingsTable;
