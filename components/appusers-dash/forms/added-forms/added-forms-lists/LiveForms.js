import { useState } from "react";
import { SearchIcon } from "../../../../../utills/svgs/SearchIcon";
import { EyeIcon } from "../../../../../utills/svgs/EyeIcon";
import { BgPencilIcon } from "../../../../../utills/svgs/BgPencilIcon";
import { BgDeleteIcon } from "../../../../../utills/svgs/BgDeleteIcon";
import { useDispatch, useSelector } from "react-redux";
import { NoDataFound } from "components/common/NoDataFound";
import { formatTimestamp, formateDate } from "../../../../../utills/moment";
import {
  formHandler,
  handleBusinessFormEvent,
  previewFormToggler,
  setSideLoader,
  updateFormToggler,
} from "store/global/globalReducer";
import { archiveBusinessFormThunk } from "store/form";
import { motion } from "framer-motion";
import { generateId } from "utills/uid";
import store from "store/store";
import { toastHandler } from "responseHanlder";
import { ERROR_TYPE_ERROR } from "utills/globalVars";
import _ from "lodash";
import ConfirmationModal from "utills/confirmationModal";
const LiveForms = ({
  toggleFormsUpdated,
  togglePreviewForm,
  handleUpdateForm,
}) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.fetchForms);
  const { data: loginData } = useSelector((state) => state.login);
  const allPermissions = JSON.parse(localStorage.getItem("allPermissions"));
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const { sideLoader } = useSelector((state) => state.global);

  const { businessFormEvent } = useSelector((state) => state.global);
  const { previewForm, updateForm } = useSelector((state) => state.global);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [form_id, setFormId] = useState("");
  const [service_id, setServiceId] = useState("");

  let filteredForms = _.clone(
    data?.filter((form) => {
      return (
        form.form_name.toLowerCase().includes(searchValue.toLowerCase()) ||
        form.created_at.toLowerCase().includes(searchValue.toLowerCase())
      );
    })
  );

  const archiveBusinessForm = (form_id, service_id) => {
    if (
      !loginData?.is_employee ||
      allPermissions?.Forms?.admin ||
      allPermissions?.Forms?.write
    ) {
      setFormId(form_id);
      setServiceId(service_id);
      setIsConfirmationOpen(true);
    } else {
      toastHandler(
        "You dont have permission to perform this action",
        ERROR_TYPE_ERROR
      );
    }

    // if (loginData?.is_employee) {
    //   if (!allPermissions?.Forms?.write) {
    //     toastHandler(
    //       "You don't have permission to do this action",
    //       ERROR_TYPE_ERROR
    //     );
    //     return;
    //   }
    // }
    // setFormId(form_id);
    // setServiceId(service_id);
    // setIsConfirmationOpen(true);
  };

  const viewBusinessForm = (form_id, service_id) => {
    const form = data?.find((form) => form?.form_id === form_id);
    dispatch(formHandler(form));
    togglePreviewForm();
  };

  const updateFormHandle = (form_id, service_id) => {
    if (
      !loginData?.is_employee ||
      allPermissions?.Forms?.admin ||
      allPermissions?.Forms?.write
    ) {
      const form = data?.find((form) => form?.form_id === form_id);
      if (form) {
        console.log(form, "formm");
        dispatch(formHandler(form));
        handleUpdateForm();
      }
    } else {
      toastHandler(
        "You dont have permission to perform this action",
        ERROR_TYPE_ERROR
      );
    }

    // if (loginData?.is_employee) {
    //   if (!allPermissions?.Forms?.write) {
    //     toastHandler(
    //       "You don't have permission to do this action",
    //       ERROR_TYPE_ERROR
    //     );
    //     return;
    //   }
    // }
    // const form = data?.find((form) => form?.form_id === form_id);
    // if (form) {
    //   console.log(form, "formm");
    //   dispatch(formHandler(form));
    //   handleUpdateForm();
    // }
  };
  const handleDelete = () => {
    setIsConfirmationOpen(false);
    console.log(businessFormEvent);
    const form = filteredForms?.find((f) => f?.form_id === form_id);
    const index = filteredForms?.indexOf(form);
    setDeleteIndex(index);

    dispatch(setSideLoader(true));
    dispatch(archiveBusinessFormThunk({ form_id, service_id }))
      .then((response) => {
        console.log(response);
        if (response.payload) {
          toggleFormsUpdated();
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setSideLoader(false));
      });
  };

  return (
    <div className="prebuilt-forms text-black">
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={handleDelete}
      />
      <div className="prebuilt-search-wrapper">
        <div className="prebuilt-icon-wrapper">
          <SearchIcon />
        </div>
        <input
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          className="prebuilt-input-wrapper"
          placeholder="Search"
        />
      </div>

      {filteredForms && filteredForms.length ? (
        <div>
          <div className="prebuilt-form-heading grid grid-cols-3 mt-5">
            <div>Form Name</div>
            <div className="flex justify-center">Created Date</div>
            <div className="flex justify-end mr-5">Action</div>
          </div>
          <hr className="mt-3"></hr>
          {filteredForms.map((form, index) => (
            <div
              key={generateId()}
              className={`${
                deleteIndex === index && sideLoader ? "animate-pulse" : ""
              }`}
            >
              <div className="prebuilt-form-text mt-1  grid grid-cols-3 ">
                <div>
                  <div className="flex items-center h-full">
                    {form.form_name}
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  {formateDate(form.created_at)}
                </div>
                <div className="flex justify-end items-center gap-1">
                  <div
                    className="cursor-pointer"
                    onClick={() =>
                      viewBusinessForm(form?.form_id, form?.service_id)
                    }
                  >
                    <EyeIcon />
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() =>
                      updateFormHandle(form?.form_id, form?.service_id)
                    }
                  >
                    <BgPencilIcon />
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() =>
                      archiveBusinessForm(form?.form_id, form?.service_id)
                    }
                  >
                    <BgDeleteIcon />
                  </div>
                </div>
              </div>

              <hr className="mt-3"></hr>
            </div>
          ))}
        </div>
      ) : (
        <NoDataFound message="No Data Found" />
      )}
    </div>
  );
};
export default LiveForms;
