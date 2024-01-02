import { useNavigate } from "react-router-dom";
import { SearchIcon } from "../../../../utills/svgs/SearchIcon";
const OSOperations = ({ toggleAddStatus, handleSearchTerm }) => {
  const navigate = useNavigate();
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
            onClick={toggleAddStatus}
            className="oso-add-btn px-10 py-2  rounded-md"
          >
            + Add
          </button>
        </div>
      </div>
    </div>
  );
};
export default OSOperations;
