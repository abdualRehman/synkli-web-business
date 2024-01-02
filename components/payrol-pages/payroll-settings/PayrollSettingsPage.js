import "./css/payrollSettings.css";
import { PayrollSettingsJumbo } from "./PayrollSettingsJumbo";
import { PayrollSettingsOperations } from "./PayrollSettingsOperations";
import { PayrollSettingsCards } from "./PayrollSettingsCards";
export const PayrollSettingsPage = ({
  toggleOrganizationSettings,
  toggleStpSettings,
  toggleEmpPaymentOptions,
  toggleShowSuperSettings,
}) => {
  return (
    <div>
      <div>
        {" "}
        <PayrollSettingsJumbo />{" "}
      </div>
      <div>
        {" "}
        <PayrollSettingsOperations />{" "}
      </div>
      <div>
        {" "}
        <PayrollSettingsCards
          toggleOrganizationSettings={toggleOrganizationSettings}
          toggleStpSettings={toggleStpSettings}
          toggleEmpPaymentOptions={toggleEmpPaymentOptions}
          toggleShowSuperSettings={toggleShowSuperSettings}
        />{" "}
      </div>
    </div>
  );
};
