import { useState } from "react";
import { SearchIcon } from "../../../../../utills/svgs/SearchIcon";
import { EyeIcon } from "../../../../../utills/svgs/EyeIcon";
import { BgPencilIcon } from "../../../../../utills/svgs/BgPencilIcon";
import { useDispatch, useSelector } from "react-redux";
import { NoDataFound } from "components/common/NoDataFound";
import { formatTimestamp, formateDate } from "../../../../../utills/moment";
import { formHandler } from "store/global/globalReducer";

const PrebuiltForms = ({ handleForm, handleUpdateForm, togglePreviewForm }) => {
  const { data } = useSelector((state) => state.fetchForms);
  const dispatch = useDispatch();
  const selectForm = (id) => {
    const form = data?.find((form) => form.form_id === id);
    handleForm(form);
  };

  const [searchValue, setSearchValue] = useState("");

  const filteredForms = data?.filter((form) => {
    return (
      form.form_name.toLowerCase().includes(searchValue.toLowerCase()) ||
      form.created_at.toLowerCase().includes(searchValue.toLowerCase())
    );
  });

  const updateFormHandle = (form_id) => {
    // if (loginData?.is_employee) {
    //   if (!allPermissions?.Forms?.write) {
    //     toastHandler(
    //       "You don't have permission to do this action",
    //       ERROR_TYPE_ERROR
    //     );
    //     return;
    //   }
    // }
    const form = data?.find((form) => form?.form_id === form_id);
    if (form) {
      console.log(form, "formm");
      dispatch(formHandler(form));
      handleUpdateForm();
    }
  };

  const viewBusinessForm = (form_id) => {
    const form = data?.find((form) => form?.form_id === form_id);
    if (form) {
      dispatch(formHandler(form));
      togglePreviewForm();
    }
  };

  return (
    <div className="prebuilt-forms">
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
            <div key={index}>
              <div className="prebuilt-form-text mt-3 grid grid-cols-3 ">
                <div className="flex gap-2 items-center">
                  <div>
                    <input
                      onChange={() => selectForm(form.form_id)}
                      type="checkbox"
                    />
                  </div>
                  <div>{form.form_name}</div>
                </div>
                <div className="flex justify-center items-center">
                  {formateDate(form.created_at)}
                </div>
                <div className="flex justify-end gap-1 items-center">
                  <div
                    className="cursor-pointer"
                    onClick={() => viewBusinessForm(form?.form_id)}
                  >
                    <EyeIcon />
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => updateFormHandle(form?.form_id)}
                  >
                    <BgPencilIcon />
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
export default PrebuiltForms;
