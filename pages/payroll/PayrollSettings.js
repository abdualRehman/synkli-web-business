import { useState } from "react";
import AppSidebar from "../../components/appSidebarComp/AppSidebar";
import "../../components/appSidebarComp/appSidebar.css";
import { PayrollSettingsPage } from "../../components/payrol-pages/payroll-settings/PayrollSettingsPage";
import { OrganizationSettings } from "../../components/payrol-pages/payroll-settings/payroll-settings-sides/OrganizationSettings";
import { STPSettings } from "../../components/payrol-pages/payroll-settings/payroll-settings-sides/stp-settings/STPSettings";
import { EmpPaymentOptions } from "../../components/payrol-pages/payroll-settings/emp-payment-options/EmpPaymentOptions";
import { SuperannuationSettings } from "../../components/payrol-pages/payroll-settings/superannuation-settings/css/SuperannuationSettings";
export const PayrollSettings = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showOrganizationSettings, setShowOrganizationSettings] =
    useState(false);
  const [showStpSettings, setShowStpSettings] = useState(false);
  const [showEmpPaymentOptions, setShowEmpPaymentOptions] = useState(false);
  const [showSuperSettings, setShpwSuperSettings] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleShowSuperSettings = () => {
    setShpwSuperSettings(!showSuperSettings);
  };

  const toggleEmpPaymentOptions = () => {
    setShowEmpPaymentOptions(!showEmpPaymentOptions);
  };

  const toggleStpSettings = () => {
    setShowStpSettings(!showStpSettings);
  };

  const toggleOrganizationSettings = () => {
    setShowOrganizationSettings(!showOrganizationSettings);
  };
  return (
    <div className="app-dashboard">
      {showSuperSettings && (
        <SuperannuationSettings
          toggleShowSuperSettings={toggleShowSuperSettings}
        />
      )}
      {showEmpPaymentOptions && (
        <EmpPaymentOptions toggleEmpPaymentOptions={toggleEmpPaymentOptions} />
      )}
      {showStpSettings && <STPSettings toggleStpSettings={toggleStpSettings} />}

      {showOrganizationSettings && (
        <OrganizationSettings
          toggleOrganizationSettings={toggleOrganizationSettings}
        />
      )}
      <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className={`content ${isOpen ? "squeeze" : ""}`}>
        <PayrollSettingsPage
          toggleStpSettings={toggleStpSettings}
          toggleOrganizationSettings={toggleOrganizationSettings}
          toggleEmpPaymentOptions={toggleEmpPaymentOptions}
          toggleShowSuperSettings={toggleShowSuperSettings}
        />
      </div>
    </div>
  );
};
