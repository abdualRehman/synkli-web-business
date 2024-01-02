import "./css/advancedSettings.css";
import AdvancedSettingsJumbo from "./AdvancedSettingsJumbo";
import AdvancedSettingsCards from "./AdvancedSettingsCards";
const AdvancedSettingsPage = () => {
  return (
    <div>
      <AdvancedSettingsJumbo />
      <div>
        <AdvancedSettingsCards />
      </div>
    </div>
  );
};

export default AdvancedSettingsPage;
