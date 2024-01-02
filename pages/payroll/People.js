import { useState } from "react";
import AppSidebar from "../../components/appSidebarComp/AppSidebar";
import "../../components/appSidebarComp/appSidebar.css";
import PeoplePage from "../../components/payrol-pages/people-pages/PeoplePage";
import InviteEmployee from "../../components/payrol-pages/people-pages/InviteEmployee";
import EmploymentDetails from "../../components/payrol-pages/people-pages/EmploymentDetails";
const People = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showInviteEmployee, setShowInviteEmployee] = useState(false);
  const [showEmploymentDetails, setShowEmploymentDetails] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleInviteEmployee = () => {
    setShowInviteEmployee(!showInviteEmployee);
  };

  const toggleEmploymentDetails = () => {
    setShowEmploymentDetails(!showEmploymentDetails);
  };

  return (
    <div className="app-dashboard">
      {showEmploymentDetails && (
        <EmploymentDetails toggleEmploymentDetails={toggleEmploymentDetails} />
      )}
      {showInviteEmployee && (
        <InviteEmployee toggleInviteEmployee={toggleInviteEmployee} />
      )}
      <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className={`content ${isOpen ? "squeeze" : ""}`}>
        <PeoplePage
          toggleInviteEmployee={toggleInviteEmployee}
          toggleEmploymentDetails={toggleEmploymentDetails}
        />
      </div>
    </div>
  );
};

export default People;
