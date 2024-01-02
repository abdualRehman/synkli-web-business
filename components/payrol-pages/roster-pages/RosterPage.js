import "./css/roster.css";
import { RosterJumbo } from "./RosterJumbo";
import { RosterOperations } from "./RosterOperations";
import { NoRoster } from "./NoRoster";
export const RosterPage = ({ toggleAddRoster }) => {
  return (
    <div>
      <div>
        {" "}
        <RosterJumbo toggleAddRoster={toggleAddRoster} />{" "}
      </div>
      <div>
        {" "}
        <RosterOperations />{" "}
      </div>
      <div>
        {" "}
        <NoRoster />{" "}
      </div>
    </div>
  );
};
