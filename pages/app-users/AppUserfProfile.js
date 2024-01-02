import AppUserProfilePage from "../../components/appusers-dash/app-user-profile/AppUserProfilePage";
import Forms from "../../components/appusers-dash/forms/Forms";

import RentalDeduction from "../../components/appusers-dash/app-user-profile/rental-deduction/RentalDeduction";
import AbnDeduction from "../../components/appusers-dash/app-user-profile/abn-deduction/AbnDeduction";
import TfnDeduction from "../../components/appusers-dash/app-user-profile/tfn-deduction/TfnDeduction";
import AddedForms from "../../components/appusers-dash/forms/added-forms/AddedForms";
import CreateForm from "../../components/appusers-dash/forms/dynamic-form/CreateForm";
import PreviewForm from "../../components/appusers-dash/forms/dynamic-form/PreviewForm";
import { FormDetails } from "components/appusers-dash/forms/form-details/FormDetails";
import { EditCustomerForm } from "components/appusers-dash/forms/form-details/EditCustomerForm";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Attachment } from "@mui/icons-material";
import { Attachments } from "components/appusers-dash/forms/added-forms/Attachments";
import { UpdateForm } from "components/settings/form-settings/UpdateForm";
import { AddForm } from "components/appusers-dash/forms/dynamic-form/AddForm";
import { CustomerFormLogs } from "components/appusers-dash/forms/CustomerFormLogs";
const AppUserProfile = () => {
  const { previewForm } = useSelector((state) => state.global);
  const { id } = useParams();
  const { data: loginData } = useSelector((state) => state.login);

  const allPermissions = JSON.parse(localStorage.getItem("allPermissions"));

  const [showCompanyRegistration, setShowCompanyRegistration] = useState(false);
  const [showIE, setShowIE] = useState(false);
  const [showForms, setShowForms] = useState(false);
  const [showEntityForm, setShowEntityForm] = useState(false);
  const [showTrustRegistration, setShowTrustRegistration] = useState(false);
  const [showRentalDeduction, setShowRentalDeduction] = useState(false);
  const [showAbnDeduction, setShowAbnDeduction] = useState(false);
  const [showTfnDeduction, setShowTfnDeduction] = useState(false);
  const [showAddedForms, setShowAddedForms] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showPreviewForm, setShowPreviewForm] = useState(false);
  const [formArr, setFormArr] = useState(null);
  const [showEditCustomerForm, setShowEditCustomerForm] = useState(false);
  const [showAttchments, setShowAttachments] = useState(false);
  const [showFormDetails, setShowFormDetails] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showFormLogs, setShowFormLogs] = useState(false);

  const toggleFormLogs = () => {
    setShowFormLogs(!showFormLogs);
  };
  const handleUpdateForm = () => {
    setShowUpdateForm(!showUpdateForm);
  };
  const toggleAttachments = () => {
    setShowAttachments(!showAttchments);
  };
  const toggleFormDetails = () => {
    setShowFormDetails(!showFormDetails);
  };

  const togglePreviewForm = () => {
    setShowPreviewForm(!showPreviewForm);
  };

  const toggleAddedForms = () => {
    setShowForms(false);
    setShowIE(false);
    setShowEntityForm(false);
    setShowTrustRegistration(false);
    setShowRentalDeduction(false);
    setShowAbnDeduction(false);
    setShowTfnDeduction(false);
    setShowCreateForm(false);
    setShowAddedForms(!showAddedForms);
  };

  const toggleTfnDeduction = () => {
    setShowForms(false);
    setShowIE(false);
    setShowEntityForm(false);
    setShowTrustRegistration(false);
    setShowRentalDeduction(false);
    setShowAbnDeduction(false);
    setShowTfnDeduction(!showTfnDeduction);
  };

  const toggleAbnDeduction = () => {
    setShowForms(false);
    setShowIE(false);
    setShowEntityForm(false);
    setShowTrustRegistration(false);
    setShowRentalDeduction(false);
    setShowAbnDeduction(!showAbnDeduction);
  };

  const toggleRentalDeduction = () => {
    setShowForms(false);
    setShowIE(false);
    setShowEntityForm(false);
    setShowTrustRegistration(false);
    setShowRentalDeduction(!showRentalDeduction);
  };

  const toggleEntityForm = () => {
    setShowForms(false);
    setShowIE(false);
    setShowEntityForm(!showEntityForm);
  };

  const toggleForms = () => {
    setShowForms(false);
    setShowIE(false);
    setShowEntityForm(false);
    setShowTrustRegistration(false);
    setShowRentalDeduction(false);
    setShowAbnDeduction(false);
    setShowTfnDeduction(false);
    setShowCreateForm(false);
    setShowAddedForms(false);
    setShowCompanyRegistration(false);
    setShowForms(!showForms);
  };

  const toggleEditForm = () => {
    setShowEditCustomerForm(!showEditCustomerForm);
  };
  const directory = "Forms &gt; Submited  Forms &gt;";
  return (
    <div>
      {allPermissions?.Clients?.read ||
      allPermissions?.Clients?.write ||
      !loginData?.is_employee ||
      allPermissions?.Clients?.admin ? (
        <div>
          {showForms && (
            <Forms
              toggleAddedForms={toggleAddedForms}
              toggleEntityForm={toggleEntityForm}
              toggleForms={toggleForms}
              toggleFormDetails={toggleFormDetails}
              togglePreviewForm={togglePreviewForm}
              handleUpdateForm={handleUpdateForm}
            />
          )}
          {showFormDetails && (
            <FormDetails
              toggleFormLogs={toggleFormLogs}
              toggleFormDetails={toggleFormDetails}
              id={id}
              toggleEditForm={toggleEditForm}
              togglePreviewForm={togglePreviewForm}
              toggleAttachments={toggleAttachments}
            />
          )}
          {showFormLogs && <CustomerFormLogs toggleFormLogs={toggleFormLogs} />}
          {showUpdateForm && <UpdateForm handleUpdateForm={handleUpdateForm} />}
          {showEditCustomerForm && (
            <EditCustomerForm toggleEditForm={toggleEditForm} id={id} />
          )}
          {showAttchments && (
            <Attachments toggleAttachments={toggleAttachments} />
          )}
          {showPreviewForm && (
            <PreviewForm
              togglePreviewForm={togglePreviewForm}
              directory={directory}
            />
          )}
          <AppUserProfilePage
            toggleTfnDeduction={toggleTfnDeduction}
            toggleForms={toggleForms}
            toggleRentalDeduction={toggleRentalDeduction}
            toggleAbnDeduction={toggleAbnDeduction}
          />{" "}
        </div>
      ) : (
        <div className="w-full h-72 flex justify-center items-center font-poppins">
          You dont have permission to access this data
        </div>
      )}
    </div>
  );
};

export default AppUserProfile;
