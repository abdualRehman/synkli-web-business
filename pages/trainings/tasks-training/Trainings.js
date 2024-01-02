import AppSidebar from "components/appSidebarComp/AppSidebar";
import AddedForms from "components/appusers-dash/forms/added-forms/AddedForms";
import { TrainingsPage } from "components/trainings-components/TrainingsPage";
import { AddedFormsTraining } from "components/trainings-components/form-training-components/AddedFormsTraining";
import React, { useState } from "react";

export const Trainings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <AddedFormsTraining />
      <div className="app-dashboard">
        <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

        <div className={`content ${isOpen ? "squeeze" : ""}`}>
          <TrainingsPage />
        </div>
      </div>
    </div>
  );
};
