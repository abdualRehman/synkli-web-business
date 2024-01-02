import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDotIcon } from "../../../../utills/svgs/ThreeDotIcon";
import { ArrowLeft } from "../../../../utills/svgs/ArrowLeft";
import { OrganizationModal } from "./OrganizationModal";
const OSJumbo = ({ handleCondition }) => {
  const [showOsjModal, setShowOsjModal] = useState(false);
  const navigate = useNavigate();

  function toggleOsjModal() {
    setShowOsjModal(!showOsjModal);
  }

  function showDynamicStatus() {
    handleCondition(1);
  }
  function showTaskType() {
    navigate("/task/type");
  }
  return (
    <div className=" relative  md:flex md:flex-row flex-col  px-10 py-5 md:justify-between ">
      <div className="profile-jumbo-flex">
        <div className="jumbo-flex-1 ">
          <div className="flex justify-between">
            <div className="jumbo-name flex gap-2 items-center">
              <div
                onClick={() => navigate("/tasks")}
                className="cursor-pointer"
              >
                <ArrowLeft />
              </div>
              <div>Organizational Settings</div>
            </div>
          </div>
          <div className="jumbo-dir mt-2">
            Workspace &gt; Tasks{" "}
            <span className="special-jumbo-text">
              &gt; Organizational Settings &gt; Dynamic Status
            </span>
          </div>
        </div>
      </div>

      <div
        onClick={toggleOsjModal}
        className="absolute cursor-pointer right-10 top-10"
      >
        <ThreeDotIcon />
      </div>
      {showOsjModal && (
        <OrganizationModal
          showDynamicStatus={showDynamicStatus}
          showTaskType={showTaskType}
        />
      )}
    </div>
  );
};

export default OSJumbo;
