import { useNavigate } from "react-router-dom";
import { SearchIcon } from "../../../../utills/svgs/SearchIcon";
import { useEffect } from "react";
import { driver } from "driver.js";
const OSOperations = ({ toggleAddStatus, handleSearchTerm, showAddStatus }) => {
  const navigate = useNavigate();
  const driverObj = driver({
    popoverClass: "driverjs-theme",
    stagePadding: 4,
    allowClose: false,
  });

  const toggle = () => {
    driverObj.destroy();
    toggleAddStatus(driverObj);
  };

  useEffect(() => {
    if (!showAddStatus) {
      driverObj.highlight({
        element: ".task-add-indicator",
        popover: {
          description: "Click highlighted button please",
        },
      });
    } else {
      driverObj.destroy();
    }
  }, [showAddStatus]);
  return (
    <div className="md:px-10 px-5 mt-2 ">
      <div className="flex justify-end flex-wrap items-center gap-3">
        <div>
          <button className="oso-add-btn px-5 py-2  rounded-md">
            View Logs
          </button>
        </div>
        <div>
          <button
            onClick={() => navigate("/task/type")}
            className="oso-add-btn px-5 py-2  rounded-md"
          >
            Tasks Type
          </button>
        </div>
        <div>
          <button
            onClick={toggle}
            className="oso-add-btn px-10 py-2  rounded-md  task-add-indicator"
          >
            + Add
          </button>
        </div>
      </div>
    </div>
  );
};
export default OSOperations;
