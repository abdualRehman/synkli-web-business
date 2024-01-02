import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookingsModal } from "./bookings-modal/BookingsModal";
const OnlineBookingJumbo = ({ toggleBookingQuestionForm }) => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const toggleShowModal = () => {
    setShowModal(!showModal);
  };
  return (
    <div>
      <div className="profle-jumbo relative ">
        <div
          onClick={toggleShowModal}
          className="calendar-jumbo-toggler absolute cursor-pointer right-5 top-10"
        >
          <svg
            width="5"
            height="15"
            viewBox="0 0 8 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="4" cy="4" r="4" fill="url(#paint0_linear_1561_626)" />
            <circle cx="4" cy="17" r="4" fill="url(#paint1_linear_1561_626)" />
            <circle cx="4" cy="30" r="4" fill="url(#paint2_linear_1561_626)" />
            <defs>
              <linearGradient
                id="paint0_linear_1561_626"
                x1="4.39252"
                y1="0.099352"
                x2="4.38653"
                y2="8.00002"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#101828" />
                <stop offset="0.998509" stop-color="#0D1B37" />
                <stop offset="1" stop-color="#0A1E46" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_1561_626"
                x1="4.39252"
                y1="13.0994"
                x2="4.38653"
                y2="21"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#101828" />
                <stop offset="0.998509" stop-color="#0D1B37" />
                <stop offset="1" stop-color="#0A1E46" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_1561_626"
                x1="4.39252"
                y1="26.0994"
                x2="4.38653"
                y2="34"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#101828" />
                <stop offset="0.998509" stop-color="#0D1B37" />
                <stop offset="1" stop-color="#0A1E46" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {showModal && <BookingsModal />}
        <div className="profile-jumbo-flex px-10 py-5">
          <div className="jumbo-flex-1 ">
            <div className="flex gap-2 items-center">
              <div>
                <svg
                  width="12"
                  height="18"
                  viewBox="0 0 17 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16.4379 30.4223C15.6884 31.1926 14.4732 31.1926 13.7237 30.4223L0.562118 16.8948C-0.187375 16.1245 -0.187375 14.8755 0.562118 14.1052L13.7237 0.577745C14.4732 -0.192579 15.6884 -0.192579 16.4379 0.577745C17.1874 1.34807 17.1874 2.59702 16.4379 3.36734L4.63334 15.5L16.4379 27.6327C17.1874 28.403 17.1874 29.6519 16.4379 30.4223Z"
                    fill="#666666"
                  />
                </svg>
              </div>
              <div className="jumbo-name">Online Booking</div>
            </div>
            <div className="jumbo-dir mt-2">
              Workspace &gt; Appointments{" "}
              <span className="special-jumbo-text">
                &gt; Online Booking &gt; Services
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineBookingJumbo;
