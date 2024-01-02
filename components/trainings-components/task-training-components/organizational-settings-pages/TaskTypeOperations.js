import { SearchIcon } from "../../../../utills/svgs/SearchIcon";
const TaskTypeOperations = ({ toggleTaskType, addSearchTerm }) => {
  return (
    <div className="md:px-10 px-5 mt-2 ">
      <div className="flex justify-end">
        <div>
          <button
            onClick={toggleTaskType}
            className="oso-add-btn px-16 py-2  rounded-md"
          >
            + Add
          </button>
        </div>
      </div>
    </div>
  );
};
export default TaskTypeOperations;
