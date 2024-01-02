import AppSidebar from "../../components/appSidebarComp/AppSidebar";
import RunPayrollPage from "../../components/payrol-pages/run-payroll/RunPayrollPage";
import PayRunDetails from "../../components/payrol-pages/payroll-sides/PayRunDetails";
import PaymentSummary from "../../components/payrol-pages/payroll-sides/PaymentSummary";
import { useState } from "react";
const RunPayroll = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showPayDetails, setShowPayDetails] = useState(false);
  const [showPaymentSummary, setShowPaymentSummary] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const togglePayDetails = () => {
    setShowPayDetails(!showPayDetails);
  };
  const togglePaymentSummary = () => {
    setShowPaymentSummary(!showPaymentSummary);
    console.log("payment summary");
  };
  return (
    <div className="app-dashboard">
      {showPayDetails && <PayRunDetails togglePayDetails={togglePayDetails} />}
      {showPaymentSummary && (
        <PaymentSummary togglePaymentSummary={togglePaymentSummary} />
      )}
      <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className={`content ${isOpen ? "squeeze" : ""}`}>
        <RunPayrollPage
          togglePayDetails={togglePayDetails}
          togglePaymentSummary={togglePaymentSummary}
        />
      </div>
    </div>
  );
};
export default RunPayroll;
