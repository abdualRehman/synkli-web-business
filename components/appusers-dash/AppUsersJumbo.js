import { SortIcon } from "../../utills/svgs/SortIcon";
import { StepDownIcon } from "../../utills/svgs/StepDownIcon";
import "./css/appusers.css";
const AppUsersJumbo = () => {
  return (
    <div className="app-users-jumbo px-10 py-5 relative">
      <div className="jumbo-name">App Users</div>

      <div className="jumbo-dir mt-2">
        <span className="special-jumbo-text">
          {" "}
          Applications &gt; App Users{" "}
        </span>
      </div>
    </div>
  );
};

export default AppUsersJumbo;
