import { useState } from "react";
import { ThreeDotIcon } from "../../../../utills/svgs/ThreeDotIcon";
import { SettingsIcon } from "../../../../utills/svgs/SettingsIcon";
import { ArrowLeft } from "../../../../utills/svgs/ArrowLeft";
import { useNavigate } from "react-router-dom";
const CalendarJumbo = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const toggleShowModal = () => {
    setShowModal(!showModal);
  };
  return (
    <div>
      <div className="profle-jumbo ">
        <div className="profile-jumbo-flex px-10 py-5 relative">
          <div
            onClick={toggleShowModal}
            className="calendar-jumbo-toggler absolute cursor-pointer right-5 top-10"
          >
            <ThreeDotIcon />
          </div>
          {showModal && (
            <div className="calendar-jumbo-modal absolute right-10 top-10 shadow">
              <div className="calendar-jumbo-modal-link px-3 py-2 flex gap-1 items-center">
                <div>
                  <SettingsIcon />
                </div>
                <div>Calendar Settings</div>
              </div>
            </div>
          )}
          <div className="jumbo-flex-1 ">
            <div className="flex gap-2 items-center">
              <div
                onClick={() => navigate("/appointment/reminder")}
                className="cursor-pointer"
              >
                <ArrowLeft />
              </div>
              <div className="jumbo-name">Calendar</div>
            </div>
            <div className="jumbo-dir mt-2">
              Workspace &gt; Appointments{" "}
              <span className="special-jumbo-text"> &gt; Calendar </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarJumbo;
