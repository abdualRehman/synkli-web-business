import AppSidebar from "../../components/appSidebarComp/AppSidebar";
import { useState } from "react";
import JobmakerPage from "../../components/payrol-pages/job-maker/JobmakerPage";
const JobMaker = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="app-dashboard">
      <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className={`content ${isOpen ? "squeeze" : ""}`}>
        <JobmakerPage />
      </div>
    </div>
  );
};
export default JobMaker;
