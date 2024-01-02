import React from "react";
import { useNavigate } from "react-router-dom";
export const BookingsModal = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="calendar-jumbo-modal absolute right-10 top-10 shadow">
        <div className="calendar-jumbo-modal-link px-3 py-2 flex gap-1 items-center">
          <div>Services</div>
        </div>

        <div className="calendar-jumbo-modal-link px-3 py-2 flex gap-1 items-center">
          <div>Availability</div>
        </div>

        <div
          onClick={() => navigate("/booking/page")}
          className="calendar-jumbo-modal-link px-3 py-2 flex gap-1 items-center"
        >
          <div>Booking Pages</div>
        </div>
        <div
          onClick={() => navigate("/question/form")}
          className="calendar-jumbo-modal-link px-3 py-2 flex gap-1 items-center"
        >
          Question Form
        </div>

        <div
          onClick={() => navigate("/email/templates")}
          className="calendar-jumbo-modal-link px-3 py-2 flex gap-1 items-center"
        >
          Email Template
        </div>
        <div
          onClick={() => navigate("/advanced/settings")}
          className="calendar-jumbo-modal-link px-3 py-2 flex gap-1 items-center"
        >
          Advance Settings
        </div>
        <div
          onClick={() => navigate("/integrations")}
          className="calendar-jumbo-modal-link px-3 py-2 flex gap-1 items-center"
        >
          Integrations
        </div>
      </div>
    </div>
  );
};
