import React from "react";
import { useState } from "react";
import SettingsJumbo from "./SettingsJumbo";
import { SettingsCards } from "./SettingsCards";
import AddedForms from "components/appusers-dash/forms/added-forms/AddedForms";
import AppSidebar from "components/appSidebarComp/AppSidebar";
import CreateForm from "../../components/appusers-dash/forms/dynamic-form/CreateForm";
import PreviewForm from "components/appusers-dash/forms/dynamic-form/PreviewForm";
import { UpdateForm } from "./form-settings/UpdateForm";

import { useSelector } from "react-redux";

import { useEffect } from "react";
import { AddForm } from "components/appusers-dash/forms/dynamic-form/AddForm";

export const SettingsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { previewForm } = useSelector((state) => state.global);
  const { updateForm } = useSelector((state) => state.global);
  const [showAddForm, setShowAddDForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updatedForms, setUpdatedForms] = useState(false);
  const [condition, setCondition] = useState("");
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleUpdatedForms = () => {
    setUpdatedForms(!updatedForms);
  };

  const handleUpdateForm = () => {
    setShowUpdateForm(!showUpdateForm);
  };
  const [showAddedForms, setShowAddedForms] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showPreviewForm, setShowPreviewForm] = useState(false);
  const [formArr, setFormArr] = useState(null);

  const toggleAddedForms = () => {
    console.log(showAddedForms);

    if (showAddedForms) {
      setShowAddedForms(false);
    } else {
      setShowAddedForms(true);
    }
  };
  const toggleCreateForm = (condition) => {
    setCondition(condition);
    setShowCreateForm(!showCreateForm);
  };

  const togglePreviewForm = () => {
    setShowPreviewForm(!showPreviewForm);
  };

  const formHandler = (form) => {
    setFormArr(form);
  };
  const directory = " Forms &gt; Added Forms &gt; Preview Form &gt;";
  return (
    <div className="app-dashboard">
      {showAddedForms ? (
        <AddedForms
          updatedForms={updatedForms}
          handleUpdateForm={handleUpdateForm}
          toggleAddedForms={toggleAddedForms}
          toggleCreateForm={toggleCreateForm}
          togglePreviewForm={togglePreviewForm}
        />
      ) : (
        ""
      )}
      {showCreateForm && (
        <AddForm
          condition={condition}
          togglePreviewForm={togglePreviewForm}
          toggleCreateForm={toggleCreateForm}
        />
        // <CreateForm
        //   toggleCreateForm={toggleCreateForm}
        //   formHandler={formHandler}
        //   togglePreviewForm={togglePreviewForm}
        //   toggleAddedForms={toggleAddedForms}
        // />
      )}

      {showPreviewForm && (
        <PreviewForm
          togglePreviewForm={togglePreviewForm}
          toggleCreateForm={toggleCreateForm}
          directory={directory}
        />
      )}
      {showUpdateForm ? <UpdateForm handleUpdateForm={handleUpdateForm} /> : ""}
      <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className={`content ${isOpen ? "squeeze" : ""}`}>
        <SettingsJumbo />
        <SettingsCards toggleAddedForms={toggleAddedForms} />
      </div>
    </div>
  );
};
