import { SearchIcon } from "../../../utills/svgs/SearchIcon";
const AppointmentOperations = () => {
  return (
    <div className="px-10">
      <div className="app-search-wrapper ">
        <div className="app-icon">
          <SearchIcon />
        </div>
        <input type="text" placeholder="Search" className="app-search" />
      </div>
    </div>
  );
};
export default AppointmentOperations;
