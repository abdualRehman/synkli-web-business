import { useState } from "react";
const ReportsTable = () => {
  const [reports, setReports] = useState([
    {
      id: 1,
      firstName: "John",
      mobile: "1234567890",
      email: "johndoe@example.com",
      landline: "1234567890",
      startTime: "9:00 AM",
      endTime: "10:00 AM",
      calendar: "2023-01-01",
      customerReply: true,
    },
    {
      id: 2,
      firstName: "Jane",
      mobile: "9876543210",
      email: "janesmith@example.com",
      landline: "9876543210",
      startTime: "11:00 AM",
      endTime: "12:00 PM",
      calendar: "2023-02-01",
      customerReply: false,
    },
    {
      id: 3,
      firstName: "Alice",
      mobile: "4567891230",
      email: "alicejohnson@example.com",
      landline: "4567891230",
      startTime: "2:00 PM",
      endTime: "3:00 PM",
      calendar: "2023-03-01",
      customerReply: true,
    },
    {
      id: 4,
      firstName: "Bob",
      mobile: "7891234560",
      email: "bobwilliams@example.com",
      landline: "7891234560",
      startTime: "4:00 PM",
      endTime: "5:00 PM",
      calendar: "2023-04-01",
      customerReply: true,
    },
    {
      id: 5,
      firstName: "Eva",
      mobile: "3698521470",
      email: "evabrown@example.com",
      landline: "3698521470",
      startTime: "6:00 PM",
      endTime: "7:00 PM",
      calendar: "2023-05-01",
      customerReply: false,
    },
    {
      id: 6,
      firstName: "Michael",
      mobile: "2587413690",
      email: "michaelmiller@example.com",
      landline: "2587413690",
      startTime: "8:00 AM",
      endTime: "9:00 AM",
      calendar: "2023-06-01",
      customerReply: true,
    },
    {
      id: 7,
      firstName: "Olivia",
      mobile: "1478529630",
      email: "oliviadavis@example.com",
      landline: "1478529630",
      startTime: "10:00 AM",
      endTime: "11:00 AM",
      calendar: "2023-07-01",
      customerReply: false,
    },
    {
      id: 8,
      firstName: "William",
      mobile: "3216549870",
      email: "williamtaylor@example.com",
      landline: "3216549870",
      startTime: "12:00 PM",
      endTime: "1:00 PM",
      calendar: "2023-08-01",
      customerReply: true,
    },
  ]);

  return (
    <div>
      <div className="mx-10 mt-5 reports-table-wrapper ">
        <div className="reports-table-head report-table-heading">
          <div>First Name</div>
          <div>Mobile</div>
          <div>Email</div>
          <div>Landline</div>
          <div>Start Time</div>
          <div>End Time</div>
          <div>Calendar</div>
          <div>Customer Reply</div>
        </div>
        <hr className="mt-2" />
        {reports.map((report) => (
          <div>
            <div className="grid grid-cols-8 gap-5 reports-table-row">
              <div className="flex items-center">{report.firstName}</div>
              <div className="flex items-center">{report.mobile}</div>
              <div className="flex items-center">
                {report.email.substring(12)}
              </div>
              <div className="flex items-center">{report.landline}</div>
              <div className="flex items-center"> {report.startTime} </div>
              <div className="flex items-center"> {report.endTime} </div>
              <div className="flex items-center"> {report.calendar} </div>
              <div className="flex items-center">
                {" "}
                {report.customerReply ? "Yes" : "No"}{" "}
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
      <div className=" mt-10 pagination m-5">
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

export default ReportsTable;
