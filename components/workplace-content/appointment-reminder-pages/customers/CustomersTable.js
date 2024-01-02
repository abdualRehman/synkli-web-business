import { useState } from "react";
import { BgDeleteIcon } from "../../../../utills/svgs/BgDeleteIcon";
import { BgMessageIcon } from "../../../../utills/svgs/BgMessageIcon";
import { ArrowUpdown } from "../../../../utills/svgs/ArrowUpdown";
const CustomersTable = () => {
  const [customers, setCustomers] = useState([
    {
      id: 4,
      firstname: "Bob",
      lastname: "Anderson",
      mobile: "9999999999",
      email: "bob@example.com",
      homePhone: "8888888888",
      sendSMS: true,
      sendEmail: false,
      sendPhone: true,
      appointment: 2,
    },
    {
      id: 5,
      firstname: "Emily",
      lastname: "Wilson",
      mobile: "7777777777",
      email: "emily@example.com",
      homePhone: "2222222222",
      sendSMS: false,
      sendEmail: true,
      sendPhone: true,
      appointment: 6,
    },
    {
      id: 6,
      firstname: "Michael",
      lastname: "Thompson",
      mobile: "3333333333",
      email: "michael@example.com",
      homePhone: "4444444444",
      sendSMS: true,
      sendEmail: true,
      sendPhone: false,
      appointment: 1,
    },
    {
      id: 7,
      firstname: "Sarah",
      lastname: "Lee",
      mobile: "6666666666",
      email: "sarah@example.com",
      homePhone: "5555555555",
      sendSMS: true,
      sendEmail: false,
      sendPhone: true,
      appointment: 7,
    },
    {
      id: 8,
      firstname: "David",
      lastname: "Brown",
      mobile: "2222222222",
      email: "david@example.com",
      homePhone: "9999999999",
      sendSMS: false,
      sendEmail: true,
      sendPhone: true,
      appointment: 4,
    },
    {
      id: 5,
      firstname: "Emily",
      lastname: "Wilson",
      mobile: "7777777777",
      email: "emily@example.com",
      homePhone: "2222222222",
      sendSMS: false,
      sendEmail: true,
      sendPhone: true,
      appointment: 6,
    },
    {
      id: 6,
      firstname: "Michael",
      lastname: "Thompson",
      mobile: "3333333333",
      email: "michael@example.com",
      homePhone: "4444444444",
      sendSMS: true,
      sendEmail: true,
      sendPhone: false,
      appointment: 1,
    },
    {
      id: 7,
      firstname: "Sarah",
      lastname: "Lee",
      mobile: "6666666666",
      email: "sarah@example.com",
      homePhone: "5555555555",
      sendSMS: true,
      sendEmail: false,
      sendPhone: true,
      appointment: 7,
    },
    {
      id: 8,
      firstname: "David",
      lastname: "Brown",
      mobile: "2222222222",
      email: "david@example.com",
      homePhone: "9999999999",
      sendSMS: false,
      sendEmail: true,
      sendPhone: true,
      appointment: 4,
    },
  ]);
  return (
    <div>
      <div className="px-10 mt-3 customers-table  ">
        <div className="flex gap-1 items-center">
          <div>
            {" "}
            <input type="checkbox" />{" "}
          </div>
          <div>
            {" "}
            <label className="early-label">
              Only show customers with appointments
            </label>{" "}
          </div>
        </div>

        <div className="my-customers-table">
          <div className="customers-grid mt-3 ">
            <div className="flex gap-1 items-center">
              {" "}
              <span>First Name </span>{" "}
              <span>
                <ArrowUpdown />
              </span>{" "}
            </div>

            <div className="flex gap-1 items-center">
              {" "}
              <span>Last Name </span>{" "}
              <span>
                <ArrowUpdown />
              </span>{" "}
            </div>
            <div>Mobile</div>
            <div>Email</div>
            <div className="flex justify-center items-center">Home Phone</div>
            <div className="flex justify-center items-center">Send SMS</div>
            <div>Send Email</div>
            <div>Send Phone</div>

            <div className="flex gap-1 items-center">
              {" "}
              <span>Appointment </span>{" "}
              <span>
                <ArrowUpdown />
              </span>{" "}
            </div>
            <div>Action</div>
          </div>

          <hr className=" my-customer-line mt-3" />

          {customers.map((customer, index) => (
            <div>
              <div className="customer-table-text mt-3">
                <div className=" customers-table-body" key={index}>
                  <div> {customer.firstname} </div>
                  <div>{customer.lastname}</div>
                  <div> {customer.mobile} </div>
                  <div> {customer.email} </div>
                  <div className="pl-10"> {customer.homePhone} </div>
                  <div className="flex justify-center items-center">
                    {" "}
                    {customer.sendSMS ? "True" : "false"}{" "}
                  </div>
                  <div> {customer.sendEmail ? "True" : "false"} </div>
                  <div> {customer.sendPhone ? "True" : "false"} </div>
                  <div>
                    {" "}
                    <span className="appointment-number">
                      {customer.appointment}
                    </span>{" "}
                  </div>
                  <div>
                    <div className="flex gap-2">
                      <div>
                        <BgMessageIcon />
                      </div>
                      <div>
                        <BgDeleteIcon />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="my-customer-line mt-3" />
            </div>
          ))}
        </div>
      </div>
      <div className=" my-5 mx-5  pagination">
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
export default CustomersTable;
