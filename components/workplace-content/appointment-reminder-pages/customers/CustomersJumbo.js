import { useState } from "react";
import { ThreeDotIcon } from "../../../../utills/svgs/ThreeDotIcon";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "../../../../utills/svgs/ArrowLeft";
const CustomersJumbo = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const toggleShowModal = () => {
    return;
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

          <div className="jumbo-flex-1 ">
            <div className="flex gap-2 items-center">
              <div
                onClick={() => navigate("/appointment/reminder")}
                className="cursor-pointer"
              >
                <ArrowLeft />
              </div>
              <div className="jumbo-name">Customers</div>
            </div>
            <div className="jumbo-dir mt-2">
              Workspace &gt; Appointments{" "}
              <span className="special-jumbo-text"> &gt; Customers </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomersJumbo;
