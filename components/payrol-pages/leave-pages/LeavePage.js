import "./css/leave.css";
import { LeaveJumbo } from "./LeaveJumbo";
import { LeaveOperations } from "./LeaveOperations";
import { LeaveCards } from "./LeaveCards";
import { NoLeave } from "./NoLeave";
export const LeavePage = ({ toggleAnnualLeave }) => {
  return (
    <div>
      <div>
        {" "}
        <LeaveJumbo />
      </div>
      <div>
        <LeaveOperations />
      </div>
      <div>
        {" "}
        <LeaveCards toggleAnnualLeave={toggleAnnualLeave} />{" "}
      </div>
      {/* <NoLeave /> */}
    </div>
  );
};
