import { useState } from "react";
import { useNavigate } from "react-router-dom";
const EmailTemplatesTable = () => {
  const navigate = useNavigate();
  const [emailTemplates, setEmailTemplates] = useState([
    {
      id: 1,
      name: "Sale Trader Tax Return (1 hour) [AUTO Created]",
      bookingType: "Sale Trader Tax Return (1 hour)",
    },
    {
      id: 2,
      name: "Sale Trader Tax Return (1 hour) [AUTO Created]",
      bookingType: "Sale Trader Tax Return (1 hour)",
    },
    {
      id: 3,
      name: "Sale Trader Tax Return (1 hour) [AUTO Created]",
      bookingType: "Sale Trader Tax Return (1 hour)",
    },
    {
      id: 9,
      name: "Sale Trader Tax Return (1 hour) [AUTO Created]",
      bookingType: "Sale Trader Tax Return (1 hour)",
    },

    {
      id: 4,
      name: "Sale Trader Tax Return (1 hour) [AUTO Created]",
      bookingType: "Sale Trader Tax Return (1 hour)",
    },
    {
      id: 5,
      name: "Sale Trader Tax Return (1 hour) [AUTO Created]",
      bookingType: "Sale Trader Tax Return (1 hour)",
    },
    {
      id: 6,
      name: "Sale Trader Tax Return (1 hour) [AUTO Created]",
      bookingType: "Sale Trader Tax Return (1 hour)",
    },
    {
      id: 7,
      name: "Sale Trader Tax Return (1 hour) [AUTO Created]",
      bookingType: "Sale Trader Tax Return (1 hour)",
    },
    {
      id: 8,
      name: "Sale Trader Tax Return (1 hour) [AUTO Created]",
      bookingType: "Sale Trader Tax Return (1 hour)",
    },
  ]);
  return (
    <div className="mx-10 mt-5">
      <div className="booking-page-main-heading">Email Templates</div>
      <div className="email-templates-table mt-5">
        <div className="email-templates-table-heading grid grid-cols-3 gap-5">
          <div className="flex gap-1 items-center">
            <div>Name</div>
            <div>
              <svg
                width="6"
                height="12"
                viewBox="0 0 10 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.13397 1.5C4.51887 0.833334 5.48113 0.833333 5.86603 1.5L8.4641 6C8.849 6.66667 8.36788 7.5 7.59808 7.5H2.40192C1.63212 7.5 1.151 6.66667 1.5359 6L4.13397 1.5Z"
                  fill="#B695F8"
                />
                <path
                  d="M5.86603 18.5C5.48113 19.1667 4.51887 19.1667 4.13397 18.5L1.5359 14C1.151 13.3333 1.63212 12.5 2.40192 12.5L7.59808 12.5C8.36788 12.5 8.849 13.3333 8.4641 14L5.86603 18.5Z"
                  fill="#B695F8"
                />
              </svg>
            </div>
          </div>
          <div>Booking Type</div>
          <div className="flex justify-end">Action</div>
        </div>
        <div className="team-line mt-2"></div>
        <div className="email-templates-table-body">
          {emailTemplates.map((template, index) => (
            <div>
              <div className="grid grid-cols-3 mt-2 gap-5">
                <div> {template.name} </div>
                <div>{template.bookingType}</div>
                <div
                  onClick={() => navigate(`/edit/email/template/${index}`)}
                  className="flex justify-end cursor-pointer"
                >
                  <svg
                    width="26"
                    height="24"
                    viewBox="0 0 36 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      opacity="0.1"
                      width="36"
                      height="30"
                      rx="15"
                      fill="#B695F8"
                    />
                    <path
                      d="M11.875 25C11.3594 25 10.9181 24.8043 10.5512 24.413C10.1837 24.021 10 23.55 10 23V7C10 6.45 10.1837 5.979 10.5512 5.587C10.9181 5.19567 11.3594 5 11.875 5H19.375L25 11V15H23.125V12H18.4375V7H11.875V23H17.5V25H11.875ZM23.4062 17.525L24.4141 18.6L20.7812 22.45V23.5H21.7656L25.3984 19.65L26.3828 20.7L22.3516 25H19.375V21.825L23.4062 17.525ZM26.3828 20.7L23.4062 17.525L24.7656 16.075C24.9375 15.8917 25.1562 15.8 25.4219 15.8C25.6875 15.8 25.9062 15.8917 26.0781 16.075L27.7422 17.85C27.9141 18.0333 28 18.2667 28 18.55C28 18.8333 27.9141 19.0667 27.7422 19.25L26.3828 20.7Z"
                      fill="#B695F8"
                    />
                  </svg>
                </div>
              </div>
              <div className="team-line mt-2"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="  pagination mt-10 mb-5">
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
export default EmailTemplatesTable;
