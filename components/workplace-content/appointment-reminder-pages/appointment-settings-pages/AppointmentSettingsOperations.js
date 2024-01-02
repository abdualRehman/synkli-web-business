import { SearchIcon } from "../../../../utills/svgs/SearchIcon";

const AppointmentSettingsOperations = () => {
  return (
    <div className="mx-10 mt-3">
      <div className="settings-input-wrapper shadow">
        <input type="text" placeholder="Search" className="settings-input" />
        <div className="settings-icon">
          <SearchIcon />
        </div>
      </div>
    </div>
  );
};

export default AppointmentSettingsOperations;
