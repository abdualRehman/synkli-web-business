import React from "react";
import { motion } from "framer-motion";
import { SideTimes } from "utills/svgs/SideTimes";
import SignatureCanvas from "react-signature-canvas";
import { useDispatch, useSelector } from "react-redux";
import { generateId } from "utills/uid";
import { ImageIcon } from "utills/svgs/ImageIcon";
import { useRef } from "react";
import _ from "lodash";
import { useState } from "react";
import { LinkIcon } from "utills/svgs/LinkIcon";
import { BgTimes } from "utills/svgs/BgTimes";
import { useEffect } from "react";
import { BUSINESS_ID, TOAST_TYPE_SUCCESS, USER_TYPE } from "utills/globalVars";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Cookies from "js-cookie";
import { datePickerFormate, formateDateTime } from "utills/moment";
import { deleteFormFileThunk, updateCustomerFormThunk } from "store/form";
import { useGetFormSubmissions } from "Hooks/useGetFormSubmissions";
import { formHandler } from "store/global/globalReducer";
import { SmallLoader } from "components/common/SmallLoader";
import moment from "moment";
import DatePickerComponent from "global-components/DatePicker";
import { ZoomImage } from "global-components/ImageZoom/ImageZoomer";
import { toastHandler } from "responseHanlder";
import { SmallLoaderWhite } from "components/common/SmallLoaderWhite";
export const EditCustomerForm = ({ toggleEditForm, id }) => {
  const { data: formsData } = useSelector(
    (state) => state.fetchSubmissionFormData
  );

  const { formSubmissionsId } = useSelector((state) => state.global);
  const customerFormDataPayload = {
    form_id: formSubmissionsId,
    business_client_id: id,
  };
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { fetchSubmissions } = useGetFormSubmissions();
  const [addLoader, setAddLoader] = useState(false);
  const [updateLoader, setUpdateLoader] = useState(false);
  const signatureRef = useRef();
  const { data: customer } = useSelector(
    (state) => state.viewBusinessCustomerInfo
  );
  const dispatch = useDispatch();

  const business_id = localStorage.getItem(BUSINESS_ID);

  const { editForm: form } = useSelector((state) => state.global);
  const [customerForm, setCustomerForm] = useState([]);
  console.log(form, "form");

  const changeHandler = (e, stepIndex, fieldIndex) => {
    console.log(e, stepIndex, fieldIndex);
    const newArr = _.cloneDeep(customerForm);
    newArr.steps[stepIndex].fields[fieldIndex].default_value = e.target.value;
    setCustomerForm(newArr);
  };

  const handleDateChange = (date, stepIndex, fieldIndex) => {
    const forematedDate = moment(date).format("DD-MM-YYYY");
    console.log(forematedDate, "0909");
    const newArr = _.cloneDeep(customerForm);
    newArr.steps[stepIndex].fields[fieldIndex].default_value = forematedDate;
    setCustomerForm(newArr);
  };
  useEffect(() => {
    setCustomerForm(_.cloneDeep(form));
    console.log(form, "formto");
  }, []);

  const handleRemoveFile = (
    stepIndex,
    index,
    valIndex,
    field_file_id,
    customer_form_data_field_id
  ) => {
    const newForm = _.cloneDeep(customerForm);
    const payload = {
      customer_form_data_id: form?.customer_form_data_id,
      field_file_id,
      customer_form_data_field_id,
    };
    dispatch(deleteFormFileThunk(payload))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          newForm.steps[stepIndex].fields[index].default_value?.splice(
            valIndex,
            1
          );
          setCustomerForm(newForm);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddFile = (
    e,
    stepIndex,
    fieldIndex,
    form_field_id,
    customer_form_data_id
  ) => {
    const files = e.target.files;
    const newForm = _.cloneDeep(customerForm);

    console.log(form_field_id, "field");

    const formData = new FormData();
    formData.append("customer_id", customer?.customer_id);
    formData.append("form_id", form?.form_id);
    formData.append("status", newForm?.status ?? "complete");
    formData.append("data", JSON.stringify(newForm.steps));
    formData.append("uploaded_by", USER_TYPE);
    formData.append("business_id", business_id);
    formData.append("service_id", "");
    formData.append("customer_form_data_id", customer_form_data_id);
    if (files) {
      for (let i = 0; i <= files?.length; i++) {
        formData.append(`data.images['${form_field_id}']`, files[i]);
      }
    }

    setAddLoader(true);
    dispatch(updateCustomerFormThunk(formData))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          setCustomerForm(response.payload);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setAddLoader(false);
      });
  };

  const handleRadioCheck = (e, stepIndex, fieldIndex, op) => {
    const newForm = _.cloneDeep(customerForm);
    console.log(
      op,
      newForm.steps[stepIndex].fields[fieldIndex].default_value,
      "op"
    );

    newForm.steps[stepIndex].fields[fieldIndex].default_value = op;
    setCustomerForm(newForm);
  };

  const handleSwitch = (stepIndex, fieldIndex, val) => {
    const newForm = _.cloneDeep(customerForm);
    newForm.steps[stepIndex].fields[fieldIndex].default_value = val;
    setCustomerForm(newForm);
  };

  const handleDropDown = (e, stepindex, index) => {
    const newForm = _.cloneDeep(customerForm);
    newForm.steps[stepindex].fields[index].default_value = e.target.value;
    setCustomerForm(newForm);
  };

  const handleSubmit = () => {
    const newForm = _.cloneDeep(customerForm);
    const formData = new FormData();
    formData.append("customer_id", customer?.customer_id);
    formData.append("form_id", form?.form_id);
    formData.append("status", newForm?.status ?? "complete");
    formData.append("data", JSON.stringify(newForm.steps));
    formData.append("uploaded_by", USER_TYPE);
    formData.append("business_id", business_id);
    formData.append("service_id", "");
    formData.append("customer_form_data_id", newForm?.customer_form_data_id);
    setUpdateLoader(true);
    dispatch(updateCustomerFormThunk(formData))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          toggleEditForm();
          fetchSubmissions(customerFormDataPayload);
          toastHandler("Form updated successfully", TOAST_TYPE_SUCCESS);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setUpdateLoader(false);
      });
  };

  const handleCheckBox = (e, stepindex, fieldIndex, op) => {
    console.log(op, e.target.checked, "check");
    const newForm = _.cloneDeep(customerForm);
    if (e.target.checked) {
      newForm.steps[stepindex].fields[fieldIndex].default_value = op;
    }

    setCustomerForm(newForm);
  };

  return (
    <div className="add-p-side grid grid-cols-10 ">
      <div className="col-span-2 left-side"></div>
      <div className="right-side col-span-8">
        <motion.div
          initial={{ x: 700 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2, type: "tween", duration: 0.4 }}
          className="inner-right relative"
        >
          <div>
            <div
              onClick={toggleEditForm}
              className="absolute   text-white p-2 right-1 top-1 cursor-pointer"
            >
              <SideTimes />
            </div>

            <div className="add-detail pt-5 px-5">
              <div className="title">{form?.form_name}</div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 grid-cols-1 gap-5 mx-5">
            {customerForm &&
              customerForm?.steps?.map((step, stepindex) => (
                <div key={stepindex} className="border my-5 p-3">
                  <div className="step-heading my-2">{step?.step_heading}</div>
                  <div className="add-ann-form">
                    {step?.fields?.map((field, index) => (
                      <div key={index}>
                        {field.type === "text" && (
                          <div>
                            <label>{field.label}</label>
                            <input
                              type={field.type}
                              placeholder={field?.example}
                              value={field?.default_value}
                              onChange={(e) =>
                                changeHandler(e, stepindex, index)
                              }
                            />
                          </div>
                        )}

                        {field.type === "number" && (
                          <div>
                            <label>{field.label}</label>
                            <input
                              type={field.type}
                              placeholder={field?.example}
                              value={field?.default_value}
                              onChange={(e) =>
                                changeHandler(e, stepindex, index)
                              }
                            />
                          </div>
                        )}

                        {field.type === "signature" && (
                          <div className="add-ann-form p-2 mt-2">
                            <label>{field?.label}</label>

                            <div className="signature-pad p-2 overflow-hidden cursor-pointer shadow-lg mt-2">
                              {" "}
                              <img src={field?.default_value} alt="signature" />
                              {/* <SignatureCanvas
                                ref={signatureRef}
                                penColor="black"
                                canvasProps={{ width: 100, height: 100 }}
                              />{" "} */}
                            </div>
                            {/* 
                            <div className="flex justify-between items-center mt-5">
                              <button
                                onClick={clearSignature}
                                className="cancel-btn signature-clear px-2 py-2 rounded-md"
                              >
                                Clear Signature
                              </button>
                              <button
                                onClick={getSignature}
                                className="signature-btn px-2 py-2 rounded-md"
                              >
                                Add Signature
                              </button>
                            </div> */}
                          </div>
                        )}

                        {field.type === "file" && (
                          <div className="add-ann-form mt-2">
                            <label>{field?.label}</label>
                            <input
                              id="file-input"
                              type="file"
                              onChange={(e) =>
                                handleAddFile(
                                  e,
                                  stepindex,
                                  index,
                                  field?.form_field_id,
                                  field?.customer_form_data_id
                                )
                              }
                              style={{ display: "none" }}
                            />
                            <div>
                              <div>
                                <div className=" add-ann-img-form mt-2 ">
                                  <label
                                    htmlFor="file-input"
                                    className="upload-app-label"
                                  >
                                    <div className="add-app-camera flex justify-center">
                                      <ImageIcon />
                                    </div>
                                    <div className="add-app-camera-text mt-2">
                                      Click to upload app image
                                    </div>
                                  </label>
                                </div>
                                <div className="flex gap-2 items-center flex-wrap">
                                  {field?.default_value?.map((op, opIndex) => (
                                    <div className="my-3 thumbnail-wrapper relative ">
                                      <div
                                        onClick={() =>
                                          handleRemoveFile(
                                            stepindex,
                                            index,
                                            opIndex,
                                            field.options[opIndex]
                                              .field_file_id,
                                            field?.customer_form_data_field_id
                                          )
                                        }
                                        className="absolute top-1 right-1 cursor-pointer"
                                      >
                                        {" "}
                                        <BgTimes />{" "}
                                      </div>
                                      <div>
                                        <img
                                          src={op?.url}
                                          alt="alt"
                                          className="thumbnail-image cursor-pointer"
                                          onClick={() => {
                                            setShowModal(true);
                                          }}
                                        />
                                        {showModal && (
                                          <ZoomImage
                                            src={op?.url}
                                            alt="snow"
                                            onClose={() => setShowModal(false)}
                                          />
                                        )}
                                      </div>
                                      <div className="add-ann-form text-white flex justify-center items-center">
                                        {" "}
                                        <label>
                                          {op?.originalname?.slice(-8)}
                                        </label>{" "}
                                      </div>
                                    </div>
                                    // <button className="flex items-center gap-1 selected-file">
                                    //   <LinkIcon />
                                    //   <a href="">
                                    //     {op?.originalname?.slice(-15)}
                                    //   </a>
                                    //   {/* <span className="cursor-pointer">
                                    //     <BgTimes />
                                    //   </span>{" "} */}
                                    // </button>
                                  ))}
                                </div>
                                {/* <div className="flex gap-2 items-center flex-wrap">
                                  {" "}
                                  {field?.default_value &&
                                    field?.default_value?.map(
                                      (val, valIndex) => (
                                        <a
                                          href={val?.url}
                                          className="flex items-center gap-1 selected-file"
                                        >
                                          <LinkIcon />
                                          <span>
                                            {val.originalname.slice(-10)}
                                          </span>
                                          <span
                                            onClick={() =>
                                              handleRemoveFile(
                                                stepindex,
                                                index,
                                                valIndex,
                                                val.field_file_id,
                                                field?.customer_form_data_field_id
                                              )
                                            }
                                            className="cursor-pointer"
                                          >
                                            <BgTimes />
                                          </span>{" "}
                                        </a>
                                      )
                                    )}
                                </div> */}
                              </div>
                            </div>
                          </div>
                        )}

                        {field.type === "radio" && (
                          <div className="mt-2 add-ann-form">
                            <div>
                              {" "}
                              <label> {field.label}</label>{" "}
                            </div>
                            {console.log(field, "radiofield")}
                            <label>
                              <div className="flex gap-2 items-center flex-wrap  ">
                                {field?.options?.map((op, opindex) => (
                                  <div
                                    className="flex items-center gap-2 h-5"
                                    key={generateId()}
                                  >
                                    <div className="option-label">{op}</div>
                                    <div>
                                      <input
                                        type="radio"
                                        checked={field.default_value === op}
                                        name={`radio-${index}`}
                                        onChange={(e) =>
                                          handleRadioCheck(
                                            e,
                                            stepindex,
                                            index,
                                            op
                                          )
                                        }
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </label>
                          </div>
                        )}

                        {field.type === "selection" ? (
                          <div className="mt-2 add-ann-form">
                            <div> {field.label}</div>
                            <select className="preview-select mt-1">
                              <option value="">Select</option>
                              {field?.options?.map((option) => (
                                <option value={option}>{option}</option>
                              ))}
                            </select>
                          </div>
                        ) : (
                          ""
                        )}

                        {field.type === "checkbox" && (
                          <div className="mt-2 add-ann-form ">
                            <div>
                              {" "}
                              <label>{field?.label}</label>{" "}
                            </div>
                            <div className="flex gap-2 items-center">
                              {field?.options.map((op, index) => (
                                <div className="flex gap-2 items-center">
                                  {" "}
                                  {console.log(
                                    customerForm.steps[stepindex].fields[index]
                                      .default_value,
                                    op,
                                    "field"
                                  )}{" "}
                                  <div>{op}</div>
                                  <div className="field-checkbx-wrapper mt-1">
                                    <input
                                      type="checkbox"
                                      name=""
                                      id=""
                                      className="field-checkbox"
                                      onChange={(e) =>
                                        handleCheckBox(e, stepindex, index, op)
                                      }
                                      checked={
                                        customerForm.steps[stepindex].fields[
                                          index
                                        ].default_value == op
                                          ? true
                                          : false
                                      }
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {field.type === "switch" && (
                          <div className="mt-2 add-ann-form">
                            <div>
                              {" "}
                              <label> {field.label} </label>{" "}
                            </div>
                            <div className="field-switch-wrapper mt-1">
                              <div
                                onClick={() =>
                                  handleSwitch(
                                    stepindex,
                                    index,
                                    field.options[0]
                                  )
                                }
                                className={`field-switch cursor-pointer ${
                                  field.default_value === field.options[0] &&
                                  "active"
                                } flex justify-center items-center`}
                              >
                                {" "}
                                {field.options[0]}{" "}
                              </div>

                              <div
                                onClick={() =>
                                  handleSwitch(
                                    stepindex,
                                    index,
                                    field.options[1]
                                  )
                                }
                                className={`field-switch cursor-pointer  ${
                                  field.default_value === field.options[1] &&
                                  "active"
                                }  flex justify-center items-center`}
                              >
                                {" "}
                                {field.options[1]}{" "}
                              </div>
                            </div>
                          </div>
                        )}

                        {field?.type === "tel" && (
                          <div className="mt-2 add-ann-form">
                            <div>
                              {" "}
                              <label> {field?.label} </label>{" "}
                            </div>

                            <input
                              type="tel"
                              className="field-input"
                              placeholder={field?.example}
                              value={field?.default_value}
                              onChange={(e) =>
                                changeHandler(e, stepindex, index)
                              }
                            />
                          </div>
                        )}

                        {field?.type === "dropdown" && (
                          <div className="mt-2 add-ann-form">
                            <div>
                              {" "}
                              <label> {field?.label} </label>{" "}
                            </div>
                            <div>
                              <select
                                onChange={(e) =>
                                  handleDropDown(e, stepindex, index)
                                }
                                value={field?.default_value}
                              >
                                {field?.options?.map((op, index) => (
                                  <option
                                    key={op}
                                    value={op}
                                    selected={
                                      field?.default_value === op ? true : false
                                    }
                                  >
                                    {op}
                                  </option>
                                ))}
                              </select>
                            </div>
                            {/* <input
                              type="tel"
                              className="field-input"
                              placeholder={field?.example}
                              value={field?.default_value}
                              onChange={(e) =>
                                changeHandler(e, stepindex, index)
                              }
                            /> */}
                          </div>
                        )}

                        {field?.type === "email" && (
                          <div className="mt-2 add-ann-form">
                            <div>
                              <div>
                                {" "}
                                <label> {field?.label} </label>{" "}
                              </div>
                              <div className=" mt-1">
                                <input
                                  type="email"
                                  className="field-input"
                                  placeholder={field?.example}
                                  value={field?.default_value}
                                  onChange={(e) =>
                                    changeHandler(e, stepindex, index)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        {field?.type === "password" && (
                          <div className="mt-2 add-ann-form">
                            <div>
                              {" "}
                              <label> {field?.label} </label>{" "}
                            </div>
                            <div className="mt-1">
                              <input
                                type="password"
                                className="field-input"
                                placeholder={field?.example}
                                value={field?.default_value}
                                onChange={(e) =>
                                  changeHandler(e, stepindex, index)
                                }
                              />
                            </div>
                          </div>
                        )}
                        {field?.type === "date" && (
                          <div className="mt-2 ">
                            <div>
                              {" "}
                              <label> {field?.label} </label>{" "}
                            </div>
                            <div className=" ">
                              <span>
                                <DatePickerComponent
                                  type="date"
                                  isOpen={isOpen}
                                  sidebarDate={true}
                                  date={datePickerFormate(field?.default_value)}
                                  setVisible={(value) => setIsOpen(value)}
                                  onDateChange={(date) => {
                                    setIsOpen(false);
                                    // handleDateChange(date, stepindex, index);
                                    console.log(date, "newdate");
                                    handleDateChange(date, stepindex, index);
                                  }}
                                />{" "}
                                {/* <DatePicker
                                  placeholderText="select date"
                                  value={datePickerFormate(
                                    field?.default_value
                                  )}
                                  onChange={(date) =>
                                    handleDateChange(date, stepindex, index)
                                  }
                                  dateFormat="dd-MM-yyyy"
                                  className="profile-picker"
                                /> */}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
          <div className="my-5 flex justify-center items-center">
            <button
              disabled={updateLoader ? true : false}
              onClick={handleSubmit}
              className="ann-btn rounded-md px-10 flex gap-2 items-center"
            >
              {" "}
              Save {updateLoader && <SmallLoaderWhite />}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
