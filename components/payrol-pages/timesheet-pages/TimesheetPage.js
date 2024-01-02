import "./css/timesheet.css";
import { TimesheetJumbo } from "./TimesheetJumbo";
import { NoTimesheet } from "./NoTimesheet";
import { TimesheetOperations } from "./TimesheetOperations";
export const TimesheetPage = ({ toggleAddTimesheet }) => {
  return (
    <div>
      <div>
        {" "}
        <TimesheetJumbo toggleAddTimesheet={toggleAddTimesheet} />{" "}
      </div>
      <TimesheetOperations />
      <div>
        {" "}
        <NoTimesheet />{" "}
      </div>
    </div>
  );
};
