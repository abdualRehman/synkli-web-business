import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ThreeDotIcon } from "../../../../utills/svgs/ThreeDotIcon";
import { OrganizationModal } from "./OrganizationModal";
import { ArrowLeft } from "utills/svgs/ArrowLeft";
const TaskTypeJumbo = () => {
  const [showOsjModal, setShowOsjModal] = useState(false);
  const navigate = useNavigate();

  function toggleOsjModal() {
    setShowOsjModal(!showOsjModal);
  }

  function showDynamicStatus() {
    navigate("/organizational/settings");
  }
  function showTaskType() {
    navigate("/task/type");
  }
  return (
    <div className="profle-jumbo ann-jumbo relative app-jumbo oso-jumbo  md:flex md:flex-row flex-col  px-10 py-5 md:justify-between ">
      <div className="profile-jumbo-flex">
        <div className="jumbo-flex-1 ">
          <div className="flex justify-between">
            <div className="jumbo-name flex gap-2 items-center">
              <div onClick={showDynamicStatus} className="cursor-pointer">
                <ArrowLeft />
              </div>
              <div>Organizational Settings</div>
            </div>
          </div>
          <div className="jumbo-dir mt-2">
            Workspace &gt; Tasks{" "}
            <span className="special-jumbo-text">
              &gt; Organizational Settings &gt; Task Type
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

export default TaskTypeJumbo;
