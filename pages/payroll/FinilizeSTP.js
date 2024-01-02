import { useState } from "react";
import AppSidebar from "../../components/appSidebarComp/AppSidebar";
import "../../components/appSidebarComp/appSidebar.css";
import FinilizeSTPPage from "../../components/payrol-pages/finilize-stp-pages/FinilizeSTPPage";
import { YearToDateSummary } from "../../components/payrol-pages/finilize-stp-pages/YearToDateSummary";

const FinilizeSTP = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showYearToDateSummary, setShowYearToDateSummary] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const toggleYearToDateSummary = () => {
    setShowYearToDateSummary(!showYearToDateSummary);
  };

  return (
    <div className="app-dashboard">
      {showYearToDateSummary && (
        <YearToDateSummary toggleYearToDateSummary={toggleYearToDateSummary} />
      )}
      <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className={`content ${isOpen ? "squeeze" : ""}`}>
        <FinilizeSTPPage toggleYearToDateSummary={toggleYearToDateSummary} />
      </div>
    </div>
  );
};

export default FinilizeSTP;
