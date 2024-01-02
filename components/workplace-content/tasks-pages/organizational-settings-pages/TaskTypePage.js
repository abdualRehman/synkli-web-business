import TaskTypeJumbo from "./TaskTypeJumbo";
import TaskTypeOperations from "./TaskTypeOperations";
import OStasksType from "./OStasksType";
import { useState } from "react";
const TaskTypePage = ({ toggleTaskType, typesUpdated }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const addSearchTerm = (term) => {
    setSearchTerm(term);
  };
  return (
    <div>
      <TaskTypeJumbo />
      <div>
        <TaskTypeOperations
          toggleTaskType={toggleTaskType}
          addSearchTerm={addSearchTerm}
        />
      </div>
      <div>
        <OStasksType searchTerm={searchTerm} typesUpdated={typesUpdated} />
      </div>
    </div>
  );
};
export default TaskTypePage;
