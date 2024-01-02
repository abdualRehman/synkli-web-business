import React, { useEffect, useState } from "react";
import { ArrowLeft } from "utills/svgs/ArrowLeft";
import { SideTimes } from "utills/svgs/SideTimes";
import { motion } from "framer-motion";
import { BgDeleteIcon } from "utills/svgs/BgDeleteIcon";
import { generateId } from "utills/uid";
import { TOAST_TYPE_ERROR, TOAST_TYPE_SUCCESS } from "utills/globalVars";
import { toastHandler } from "responseHanlder";
import { useDispatch, useSelector } from "react-redux";
import { formHandler, setLoader } from "store/global/globalReducer";
import { postDynamicFormThunk } from "store/form";
import { useGetForms } from "Hooks/useGetForms";
import { Loader } from "components/common/Loader";
import _ from "lodash";
import { BgAddIcon } from "utills/svgs/BgAddIcon";
import { DragIcon } from "utills/svgs/DragIcon";
import { InfoIcon } from "utills/svgs/InfoIcon";
import { AddHint } from "global-components/AddHint";
import { PrimaryBtn } from "components/atoms/buttons/PrimaryBtn";
import { Text } from "components/atoms/inputs/Text";
import { useDrag, useDrop } from "react-dnd";
// import { driver } from "driver.js";
// import "driver.js/dist/driver.css";
import { Field } from "formik";
import { GenerateField } from "./GenerateField";
import { GenerateStep } from "./GenerateStep";
import { hasAtLeastTwoSameValues } from "utills/dataValidation";
export const AddForm = ({ togglePreviewForm, toggleCreateForm, condition }) => {
  const dispatch = useDispatch();
  const { fetchForms } = useGetForms();
  const [form, setForm] = useState([]);
  const { isLoading } = useSelector((state) => state.global);
  const { data: login } = useSelector((state) => state.login);
  const [showModal, setShowModal] = useState(false);
  const [modalIndex, setModalIndex] = useState(null);
  const [modalStep, setModalStep] = useState(null);

  const [, ref] = useDrop({
    accept: "DIV",
    drop: (droppedItem) => {
      console.log("Dropped field index: " + droppedItem.id);
    },
  });

  const toggleModal = (index, stepIndex) => {
    setShowModal(!showModal);
    setModalStep(stepIndex);
    setModalIndex(index);
  };

  const [steps, setSteps] = useState([
    {
      heading: "",

      fields: [],
    },
  ]);

  const handleFormName = (e) => {
    const newForm = [...form];
    newForm.form_heading = e.target.value;
    setForm(newForm);
  };

  const handleAddStep = () => {
    if (!form?.form_heading?.trim()) {
      return toastHandler("Please add form name", TOAST_TYPE_ERROR);
    } else {
      const newSteps = _.cloneDeep(steps);
      const step = {
        step_heading: "",
        fields: [],
      };

      newSteps.push(step);
      setSteps(newSteps);

      toastHandler("step added", TOAST_TYPE_SUCCESS);
    }
  };

  const handleStepHeading = (e, stepIndex) => {
    const newSteps = _.cloneDeep(steps);
    newSteps[stepIndex].step_heading = e.target.value;
    setSteps(newSteps);
  };

  const handleDeleteStep = (stepIndex) => {
    const newSteps = _.cloneDeep(steps);
    newSteps.splice(stepIndex, 1);
    setSteps(newSteps);
    toastHandler("step deleted", TOAST_TYPE_SUCCESS);
  };

  const handleAddField = (stepIndex) => {
    const newSteps = _.cloneDeep(steps);
    if (!newSteps[stepIndex]?.step_heading?.trim()) {
      return toastHandler("Please add step heading first", TOAST_TYPE_ERROR);
    }

    newSteps[stepIndex]?.fields?.push({
      type: "",
      label: "",
      tag: "",
      default_value: "",
      isLabelValid: false,
      numOptions: 0,
      options: [],
      hint: "",
      field_row_id: generateId(),
      required: false,
      position: 1,
      placeholder: "",
    });
    setSteps(newSteps);
  };

  const handleFieldTypeChange = (e, stepIndex, fieldIndex) => {
    const newSteps = _.cloneDeep(steps);
    console.log(stepIndex, fieldIndex, "fields");
    newSteps[stepIndex].fields[fieldIndex].type = e.target.value;
    setSteps(newSteps);
  };

  const handleDeleteField = (stepIndex, fieldIndex) => {
    const newSteps = _.cloneDeep(steps);
    newSteps[stepIndex].fields.splice(fieldIndex, 1);
    setSteps(newSteps);
  };

  const handlePlaceholder = (e, stepIndex, fieldIndex) => {
    const newSteps = _.cloneDeep(steps);
    newSteps[stepIndex].fields[fieldIndex].placeholder = e.target.value;
    setSteps(newSteps);
  };

  const handleHint = (e, stepIndex, fieldIndex) => {
    const newSteps = _.cloneDeep(steps);
    newSteps[stepIndex].fields[fieldIndex].hint = e;
    setSteps(newSteps);
  };
  const handleTag = (e, stepIndex, fieldIndex) => {
    const newSteps = _.cloneDeep(steps);
    newSteps[stepIndex].fields[fieldIndex].tag = e.target.value;
    setSteps(newSteps);
  };

  const handleLabel = (e, stepIndex, fieldIndex) => {
    const newSteps = _.cloneDeep(steps);
    newSteps[stepIndex].fields[fieldIndex].label = e.target.value;
    setSteps(newSteps);
  };

  const hanleRequired = (e, stepIndex, fieldIndex) => {
    const newSteps = _.cloneDeep(steps);
    newSteps[stepIndex].fields[fieldIndex].required = e.target.checked
      ? true
      : false;
    setSteps(newSteps);
  };

  const addOption = (stepIndex, fieldIndex) => {
    const newSteps = _.cloneDeep(steps);
    newSteps[stepIndex].fields[fieldIndex].options.push("");
    setSteps(newSteps);
  };

  const handleOption = (e, stepIndex, fieldIndex, optionIndex) => {
    const newSteps = _.cloneDeep(steps);

    newSteps[stepIndex].fields[fieldIndex].options[optionIndex] =
      e.target.value;
    setSteps(newSteps);
  };

  const deleteOption = (stepIndex, fieldIndex, optionIndex) => {
    const newSteps = _.cloneDeep(steps);
    newSteps[stepIndex].fields[fieldIndex].options.splice(optionIndex, 1);
    setSteps(newSteps);
  };

  const handleSwitchOptionOne = (e, stepIndex, fieldIndex) => {
    const newSteps = _.cloneDeep(steps);
    newSteps[stepIndex].fields[fieldIndex].options[0] = e.target.value;
    setSteps(newSteps);
  };

  const handleSwitchOptionTwo = (e, stepIndex, fieldIndex) => {
    const newSteps = _.cloneDeep(steps);
    newSteps[stepIndex].fields[fieldIndex].options[1] = e.target.value;
    setSteps(newSteps);
  };

  const handleClearStep = (stepIndex) => {
    const newSteps = _.cloneDeep(steps);
    newSteps[stepIndex].step_heading = "";
    newSteps[stepIndex].fields.forEach((field) => {
      field.placeholder = "";
      field.label = "";
    });
    setSteps(newSteps);
  };

  const handleSubmit = (type) => {
    const newSteps = _.cloneDeep(steps);
    if (!form?.form_heading) {
      toastHandler("Form name is required", "error");
      return;
    }
    if (newSteps.length < 1) {
      toastHandler("Atleast one step is required", TOAST_TYPE_ERROR);
      return;
    }
    if (type !== "draft") {
      let hasEmptyValue = false;

      newSteps.map((step, index) => {
        if (!step?.step_heading?.trim()) {
          hasEmptyValue = true;

          toastHandler(
            `Step ${index + 1} heading is required`,
            TOAST_TYPE_ERROR
          );
          return;
        }

        if (step?.fields?.length < 1) {
          hasEmptyValue = true;
          toastHandler(
            "Each step must have atleast one field",
            TOAST_TYPE_ERROR
          );
          return;
        } else {
          step.fields.map((field, fieldIndex) => {
            if (field?.type === "switch") {
              if (field?.options.length < 1) {
                hasEmptyValue = true;
                toastHandler(
                  "Switch button must have 2 options",
                  TOAST_TYPE_ERROR
                );
                return;
              }
            }

            if (
              field.type === "dropdown" ||
              field.type === "radio" ||
              field.type === "checkbox" ||
              field.type === "switch"
            ) {
              if (field?.options?.length < 1) {
                hasEmptyValue = true;
                toastHandler("Options are required", TOAST_TYPE_ERROR);
                return;
              }
              if (hasAtLeastTwoSameValues(field?.options)) {
                hasEmptyValue = true;
                toastHandler(
                  `Two options can't be same at step ${index + 1} field ${
                    fieldIndex + 1
                  }`,
                  TOAST_TYPE_ERROR
                );
                return;
              }

              field.options.map((op) => {
                if (!op.trim()) {
                  toastHandler("options can't be empty", TOAST_TYPE_ERROR);
                  hasEmptyValue = true;
                  return;
                }
              });
            }
            if (
              field.type === "dropdown" ||
              field.type === "radio" ||
              field.type === "checkbox" ||
              field.type === "file" ||
              field.type === "switch" ||
              field.type === "signature"
            ) {
              if (!field?.label?.trim()) {
                toastHandler("label can't be empty", TOAST_TYPE_ERROR);
                hasEmptyValue = true;
                return;
              }
            } else {
              if (!field?.label?.trim() || !field.placeholder.trim()) {
                hasEmptyValue = true;
                toastHandler(
                  "label or placeholder can't be empty",
                  TOAST_TYPE_ERROR
                );
                return;
              }
            }
          });
        }
      });

      if (hasEmptyValue) {
        return;
      }
    }
    newSteps.map((step, index) => {
      step.step = index.toString();

      step.fields.forEach((field, fieldIndex) => {
        const fieldPosition = fieldIndex + 1;
        field.tag = "tag";
        field.default_value =
          field.type === "switch" || field.type === "radio"
            ? field.options[0]
            : field?.type === "checkbox"
            ? []
            : "";

        field.position = fieldPosition.toString();
      });
    });

    const formData = {
      service_id: "",
      form_name: form?.form_heading,
      form_status: type,
      steps: newSteps,
    };

    // Display form data
    console.log(formData);
    dispatch(setLoader(true));
    dispatch(postDynamicFormThunk(formData))
      .then((response) => {
        console.log(response);
        if (response.payload) {
          fetchForms(condition);
          toggleCreateForm();
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
    // NotificationManager.success("Form saved you can Preview now");
  };

  const handlePreview = () => {
    const newSteps = _.cloneDeep(steps);
    if (newSteps.length < 1) {
      return;
    }
    newSteps.map((step, index) => {
      step.step = index.toString();

      step.fields.forEach((field) => {
        field.default_value =
          field.type === "switch" || field.type === "radio"
            ? field.options[0]
            : "";

        field.step = newSteps.indexOf(step).toString();
      });
    });

    const formData = {
      service_id: "",
      form_name: form?.form_heading,
      form_status: "",
      steps: newSteps,
    };

    // viewBusinessForm();
    if (formData.form_name === "") {
      return toastHandler("Please fill in all fields", TOAST_TYPE_ERROR);
    }

    dispatch(formHandler(formData));
    togglePreviewForm();
  };

  // useEffect(() => {
  //   if (login.second_time_login) {
  //     const driverObj = driver({
  //       showProgress: true,
  //       steps: [
  //         {
  //           element: ".preview-indicate",

  //           popover: {
  //             title: "Preview Form",
  //             description:
  //               "By clicking this button you can preview form while creating",
  //             popoverClass: "my-custom-popover-class ",
  //           },
  //         },
  //         {
  //           element: ".heading-indicate",

  //           popover: {
  //             title: "Form Heading",
  //             description: "Add form name here",
  //             popoverClass: "my-custom-popover-class ",
  //           },
  //         },
  //         {
  //           element: ".add-step-indicate",

  //           popover: {
  //             title: "Add Step ",
  //             description:
  //               "You can add multiple steps in one form. Click on this button to add a step",
  //             popoverClass: "my-custom-popover-class ",
  //           },
  //         },
  //       ],
  //     });

  //     driverObj.drive();
  //   }
  // }, [login]); // Empty dependency array to run the effect only once

  return (
    <div className="add-p-side grid grid-cols-5 ">
      <div className="col-span-1 left-side"></div>
      <div className="right-side md:col-span-4 col-span-5">
        <motion.div
          initial={{ x: 700 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2, type: "tween", duration: 0.4 }}
          className="inner-right relative"
        >
          <div>
            {isLoading && <Loader />}
            <div>
              <div
                onClick={toggleCreateForm}
                className="absolute z-50 text-white p-2 right-1 top-1 cursor-pointer"
              >
                <SideTimes />
              </div>
              <div className="add-detail pt-5 px-5 relative">
                <div className="flex absolute right-5 gap-2 top-10 ">
                  <div onClick={handlePreview} className="">
                    <button className="  preview-indicate  form-preview-btn gap-2 cursor-pointer flex items-center px-2 py-2">
                      {" "}
                      <div>
                        <svg
                          width="15"
                          height="11"
                          viewBox="0 0 22 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.001 3.96045C12.201 3.96045 13.3519 4.43664 14.2004 5.28426C15.049 6.13189 15.5257 7.28151 15.5257 8.48023C15.5257 9.67895 15.049 10.8286 14.2004 11.6762C13.3519 12.5238 12.201 13 11.001 13C9.80096 13 8.65009 12.5238 7.80154 11.6762C6.953 10.8286 6.47629 9.67895 6.47629 8.48023C6.47629 7.28151 6.953 6.13189 7.80154 5.28426C8.65009 4.43664 9.80096 3.96045 11.001 3.96045ZM11.001 8.87358e-09C16.2191 8.87358e-09 20.7246 3.55932 21.9745 8.54689C22.0293 8.76491 21.9951 8.99572 21.8794 9.18856C21.7638 9.38139 21.5763 9.52045 21.358 9.57514C21.1398 9.62983 20.9087 9.59568 20.7156 9.48019C20.5226 9.3647 20.3834 9.17734 20.3286 8.95932C19.8049 6.88415 18.6027 5.043 16.9125 3.72783C15.2224 2.41266 13.1411 1.69873 10.9987 1.69925C8.85622 1.69977 6.77527 2.41471 5.08577 3.7307C3.39627 5.04669 2.19491 6.88841 1.6722 8.96384C1.64523 9.07187 1.59724 9.17353 1.53094 9.26303C1.46465 9.35252 1.38136 9.4281 1.28583 9.48544C1.19029 9.54278 1.08439 9.58077 0.974159 9.59722C0.863931 9.61368 0.751536 9.60829 0.643393 9.58136C0.535251 9.55442 0.433477 9.50648 0.343884 9.44026C0.254291 9.37404 0.178632 9.29084 0.121229 9.19541C0.0638246 9.09998 0.0257994 8.99419 0.00932408 8.88408C-0.00715127 8.77397 -0.00175433 8.6617 0.0252071 8.55367C0.63866 6.10993 2.05188 3.94098 4.04042 2.39126C6.02897 0.84154 8.47884 -9.97857e-05 11.001 8.87358e-09Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                      <div>Preview</div>
                    </button>
                  </div>
                </div>
                <div className="title flex gap-2 items-center">
                  <div onClick={toggleCreateForm} className="cursor-pointer">
                    <svg
                      width="10"
                      height="15"
                      viewBox="0 0 14 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M13.5371 24.5341C12.9199 25.1553 11.9191 25.1553 11.3019 24.5341L0.46292 13.6248C-0.154309 13.0036 -0.154309 11.9964 0.46292 11.3752L11.3019 0.465923C11.9191 -0.155308 12.9199 -0.155308 13.5371 0.465923C14.1543 1.08715 14.1543 2.09437 13.5371 2.7156L3.81569 12.5L13.5371 22.2844C14.1543 22.9056 14.1543 23.9128 13.5371 24.5341Z"
                        fill="#666666"
                      />
                    </svg>
                  </div>
                  <div>Create Forms</div>
                </div>

                <div className="add-form-route mt-2">
                  Forms &gt; Added Forms &gt; Create Form
                </div>
              </div>
            </div>
            <div className="add-detail pt-5 px-5">
              <div className="add-ann-form my-3 ">
                {" "}
                <div>
                  <div className="grid grid-cols-2 gap-3 place-content-center ">
                    <div>
                      <div>
                        <label>Form Heading</label>
                      </div>
                      <div className="grid grid-cols-12">
                        {" "}
                        <div className="col-span-12 ">
                          {/* <input
                            onChange={handleFormName}
                            value={form?.form_heading}
                            maxLength={30}
                            type="text"
                            name=""
                            id=""
                            placeholder="Form heading"
                            className="mt-1"
                          /> */}
                          <div className="heading-indicate">
                            {" "}
                            <Text
                              atChange={handleFormName}
                              value={form?.form_heading}
                              length={30}
                              name=""
                              placeholder={"Form heading"}
                              isRequired={true}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      {" "}
                      <div className="invisible">
                        <label>Form Heading</label>
                      </div>
                      <div>
                        <PrimaryBtn
                          atClick={handleAddStep}
                          type="ann-btn"
                          px={"px-3 mt-1 add-step-indicate"}
                          text={"+ Add Step"}
                          isDisabled={false}
                        />
                      </div>
                      {/* <button
                        onClick={handleAddStep}
                        className="ann-btn px-3 mt-1 rounded-md "
                      >
                        + Add Step
                      </button>{" "} */}
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  {" "}
                  <hr />
                </div>
                {steps?.map((step, stepIndex) => (
                  <div>
                    <GenerateStep
                      steps={steps}
                      setSteps={setSteps}
                      step={step}
                      stepIndex={stepIndex}
                      handleStepHeading={handleStepHeading}
                      handleDeleteStep={handleDeleteStep}
                      handleAddField={handleAddField}
                      handleClearStep={handleClearStep}
                      showModal={showModal}
                      modalIndex={modalIndex}
                      toggleModal={toggleModal}
                      handleFieldTypeChange={handleFieldTypeChange}
                      handleLabel={handleLabel}
                      addOption={addOption}
                      handlePlaceholder={handlePlaceholder}
                      handleSwitchOptionOne={handleSwitchOptionOne}
                      handleSwitchOptionTwo={handleSwitchOptionTwo}
                      handleDeleteField={handleDeleteField}
                      handleOption={handleOption}
                      deleteOption={deleteOption}
                      handleHint={handleHint}
                      hanleRequired={hanleRequired}
                      handleSubmit={handleSubmit}
                      modalStep={modalStep}
                    />
                  </div>
                  // <div ref={ref}>
                  //   <div className="flex justify-between items-center">
                  //     <div className="step-heading">Step {stepIndex + 1}</div>{" "}
                  //     <div>
                  //       <div className="flex items-center gap-2">
                  //         <div
                  //           className="cursor-pointer"
                  //           onClick={() => handleDeleteStep(stepIndex)}
                  //         >
                  //           <BgDeleteIcon />
                  //         </div>
                  //         <div>
                  //           <DragIcon />
                  //         </div>
                  //       </div>
                  //     </div>
                  //   </div>
                  //   <div className="grid grid-cols-2 gap-5 ">
                  //     <div>
                  //       <div>
                  //         <label>Step Heading</label>
                  //       </div>
                  //       <div>
                  //         {" "}
                  //         <input
                  //           onChange={(e) => handleStepHeading(e, stepIndex)}
                  //           value={step.step_heading}
                  //           type="text"
                  //           maxLength={30}
                  //           name=""
                  //           id=""
                  //           placeholder="Step heading"
                  //         />{" "}
                  //       </div>
                  //     </div>
                  //     <div>
                  //       {" "}
                  //       <div className="invisible">
                  //         <label>Form Heading</label>
                  //       </div>
                  //       <div className="flex justify-end mt-1 items-center gap-2">
                  //         <div>
                  //           {" "}
                  //           <button onClick={() => handleAddField(stepIndex)}>
                  //             <BgAddIcon />
                  //           </button>{" "}
                  //         </div>
                  //       </div>
                  //     </div>
                  //   </div>

                  //   {step.fields.map((field, fieldIndex) => (
                  //     <div>
                  //       {" "}
                  //       <div className="form-input-container relative">
                  //         {/* <GenerateField
                  //           field={field}
                  //           fieldIndex={fieldIndex}
                  //         /> */}
                  //         {showModal && modalIndex === fieldIndex ? (
                  //           <AddHint toggleModal={toggleModal} />
                  //         ) : (
                  //           ""
                  //         )}
                  //         <div className="form-child">
                  //           <label>Select Type</label>
                  //           <div className="mt-1">
                  //             <select
                  //               value={field.type}
                  //               onChange={(e) =>
                  //                 handleFieldTypeChange(
                  //                   e,
                  //                   stepIndex,
                  //                   fieldIndex
                  //                 )
                  //               }
                  //               required
                  //               className="font-poppins"
                  //             >
                  //               <option value="">Select Field Type</option>
                  //               <option value="text">Text</option>
                  //               <option value="number">Number</option>

                  //               <option value="checkbox">Checkbox</option>
                  //               <option value="switch">Switch Button</option>

                  //               <option value="radio">Radio</option>
                  //               <option value="dropdown">Selection</option>
                  //               <option value="date">Date</option>
                  //               <option value="email">Email</option>

                  //               <option value="signature">Signature</option>
                  //               <option value="file">File</option>
                  //             </select>
                  //           </div>
                  //         </div>
                  //         <div className="form-child ">
                  //           {field.type === "text" ||
                  //           field.type === "number" ||
                  //           field.type === "date" ||
                  //           field.type === "email" ||
                  //           field.type === "tel" ? (
                  //             <div>
                  //               {" "}
                  //               <div>
                  //                 {" "}
                  //                 <label>Label:</label>
                  //                 <input
                  //                   type="text"
                  //                   maxLength={30}
                  //                   placeholder="label"
                  //                   value={field.label}
                  //                   onChange={(e) =>
                  //                     handleLabel(e, stepIndex, fieldIndex)
                  //                   }
                  //                 />
                  //               </div>
                  //             </div>
                  //           ) : (
                  //             ""
                  //           )}

                  //           {field.type === "file" ||
                  //           field.type === "signature" ? (
                  //             <div>
                  //               {" "}
                  //               <div>
                  //                 {" "}
                  //                 <label>Label:</label>
                  //                 <input
                  //                   type="text"
                  //                   maxLength={30}
                  //                   placeholder="label"
                  //                   value={field.label}
                  //                   onChange={(e) =>
                  //                     handleLabel(e, stepIndex, fieldIndex)
                  //                   }
                  //                 />
                  //               </div>
                  //             </div>
                  //           ) : (
                  //             ""
                  //           )}

                  //           {field.type === "checkbox" ||
                  //           field.type === "radio" ||
                  //           field.type === "dropdown" ? (
                  //             <div>
                  //               {" "}
                  //               <div>
                  //                 {" "}
                  //                 <label>Label:</label>
                  //                 <input
                  //                   type="text"
                  //                   maxLength={30}
                  //                   placeholder="label"
                  //                   value={field.label}
                  //                   onChange={(e) =>
                  //                     handleLabel(e, stepIndex, fieldIndex)
                  //                   }
                  //                 />
                  //               </div>
                  //               <div>
                  //                 {/* <div>
                  //                 <button
                  //                   onClick={() =>
                  //                     addOption(stepIndex, fieldIndex)
                  //                   }
                  //                   className="ann-btn mt-2 px-2 rounded-md"
                  //                 >
                  //                   Add Option
                  //                 </button>
                  //               </div> */}
                  //               </div>
                  //             </div>
                  //           ) : (
                  //             ""
                  //           )}

                  //           {field.type === "switch" ? (
                  //             <div>
                  //               <div>
                  //                 {" "}
                  //                 <label>Label:</label>
                  //                 <input
                  //                   type="text"
                  //                   maxLength={30}
                  //                   placeholder="label"
                  //                   value={field.label}
                  //                   onChange={(e) =>
                  //                     handleLabel(e, stepIndex, fieldIndex)
                  //                   }
                  //                 />
                  //               </div>
                  //             </div>
                  //           ) : (
                  //             ""
                  //           )}
                  //         </div>
                  //         <div className="form-child">
                  //           {field.type === "checkbox" ||
                  //           field.type === "radio" ||
                  //           field.type === "dropdown" ? (
                  //             <div>
                  //               <div className="invisible">fd</div>{" "}
                  //               <div
                  //                 onClick={() =>
                  //                   addOption(stepIndex, fieldIndex)
                  //                 }
                  //                 className="flex justify-end items-center cursor-pointer mt-3"
                  //               >
                  //                 <BgAddIcon />
                  //               </div>
                  //             </div>
                  //           ) : (
                  //             ""
                  //           )}

                  //           {field.type === "text" ||
                  //           field.type === "number" ||
                  //           field.type === "date" ||
                  //           field.type === "email" ||
                  //           field.type === "tel" ? (
                  //             <div>
                  //               {" "}
                  //               <label>Placeholder:</label>
                  //               <input
                  //                 type="text"
                  //                 maxLength={30}
                  //                 placeholder="Placeholder"
                  //                 value={field.placeholder}
                  //                 onChange={(e) =>
                  //                   handlePlaceholder(e, stepIndex, fieldIndex)
                  //                 }
                  //               />
                  //             </div>
                  //           ) : (
                  //             ""
                  //           )}
                  //           {field?.type === "switch" && (
                  //             <div>
                  //               {" "}
                  //               <div className="invisible">switch</div>
                  //               <div className="grid grid-cols-2 gap-3 relative">
                  //                 <div className="flex items-center gap-2">
                  //                   {" "}
                  //                   <input
                  //                     type="text"
                  //                     maxLength={30}
                  //                     placeholder="option one"
                  //                     value={field.options[0]}
                  //                     onChange={(e) =>
                  //                       handleSwitchOptionOne(
                  //                         e,
                  //                         stepIndex,
                  //                         fieldIndex
                  //                       )
                  //                     }
                  //                   />{" "}
                  //                 </div>

                  //                 <div className="flex items-center gap-2">
                  //                   {" "}
                  //                   <input
                  //                     value={field.options[1]}
                  //                     onChange={(e) =>
                  //                       handleSwitchOptionTwo(
                  //                         e,
                  //                         stepIndex,
                  //                         fieldIndex
                  //                       )
                  //                     }
                  //                     type="text"
                  //                     placeholder="option two"
                  //                   />{" "}
                  //                 </div>
                  //               </div>
                  //             </div>
                  //           )}
                  //         </div>
                  //         <div className="form-child   ">
                  //           <div className="invisible ">t</div>

                  //           <div className="flex gap-2 md:mt-3 justify-end md:justify-center items-center">
                  //             {" "}
                  //             <button
                  //               className="cursor-pointer"
                  //               onClick={() => toggleModal(fieldIndex)}
                  //             >
                  //               <InfoIcon />
                  //             </button>{" "}
                  //             <button
                  //               onClick={() =>
                  //                 handleDeleteField(stepIndex, fieldIndex)
                  //               }
                  //             >
                  //               <BgDeleteIcon />
                  //             </button>{" "}
                  //             <button className="cursor-grab">
                  //               <DragIcon />
                  //             </button>{" "}
                  //           </div>
                  //         </div>
                  //       </div>
                  //       {field.type === "checkbox" ||
                  //       field.type === "radio" ||
                  //       field.type === "dropdown" ? (
                  //         <div>
                  //           {field?.options?.length > 0 && (
                  //             <div>
                  //               {" "}
                  //               <label>options</label>
                  //             </div>
                  //           )}
                  //           <div className="grid grid-cols-3 md:grid-cols-4 gap-3 my-1">
                  //             {field.options.map((option, optionIndex) => (
                  //               <div className="flex items-center gap-2">
                  //                 {" "}
                  //                 <input
                  //                   maxLength={30}
                  //                   onChange={(e) =>
                  //                     handleOption(
                  //                       e,
                  //                       stepIndex,
                  //                       fieldIndex,
                  //                       optionIndex
                  //                     )
                  //                   }
                  //                   type="text"
                  //                   placeholder="option"
                  //                   value={option}
                  //                 />{" "}
                  //                 <div
                  //                   className="cursor-pointer"
                  //                   onClick={() =>
                  //                     deleteOption(
                  //                       stepIndex,
                  //                       fieldIndex,
                  //                       optionIndex
                  //                     )
                  //                   }
                  //                 >
                  //                   <SideTimes />
                  //                 </div>{" "}
                  //               </div>
                  //             ))}
                  //           </div>
                  //         </div>
                  //       ) : (
                  //         ""
                  //       )}
                  //     </div>
                  //   ))}

                  //   <div></div>
                  //   <div className="flex justify-end items- mt-3 gap-3">
                  //     <button className="save-step-btn rounded-md">Save</button>
                  //     <button
                  //       onClick={() => handleClearStep(stepIndex)}
                  //       className="clear-step-btn rounded-md"
                  //     >
                  //       Clear
                  //     </button>
                  //   </div>
                  //   <hr />
                  // </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 mt-4 mb-5 justify-center flex-wrap">
              {/* <button
                className="form-save-button"
                onClick={() => handleSubmit("prebuilt")}
              >
                Save as Prebuilt
              </button> */}
              <button
                className="form-save-button"
                onClick={() => handleSubmit("live")}
              >
                Save as Live
              </button>
              <button
                onClick={() => handleSubmit("draft")}
                type="button"
                className="form-save-draft-button"
              >
                Save as Draft
              </button>
              <button className="form-cancel-button" onClick={toggleCreateForm}>
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
