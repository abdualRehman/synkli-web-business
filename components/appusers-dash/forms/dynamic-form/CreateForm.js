import { motion } from "framer-motion";
import _ from "lodash";
import "./css/dynamicForm.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { useEffect, useState } from "react";
import { SideTimes } from "utills/svgs/SideTimes";
import { BgDeleteIcon } from "utills/svgs/BgDeleteIcon";
import { useDispatch, useSelector } from "react-redux";
import { previewFormToggler, setLoader } from "store/global/globalReducer";
import { postDynamicFormThunk } from "store/form";
import { Loader } from "components/common/Loader";
import { toastHandler } from "responseHanlder";
import { generateId } from "utills/uid";
import { formHandler } from "store/global/globalReducer";
import { TOAST_TYPE_ERROR, TOAST_TYPE_SUCCESS } from "utills/globalVars";
import { useGetAllServices } from "Hooks/useGetAllServices";
import { useGetForms } from "Hooks/useGetForms";
const CreateForm = ({
  togglePreviewForm,
  toggleCreateForm,
  toggleAddedForms,
}) => {
  const [serviceId, setServiceId] = useState("");
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.global);
  const { fetchForms } = useGetForms();
  const [formName, setFormName] = useState("");
  const [numSteps, setNumSteps] = useState(1);
  const [paymentRequired, setPaymentRequired] = useState(false);
  const [steps, setSteps] = useState([
    {
      heading: "",
      numFields: 0,
      fields: [],
    },
  ]);
  const [formData, setFormData] = useState({
    formName: formName,
    numSteps: numSteps,
    steps: steps,
  });

  // Function to handle form name input change
  const handleFormNameChange = (event) => {
    setFormName(event.target.value);
  };

  // Function to handle number of steps input change
  const handleNumStepsChange = (event) => {
    const numSteps = parseInt(event.target.value, 10);
    setNumSteps(numSteps);

    if (numSteps < steps.length) {
      setSteps(steps.slice(0, numSteps));
    } else {
      const updatedSteps = [...steps];
      for (let i = steps.length; i < numSteps; i++) {
        updatedSteps.push({
          heading: "",
          numFields: 0,
          fields: [],
        });
      }
      setSteps(updatedSteps);
    }
  };

  // Function to handle step heading input change
  const handleStepHeadingChange = (event, stepIndex) => {
    const updatedSteps = [...steps];
    updatedSteps[stepIndex].heading = event.target.value;
    setSteps(updatedSteps);
  };

  // Function to handle number of fields input change
  const handleNumFieldsChange = (event, stepIndex) => {
    const numFields = parseInt(event.target.value, 10);
    const updatedSteps = [...steps];
    updatedSteps[stepIndex].numFields = numFields;
    updatedSteps[stepIndex].fields = Array.from({ length: numFields }, () => ({
      type: "",
      label: "",
      isLabelValid: false,
      numOptions: 0,
      options: [],
    }));
    setSteps(updatedSteps);
  };

  // Function to handle field type select change
  const handleFieldTypeChange = (event, stepIndex, fieldIndex) => {
    const updatedSteps = [...steps];
    const fieldType = event.target.value;
    updatedSteps[stepIndex].fields[fieldIndex].type = fieldType;

    if (fieldType === "selection") {
      updatedSteps[stepIndex].fields[fieldIndex].numOptions = 0;
      updatedSteps[stepIndex].fields[fieldIndex].options = [];
    }

    setSteps(updatedSteps);
  };

  // Function to handle field label input change
  const handleFieldLabelChange = (event, stepIndex, fieldIndex) => {
    const label = event.target.value;
    const updatedSteps = [...steps];
    updatedSteps[stepIndex].fields[fieldIndex].label = label;
    updatedSteps[stepIndex].fields[fieldIndex].isLabelValid =
      label.trim().length > 0;
    setSteps(updatedSteps);
  };

  // Function to handle label 1 input change
  const handleLabel1Change = (event, stepIndex, fieldIndex) => {
    const label1 = event.target.value;
    const updatedSteps = [...steps];
    updatedSteps[stepIndex].fields[fieldIndex].label1 = label1;
    setSteps(updatedSteps);
  };

  // Function to handle label 2 input change
  const handleLabel2Change = (event, stepIndex, fieldIndex) => {
    const label2 = event.target.value;
    const updatedSteps = [...steps];
    updatedSteps[stepIndex].fields[fieldIndex].label2 = label2;
    setSteps(updatedSteps);
  };

  // Function to handle number of options input change
  const handleNumOptionsChange = (event, stepIndex, fieldIndex) => {
    const numOptions = parseInt(event.target.value, 10);
    const updatedSteps = [...steps];
    updatedSteps[stepIndex].fields[fieldIndex].numOptions = numOptions;
    updatedSteps[stepIndex].fields[fieldIndex].options = Array.from(
      { length: numOptions },
      () => ""
    );
    setSteps(updatedSteps);
  };

  // Function to handle option input change
  const handleOptionChange = (event, stepIndex, fieldIndex, optionIndex) => {
    const updatedSteps = [...steps];
    updatedSteps[stepIndex].fields[fieldIndex].options[optionIndex] =
      event.target.value;

    setSteps(updatedSteps);
  };

  const handleTagChange = (event, stepIndex, fieldIndex) => {
    console.log(event.target.value, stepIndex, fieldIndex);
    const newSteps = [...steps];
    console.log(event.target.type);
    // newSteps[stepIndex].fields[fieldIndex].tag = e.target.value
    newSteps[stepIndex].fields[fieldIndex].tag = event.target.value;

    setSteps(newSteps);
  };

  const handleExample = (event, stepIndex, fieldIndex) => {
    console.log(event.target.value, stepIndex, fieldIndex);
    const newSteps = [...steps];
    // newSteps[stepIndex].fields[fieldIndex].tag = e.target.value
    newSteps[stepIndex].fields[fieldIndex].example = event.target.value;

    console.log(newSteps);
    setSteps(newSteps);
  };

  // Function to add a field to a step
  const addField = (stepIndex) => {
    const updatedSteps = [...steps];
    const newField = {
      type: "",
      label: "",
      isLabelValid: false,
      numOptions: 0,
      options: [],
    };

    if (updatedSteps[stepIndex].fields.every((field) => field.isLabelValid)) {
      updatedSteps[stepIndex].fields.push(newField);
    } else {
      alert(
        "Please enter a label for the previous field before adding a new one."
      );
    }

    setSteps(updatedSteps);
  };

  // Function to remove a field from a step
  const removeField = (stepIndex, fieldIndex) => {
    const updatedSteps = [...steps];
    updatedSteps[stepIndex].fields.splice(fieldIndex, 1);
    setSteps(updatedSteps);
  };

  // Function to remove a step
  const removeStep = (stepIndex) => {
    const updatedSteps = [...steps];
    updatedSteps.splice(stepIndex, 1);
    setSteps(updatedSteps);
  };

  const paymentHandler = () => {
    setPaymentRequired(!paymentRequired);
  };

  const handleSwitchOptionsChange = (event, stepIndex, fieldIndex) => {
    const numOptions = parseInt(event.target.value, 10);
    if (numOptions > 2) {
      toastHandler("You can only add two options in switch button", "error");
      return;
    }
    const updatedSteps = [...steps];
    updatedSteps[stepIndex].fields[fieldIndex].numOptions = numOptions;
    updatedSteps[stepIndex].fields[fieldIndex].options = Array.from(
      { length: numOptions },
      () => ""
    );
    setSteps(updatedSteps);
  };

  const viewBusinessForm = () => {
    dispatch(formHandler(formData));
    togglePreviewForm();
  };

  const handlePreview = () => {
    const newSteps = [...steps];

    newSteps.map((step, index) => {
      step.step = index.toString();
      step.step_heading = step.heading;

      step.fields.forEach((field) => {
        if (field.type === "selection") {
          field.type = "dropdown";
        }
        field.placeholder = field.example;
        field.default_value = "";
        field.is_completed =
          field.type === "switch" || field.type === "radio"
            ? field.options[0]
            : "";
        field.field_row_id = generateId();

        field.step = newSteps.indexOf(step).toString();
        field.position = "";
      });
    });

    const data = newSteps.map((step) => {
      const { heading, numFields, ...rest } = step;
      return { ...rest };
    });

    const formData = {
      service_id: "",
      form_name: formName,
      form_status: "",
      steps: data,
    };

    // viewBusinessForm();
    if (formData.form_name === "") {
      return toastHandler("Please fill in all fields", TOAST_TYPE_ERROR);
    }

    dispatch(formHandler(formData));
    togglePreviewForm();
  };

  const saveAsDraft = () => {
    NotificationManager.success("Form saved as draft");
  };

  const closeCreateForm = () => {
    toggleCreateForm();
  };

  // Function to handle form submission
  const handleSubmit = (event, type) => {
    event.preventDefault();

    const newSteps = [...steps];

    newSteps.map((step, index) => {
      step.step = index.toString();
      step.step_heading = step.heading;

      step.fields.forEach((field) => {
        if (field.type === "selection") {
          field.type = "dropdown";
        }
        field.placeholder = field.example;
        field.default_value = "";
        field.default_value =
          field.type === "switch" || field.type === "radio"
            ? field.options[0]
            : "";
        field.field_row_id = generateId();

        field.step = newSteps.indexOf(step).toString();
        field.position = "";
      });
    });

    const data = newSteps.map((step) => {
      const { heading, numFields, ...rest } = step;
      return { ...rest };
    });

    const formData = {
      service_id: serviceId,
      form_name: formName,
      form_status: type,
      steps: data,
    };

    setFormData(formData);
    // Display form data
    console.log(formData);
    dispatch(setLoader(true));
    dispatch(postDynamicFormThunk(formData))
      .then((response) => {
        console.log(response);
        if (response.payload) {
          fetchForms(type);
          closeCreateForm();
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

  const handleAddStep = () => {
    const newSteps = [...steps];

    let hasEmptyValue = false;
    steps.map((step) => {
      if (step.heading === "" || step.fields.length < 1) {
        hasEmptyValue = true;
      }
      // step.fields.map((field) => {
      //   if (field.label === "" || field.tag == "" || field.type === "") {
      //     toastHandler(
      //       "Please enter required parameters for the previous field before adding a new step.",
      //       TOAST_TYPE_ERROR
      //     );
      //   } else {
      //   }
      // });
    });

    if (hasEmptyValue) {
      toastHandler("previous step cannot have empty inputs", TOAST_TYPE_ERROR);
    } else {
      newSteps.push({
        heading: "",
        numFields: 0,
        fields: [],
      });
      setSteps(newSteps);
      toastHandler("Step Added", TOAST_TYPE_SUCCESS);
    }
  };

  const handleAddField = (stepIndex) => {
    const newSteps = _.cloneDeep(steps);
    let hasEmptyValue = false;
    steps.forEach((step) => {
      step.fields.forEach((field) => {
        if (field.label === "" || field.tag == "" || field.type === "") {
          hasEmptyValue = true;
        }
      });
    });

    if (hasEmptyValue) {
      toastHandler(
        "Please enter required parameters for the previous field before adding a new one.",
        TOAST_TYPE_ERROR
      );
    } else {
      newSteps[stepIndex].fields.push({
        type: "",
        label: "",
        isLabelValid: false,
        numOptions: 0,
        options: [],
      });

      setSteps(newSteps);
    }
  };

  const { getServices } = useGetAllServices();
  const { data: services } = useSelector((state) => state.getAllServices);
  useEffect(() => {
    getServices();
  }, []);

  console.log(services, "services");
  return (
    <div className="add-p-side grid grid-cols-10  dynamic-form-container">
      <NotificationContainer />
      <div className="col-span-2 left-side"></div>
      <div className="right-side col-span-8">
        <motion.div
          initial={{ x: 700 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2, type: "tween", duration: 0.4 }}
          className="inner-right relative"
        >
          {isLoading && <Loader />}
          <div>
            <div
              onClick={closeCreateForm}
              className="absolute z-50 text-white p-2 right-1 top-1 cursor-pointer"
            >
              <SideTimes />
            </div>
            <div className="add-detail pt-5 px-5 relative">
              <div className="flex absolute right-5 gap-2 top-10 ">
                <div
                  onClick={handlePreview}
                  className="form-preview-btn gap-2 cursor-pointer flex items-center px-2 py-2"
                >
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
                </div>
              </div>
              <div className="title flex gap-2 items-center">
                <div onClick={closeCreateForm} className="cursor-pointer">
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

          <div className="form-building-container p-5">
            <div>
              <form>
                <div className="top-form-builder">
                  <div>
                    <label htmlFor="formName">Form Name</label>
                  </div>
                  <div>
                    {" "}
                    <input
                      type="text"
                      id="formName"
                      maxLength="60"
                      value={formName}
                      onChange={handleFormNameChange}
                      required
                      placeholder="Enter form name"
                    />
                  </div>
                  <hr className="my-2" />
                  <div className="grid grid-cols-2 ">
                    <div>
                      {" "}
                      <div>
                        <label htmlFor="formName">Service</label>
                      </div>
                      <div>
                        {" "}
                        <select onChange={(e) => setServiceId(e.target.value)}>
                          <option value="" key="" selected disabled>
                            {" "}
                            select service
                          </option>
                          {services?.map((service, index) => (
                            <option
                              value={service.business_service_id}
                              key={service.business_service_id}
                            >
                              {service.name}{" "}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <hr className="my-2" />
                  <div>
                    {" "}
                    <label htmlFor="numSteps">
                      How many steps do you want to add in this form
                    </label>
                  </div>

                  <div className="flex gap-2 items-center">
                    <input
                      type="number"
                      id="numSteps"
                      placeholder="number of steps"
                      value={numSteps}
                      onChange={handleNumStepsChange}
                      required
                    />

                    <button
                      type="button"
                      onClick={handleAddStep}
                      className="ann-btn rounded-md px-3 "
                    >
                      + Add Step
                    </button>
                  </div>
                </div>

                <hr className="my-2" />

                {steps.map((step, stepIndex) => (
                  <div key={stepIndex}>
                    <div className="steps-top grid grid-cols-2 mt-2">
                      <div>
                        <div>
                          {" "}
                          <h3 className="steps-heading">
                            Step {stepIndex + 1}
                          </h3>
                          <div>
                            {" "}
                            <label htmlFor={`stepHeading${stepIndex}`}>
                              Heading
                            </label>
                          </div>
                          <div>
                            {" "}
                            <input
                              type="text"
                              maxLength="60"
                              id={`stepHeading${stepIndex}`}
                              value={step.heading}
                              placeholder="Step heading"
                              onChange={(event) =>
                                handleStepHeadingChange(event, stepIndex)
                              }
                              required
                            />
                          </div>
                          <div>
                            {" "}
                            <label htmlFor={`numFields${stepIndex}`}>
                              How many fields do you want to add in step{" "}
                              {stepIndex + 1}
                            </label>
                          </div>
                          <div className="flex gap-2 items-center">
                            {" "}
                            <input
                              type="number"
                              id={`numFields${stepIndex}`}
                              value={step?.numFields}
                              onChange={(event) =>
                                handleNumFieldsChange(event, stepIndex)
                              }
                              required
                            />
                            <button
                              type="button"
                              onClick={() => handleAddField(stepIndex)}
                              className="ann-btn rounded-md px-2 "
                            >
                              + Add Field
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 justify-end  ">
                        <div
                          onClick={() => removeStep(stepIndex)}
                          className="cursor-pointer"
                        >
                          <BgDeleteIcon />
                        </div>
                        {/* <div>
                          <svg
                            width="13"
                            height="11"
                            viewBox="0 0 20 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              y="12"
                              width="20"
                              height="4"
                              rx="2"
                              fill="black"
                            />
                            <rect
                              y="6"
                              width="20"
                              height="4"
                              rx="2"
                              fill="black"
                            />
                            <rect width="20" height="4" rx="2" fill="black" />
                          </svg>
                        </div> */}
                      </div>
                    </div>

                    {step.fields.map((field, fieldIndex) => (
                      <div key={fieldIndex} className="steps-bottom mt-2">
                        <div className="grid grid-cols-11 gap-3">
                          <div className="col-span-5">
                            <label
                              htmlFor={`fieldType${stepIndex}-${fieldIndex}`}
                            >
                              Field Type
                            </label>
                            <select
                              id={`fieldType${stepIndex}-${fieldIndex}`}
                              value={field.type}
                              onChange={(event) =>
                                handleFieldTypeChange(
                                  event,
                                  stepIndex,
                                  fieldIndex
                                )
                              }
                              required
                              className="font-poppins"
                            >
                              <option value="">Select Field Type</option>
                              <option value="text">Text</option>
                              <option value="number">Number</option>
                              <option value="tel">Telephone</option>
                              <option value="checkbox">Checkbox</option>
                              <option value="switch">Switch Button</option>

                              <option value="radio">Radio</option>
                              <option value="selection">Selection</option>
                              <option value="date">Date</option>
                              <option value="email">Email</option>

                              <option value="signature">Signature</option>
                              <option value="file">File</option>
                            </select>
                          </div>

                          <div className="col-span-5 ">
                            <div>
                              <label>Tag:</label>
                              <input
                                type="text"
                                maxLength="60"
                                id={`tag${stepIndex}-${fieldIndex}`}
                                onChange={(event) =>
                                  handleTagChange(event, stepIndex, fieldIndex)
                                }
                                required
                              />
                              {field.type !== "selection" &&
                              field.type !== "radio" &&
                              field.type !== "switch" &&
                              field.type !== "checkbox" &&
                              field.type !== "date" &&
                              field.type !== "file" &&
                              field.type !== "signature" ? (
                                <div>
                                  {" "}
                                  <label>Placeholder:</label>
                                  <input
                                    type="text"
                                    maxLength="60"
                                    id={`tag${stepIndex}-${fieldIndex}`}
                                    onChange={(event) =>
                                      handleExample(
                                        event,
                                        stepIndex,
                                        fieldIndex
                                      )
                                    }
                                    required
                                  />
                                </div>
                              ) : (
                                ""
                              )}
                            </div>

                            {field.type === "switch" && (
                              <div className="">
                                <div>
                                  <label
                                    htmlFor={`numOptions${stepIndex}-${fieldIndex}`}
                                  >
                                    How many options in switch?
                                  </label>
                                  <input
                                    type="number"
                                    id={`numOptions${stepIndex}-${fieldIndex}`}
                                    value={field.numOptions}
                                    onChange={(event) =>
                                      handleSwitchOptionsChange(
                                        event,
                                        stepIndex,
                                        fieldIndex
                                      )
                                    }
                                    required
                                  />
                                </div>

                                <div>
                                  {field.options && (
                                    <div>
                                      {field.options.length > 0 ? (
                                        <label className="my-2">Options</label>
                                      ) : (
                                        ""
                                      )}
                                      <div className="grid grid-cols-2 gap-3">
                                        {field.options.map(
                                          (option, optionIndex) => (
                                            <div key={optionIndex}>
                                              <div>
                                                <label
                                                  htmlFor={`option${stepIndex}-${fieldIndex}-${optionIndex}`}
                                                >
                                                  Option {optionIndex + 1}:
                                                </label>
                                                <input
                                                  type="text"
                                                  maxLength="60"
                                                  id={`option${stepIndex}-${fieldIndex}-${optionIndex}`}
                                                  value={option}
                                                  onChange={(event) =>
                                                    handleOptionChange(
                                                      event,
                                                      stepIndex,
                                                      fieldIndex,
                                                      optionIndex
                                                    )
                                                  }
                                                  required
                                                />
                                              </div>
                                            </div>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}

                            {field.type === "radio" && (
                              <div className="">
                                <label
                                  htmlFor={`numOptions${stepIndex}-${fieldIndex}`}
                                >
                                  How many options in radio ?
                                </label>
                                <input
                                  type="number"
                                  id={`numOptions${stepIndex}-${fieldIndex}`}
                                  value={field.numOptions}
                                  onChange={(event) =>
                                    handleNumOptionsChange(
                                      event,
                                      stepIndex,
                                      fieldIndex
                                    )
                                  }
                                  required
                                />

                                <div>
                                  {field.options && (
                                    <div>
                                      {field.options.length > 0 ? (
                                        <label className="my-2">Options</label>
                                      ) : (
                                        ""
                                      )}
                                      <div className="grid grid-cols-2 gap-3">
                                        {field.options.map(
                                          (option, optionIndex) => (
                                            <div key={optionIndex}>
                                              <div>
                                                <label
                                                  htmlFor={`option${stepIndex}-${fieldIndex}-${optionIndex}`}
                                                >
                                                  Option {optionIndex + 1}:
                                                </label>
                                                <input
                                                  type="text"
                                                  maxLength="60"
                                                  id={`option${stepIndex}-${fieldIndex}-${optionIndex}`}
                                                  value={option}
                                                  onChange={(event) =>
                                                    handleOptionChange(
                                                      event,
                                                      stepIndex,
                                                      fieldIndex,
                                                      optionIndex
                                                    )
                                                  }
                                                  required
                                                />
                                              </div>
                                            </div>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}

                            {field.type === "selection" && (
                              <div>
                                <div>
                                  <label
                                    htmlFor={`label${stepIndex}-${fieldIndex}`}
                                  >
                                    Label:
                                  </label>
                                  <input
                                    type="text"
                                    maxLength="60"
                                    id={`label${stepIndex}-${fieldIndex}`}
                                    value={field.label}
                                    onChange={(event) =>
                                      handleFieldLabelChange(
                                        event,
                                        stepIndex,
                                        fieldIndex
                                      )
                                    }
                                    required
                                  />
                                </div>

                                <label
                                  htmlFor={`numOptions${stepIndex}-${fieldIndex}`}
                                >
                                  How many options in Selection?
                                </label>
                                <input
                                  type="number"
                                  id={`numOptions${stepIndex}-${fieldIndex}`}
                                  value={field.numOptions}
                                  onChange={(event) =>
                                    handleNumOptionsChange(
                                      event,
                                      stepIndex,
                                      fieldIndex
                                    )
                                  }
                                  required
                                />

                                <div>
                                  {field.options && (
                                    <div>
                                      {field.options.length > 0 ? (
                                        <label className="my-2">Options</label>
                                      ) : (
                                        ""
                                      )}
                                      <div className="grid grid-cols-2 gap-3">
                                        {field.options.map(
                                          (option, optionIndex) => (
                                            <div key={optionIndex}>
                                              <div>
                                                <label
                                                  htmlFor={`option${stepIndex}-${fieldIndex}-${optionIndex}`}
                                                >
                                                  Option {optionIndex + 1}:
                                                </label>
                                                <input
                                                  type="text"
                                                  maxLength="60"
                                                  id={`option${stepIndex}-${fieldIndex}-${optionIndex}`}
                                                  value={option}
                                                  onChange={(event) =>
                                                    handleOptionChange(
                                                      event,
                                                      stepIndex,
                                                      fieldIndex,
                                                      optionIndex
                                                    )
                                                  }
                                                  required
                                                />
                                              </div>
                                            </div>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}

                            {field.type !== "selection" && (
                              <>
                                <label
                                  htmlFor={`label${stepIndex}-${fieldIndex}`}
                                >
                                  Label:
                                </label>
                                <input
                                  type="text"
                                  maxLength="60"
                                  id={`label${stepIndex}-${fieldIndex}`}
                                  value={field.label}
                                  onChange={(event) =>
                                    handleFieldLabelChange(
                                      event,
                                      stepIndex,
                                      fieldIndex
                                    )
                                  }
                                  required
                                />
                              </>
                            )}
                          </div>

                          <div className="col-span-1 flex justify-center gap-1 items-center">
                            <div className="mt-1">
                              <button
                                onClick={() =>
                                  removeField(stepIndex, fieldIndex)
                                }
                              >
                                <BgDeleteIcon />
                              </button>
                            </div>
                            {/* <div>
                              <svg
                                width="13"
                                height="11"
                                viewBox="0 0 20 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  y="12"
                                  width="20"
                                  height="4"
                                  rx="2"
                                  fill="black"
                                />
                                <rect
                                  y="6"
                                  width="20"
                                  height="4"
                                  rx="2"
                                  fill="black"
                                />
                                <rect
                                  width="20"
                                  height="4"
                                  rx="2"
                                  fill="black"
                                />
                              </svg>
                            </div> */}
                          </div>
                        </div>

                        <hr className="mt-3"></hr>
                      </div>
                    ))}
                    {/* <button onClick={() => addField(stepIndex)}>Add Field</button> */}
                  </div>
                ))}
                <div className="flex items-center justify-end gap-2 mt-2">
                  <div>
                    <button
                      className="d-form-submit-btn px-8"
                      type="submit"
                      onClick={(event) => handleSubmit(event, "live")}
                    >
                      Publish Form
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={closeCreateForm}
                      className="d-form-cancel-btn px-6"
                    >
                      {" "}
                      Cancel
                    </button>
                  </div>
                </div>
                <hr className="my-2" />

                <div className="create-form-stripe add-ann-form my-5">
                  <div className="stripe-option">Option To Accept Payment</div>
                  <div className="flex  items-center gap-5 ">
                    <div>
                      <label>
                        Would you like to get a payment upfront of a service ?{" "}
                      </label>
                    </div>
                    <div>
                      <div>
                        <div>
                          <input
                            checked={paymentRequired}
                            className="os-react-switch-checkbox"
                            id={`HandleToggle-$ react-switch-new`}
                            type="checkbox"
                            onChange={paymentHandler}
                          />

                          <label
                            style={{ background: paymentRequired && "#B695F8" }}
                            className="react-switch-label"
                            htmlFor={`react-switch-new`}
                            onClick={paymentHandler}
                          >
                            <span className={`react-switch-button`} />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  {paymentRequired && (
                    <div>
                      <div className="grid grid-cols-3 gap-5 mt-2">
                        <div>
                          <label>Label Name</label>
                          <div>
                            {" "}
                            <input type="text" />{" "}
                          </div>
                        </div>
                        <div>
                          <label>Placeholder</label>
                          <div>
                            {" "}
                            <input type="text" placeholder="Amount" />{" "}
                          </div>{" "}
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-5 mt-2">
                        <div>
                          <label>Label Name</label>
                          <div>
                            {" "}
                            <input type="text" />{" "}
                          </div>
                        </div>
                        <div>
                          <label>Placeholder</label>
                          <div>
                            {" "}
                            <input
                              type="text"
                              maxLength="60"
                              placeholder="Enter detail"
                            />{" "}
                          </div>{" "}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <hr className="mt-3" />
              </form>
              <div className="flex items-center gap-3 mt-4 justify-center">
                <button
                  className="form-save-button"
                  onClick={(e) => handleSubmit(e, "prebuilt")}
                >
                  Save as Prebuilt
                </button>
                <button
                  onClick={(e) => handleSubmit(e, "draft")}
                  type="button"
                  className="form-save-draft-button"
                >
                  Save as Draft
                </button>
                <button
                  className="form-cancel-button"
                  onClick={closeCreateForm}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
export default CreateForm;
