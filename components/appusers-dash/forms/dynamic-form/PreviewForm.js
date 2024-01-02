import { motion } from "framer-motion";
import SignatureCanvas from "react-signature-canvas";
import "./css/dynamicForm.css";
import { useState, useRef } from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { SideTimes } from "utills/svgs/SideTimes";
import { ArrowLeft } from "utills/svgs/ArrowLeft";
import { useDispatch, useSelector } from "react-redux";
import { previewFormToggler } from "store/global/globalReducer";
import { generateId } from "utills/uid";
import { ImageIcon } from "utills/svgs/ImageIcon";
import { LinkIcon } from "utills/svgs/LinkIcon";
import { BgTimes } from "utills/svgs/BgTimes";
import { InfoIcon } from "utills/svgs/InfoIcon";
import { AddHint } from "global-components/AddHint";
import DatePickerComponent from "global-components/DatePicker";
import { ZoomImage } from "global-components/ImageZoom/ImageZoomer";
import { datePickerFormate } from "utills/moment";

const PreviewForm = ({ toggleCreateForm, togglePreviewForm, directory }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { form: formArr } = useSelector((state) => state.global);
  const { previewForm } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(null);
  const [hintStep, setHintStep] = useState();
  const [showModal, setShowModal] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedPdf, setSelectedPdf] = useState(null);

  const toggleHint = (hintField, stepIndex) => {
    setHintIndex(hintField);
    setHintStep(stepIndex);
    setShowHint(!showHint);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setSelectedFile(file);
  };

  const handleSelectPdf = (e) => {
    const file = e.target.files[0];
    setSelectedPdf(file);
  };

  const signatureRef = useRef();

  // Function to clear the signature
  const clearSignature = () => {
    signatureRef.current.clear();
  };

  // Function to get the signature as an image data URL
  const getSignature = () => {
    const signatureDataUrl = signatureRef.current.toDataURL();
    console.log(signatureDataUrl);
    // You can send the signatureDataUrl to your server or use it as needed.
  };

  const handleNext = () => {
    if (currentStep < formArr.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateStepCount = () => {
    if (formArr.steps.length > 1) {
      const stepCount = (currentStep / (formArr.steps.length - 1)) * 100;
      return stepCount.toFixed(0);
    } else {
      return 0;
    }
  };

  // const togglePreviewForm = () => {
  //    dispatch(previewFormToggler(!previewForm))
  // }

  console.log(formArr, "form");

  function MyComponent({ htmlContent }) {
    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
  }

  return (
    <div className="add-p-side grid grid-cols-5 ">
      <div className="col-span-3 left-side"></div>
      <div className="right-side col-span-2">
        <motion.div
          initial={{ x: 700 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2, type: "tween", duration: 0.4 }}
          className="inner-right relative"
        >
          <div>
            <div
              onClick={togglePreviewForm}
              className="absolute   text-white p-2 right-1 top-1 cursor-pointer"
            >
              <SideTimes />
            </div>
            <div className="add-detail pt-5 px-5">
              <div className="flex gap-2 items-center">
                <div className="cursor-pointer" onClick={togglePreviewForm}>
                  <ArrowLeft />
                </div>
                <div className="title">
                  {" "}
                  {formArr.form_name !== null ||
                  formArr.form_name !== undefined ? (
                    <span> {formArr.form_name} </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="form-direction mt-2 flex gap-1 items-center">
                <MyComponent htmlContent={directory} />

                {/* Forms &gt; Added Forms &gt; Preview Form &gt;{" "} */}
                {formArr.form_name !== null ||
                formArr.form_name !== undefined ? (
                  <span> {formArr.form_name} </span>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>

          <div className="preview-progress-bar mx-7 mt-5">
            <ProgressBar
              percent={calculateStepCount()}
              filledBackground="#b695f8"
              height={2}
            >
              {formArr?.steps?.map((step, index) => (
                <Step transition="scale">
                  {({ accomplished }) => (
                    <div
                      className={` ${accomplished ? "com-step" : "incom-step"}`}
                    >
                      {index + 1}
                    </div>
                  )}
                </Step>
              ))}
            </ProgressBar>
          </div>

          <div className="preview-steps  mx-5 mt-5">
            <div>
              {Array.isArray(formArr?.steps) &&
                formArr?.steps?.map((step, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        display: index === currentStep ? "block" : "none",
                      }}
                    >
                      <p className="preview-step-heading">
                        {step?.step_heading}
                      </p>
                      <div className="preview-inputs mt-3">
                        {step?.fields?.map((field, fieldIndex) => (
                          <div
                            className="preview-field relative"
                            key={fieldIndex}
                          >
                            {showHint &&
                            hintIndex === fieldIndex &&
                            hintStep === index ? (
                              <AddHint viewHint={true} newHint={field?.hint} />
                            ) : (
                              ""
                            )}
                            {field.type === "text" && (
                              <div className="mt-2">
                                <div className="add-ann-form">
                                  {" "}
                                  <div className="flex justify-between items-center">
                                    {" "}
                                    <label>
                                      {" "}
                                      {field?.label}{" "}
                                      {!field?.required ? "(Optional)" : ""}{" "}
                                    </label>{" "}
                                    <div
                                      onClick={() =>
                                        toggleHint(fieldIndex, index)
                                      }
                                    >
                                      <InfoIcon />{" "}
                                    </div>
                                  </div>
                                </div>
                                <div className="field-input-wrapper mt-1">
                                  <input
                                    type="text"
                                    maxLength="60"
                                    className="field-input"
                                    placeholder={field?.placeholder}
                                    value={field?.default_value}
                                  />
                                </div>
                              </div>
                            )}
                            {field?.type === "number" && (
                              <div className="mt-2 add-ann-form">
                                <div>
                                  <div className="flex justify-between items-center">
                                    {" "}
                                    <label>
                                      {" "}
                                      {field?.label}{" "}
                                      {!field?.required && "(Optional)"}{" "}
                                    </label>{" "}
                                    <div
                                      onClick={() =>
                                        toggleHint(fieldIndex, index)
                                      }
                                    >
                                      <InfoIcon />{" "}
                                    </div>
                                  </div>
                                </div>
                                <div className=" ">
                                  <input
                                    type="number"
                                    className="field-input"
                                    placeholder={field?.placeholder}
                                    value={field?.default_value}
                                  />
                                </div>
                              </div>
                            )}

                            {field?.type === "email" && (
                              <div className="mt-2 add-ann-form">
                                <div>
                                  <div className="flex justify-between items-center">
                                    {" "}
                                    <label>
                                      {" "}
                                      {field?.label}{" "}
                                      {!field?.required && "(Optional)"}{" "}
                                    </label>{" "}
                                    <div
                                      onClick={() =>
                                        toggleHint(fieldIndex, index)
                                      }
                                    >
                                      <InfoIcon />{" "}
                                    </div>
                                  </div>
                                  <div className=" ">
                                    <input
                                      type="email"
                                      className="field-input"
                                      placeholder={field?.placeholder}
                                      value={field?.default_value}
                                    />
                                  </div>
                                </div>
                              </div>
                            )}
                            {field?.type === "password" && (
                              <div className="mt-2 add-ann-form">
                                <div className="flex justify-between items-center">
                                  {" "}
                                  <label>
                                    {" "}
                                    {field?.label}{" "}
                                    {!field?.required && "(Optional)"}{" "}
                                  </label>{" "}
                                  <div
                                    onClick={() =>
                                      toggleHint(fieldIndex, index)
                                    }
                                  >
                                    <InfoIcon />{" "}
                                  </div>
                                </div>
                                <div className=" mt-1">
                                  <input
                                    type="password"
                                    className="field-input"
                                    placeholder={field?.placeholder}
                                    value={field?.default_value}
                                  />
                                </div>
                              </div>
                            )}
                            {field?.type === "date" && (
                              <div className="mt-2 add-ann-form">
                                {" "}
                                <div className="flex justify-between items-center">
                                  {" "}
                                  <label>
                                    {" "}
                                    {field?.label}{" "}
                                    {!field?.required && "(Optional)"}{" "}
                                  </label>{" "}
                                  <div
                                    onClick={() =>
                                      toggleHint(fieldIndex, index)
                                    }
                                  >
                                    <InfoIcon />{" "}
                                  </div>
                                </div>
                                {field?.default_value ? (
                                  <div className="mt-1">
                                    {" "}
                                    <DatePickerComponent
                                      type="date"
                                      isOpen={false}
                                      date={datePickerFormate(
                                        field?.default_value
                                      )}
                                      setVisible={(value) => console.log(value)}
                                      onDateChange={(date) => {
                                        console.log(date);
                                      }}
                                    />
                                  </div>
                                ) : (
                                  <div>
                                    <div className="mt-1">
                                      <input
                                        type="date"
                                        className="field-input"
                                        placeholder={field?.placeholder}
                                        value={field?.default_value}
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}

                            {field?.type === "tel" && (
                              <div className="mt-2 add-ann-form">
                                <div className="flex justify-between items-center">
                                  {" "}
                                  <label>
                                    {" "}
                                    {field?.label}{" "}
                                    {!field?.required && "(Optional)"}{" "}
                                  </label>{" "}
                                  <div
                                    onClick={() =>
                                      toggleHint(fieldIndex, index)
                                    }
                                  >
                                    <InfoIcon />{" "}
                                  </div>
                                </div>
                                <div className="mt-1">
                                  <input
                                    type="tel"
                                    className="field-input"
                                    placeholder={field?.placeholder}
                                    value={field?.default_value}
                                  />
                                </div>
                              </div>
                            )}

                            {field.type === "switch" && (
                              <div className="mt-2 add-ann-form">
                                <div className="flex justify-between items-center">
                                  {" "}
                                  <label>
                                    {" "}
                                    {field?.label}{" "}
                                    {!field?.required && "(Optional)"}{" "}
                                  </label>{" "}
                                  <div
                                    onClick={() =>
                                      toggleHint(fieldIndex, index)
                                    }
                                  >
                                    <InfoIcon />{" "}
                                  </div>
                                </div>
                                <div className="field-switch-wrapper mt-1">
                                  <div
                                    className={`field-switch ${
                                      field?.default_value ===
                                        field.options[0] && "active"
                                    } flex justify-center items-center`}
                                  >
                                    {" "}
                                    {field.options[0]}{" "}
                                  </div>

                                  <div
                                    className={`field-switch ${
                                      field.default_value ===
                                        field.options[1] && "active"
                                    } flex justify-center items-center`}
                                  >
                                    {" "}
                                    {field.options[1]}{" "}
                                  </div>
                                </div>
                              </div>
                            )}

                            {field.type === "checkbox" && (
                              <div className="mt-2 items-center add-ann-form">
                                <div className="flex justify-between items-center">
                                  {" "}
                                  <label>
                                    {" "}
                                    {field?.label}{" "}
                                    {!field?.required && "(Optional)"}{" "}
                                  </label>{" "}
                                  <div
                                    onClick={() =>
                                      toggleHint(fieldIndex, index)
                                    }
                                  >
                                    <InfoIcon />{" "}
                                  </div>
                                </div>
                                <div className="flex gap-2 items-center flex-wrap">
                                  {" "}
                                  {field?.options?.map((op, opIndex) => (
                                    <div
                                      key={generateId()}
                                      className="flex gap-2 items-center"
                                    >
                                      <div>
                                        {" "}
                                        <label> {op} </label>{" "}
                                      </div>
                                      <div className="field-checkbx-wrapper mt-1">
                                        <input
                                          type="checkbox"
                                          name=""
                                          id=""
                                          className="field-checkbox"
                                        />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {field.type === "dropdown" ? (
                              <div className="mt-2 add-ann-form">
                                {console.log(
                                  field.default_value,
                                  field?.options[0],
                                  "fieldDrop"
                                )}
                                <div className="flex justify-between items-center">
                                  {" "}
                                  <label>
                                    {" "}
                                    {field?.label}{" "}
                                    {!field?.required && "(Optional)"}{" "}
                                  </label>{" "}
                                  <div
                                    onClick={() =>
                                      toggleHint(fieldIndex, index)
                                    }
                                  >
                                    <InfoIcon />{" "}
                                  </div>
                                </div>
                                <select
                                  value={field?.default_value}
                                  className="preview-select mt-1"
                                >
                                  <option value="">Select</option>
                                  {field?.options?.map((option) => (
                                    <option
                                      value={option}
                                      selected={
                                        field?.default_value == option
                                          ? true
                                          : false
                                      }
                                    >
                                      {option}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            ) : (
                              ""
                            )}

                            {field.type === "radio" && (
                              <div className="mt-2 add-ann-form">
                                <div className="flex justify-between items-center">
                                  {" "}
                                  <label>
                                    {" "}
                                    {field?.label}{" "}
                                    {!field?.required && "(Optional)"}{" "}
                                  </label>{" "}
                                  <div
                                    onClick={() =>
                                      toggleHint(fieldIndex, index)
                                    }
                                  >
                                    <InfoIcon />{" "}
                                  </div>
                                </div>

                                <label>
                                  <div className="flex gap-5 items-center flex-wrap w-full ">
                                    {field?.options?.map((op, index) => (
                                      <div
                                        className="flex items-center gap-2"
                                        key={generateId()}
                                      >
                                        <div className="field-label">{op}</div>
                                        <div>
                                          <input
                                            checked={
                                              field?.default_value === op
                                            }
                                            type="radio"
                                            name={`radio-${index}`}
                                          />
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </label>
                              </div>
                            )}

                            {field.type === "signature" && (
                              <div className="add-ann-form mt-2">
                                <div className="flex justify-between items-center">
                                  {" "}
                                  <label>
                                    {" "}
                                    {field?.label}{" "}
                                    {!field?.required && "(Optional)"}{" "}
                                  </label>{" "}
                                  <div
                                    onClick={() =>
                                      toggleHint(fieldIndex, index)
                                    }
                                  >
                                    <InfoIcon />{" "}
                                  </div>
                                </div>
                                {field?.default_value ? (
                                  <div className="signature-pad p-2 mt-1">
                                    <img
                                      src={field?.default_value}
                                      alt="signature"
                                    />
                                  </div>
                                ) : (
                                  <div>
                                    {" "}
                                    <div className="signature-pad cursor-pointer shadow-lg mt-2">
                                      {" "}
                                      <SignatureCanvas
                                        ref={signatureRef}
                                        penColor="black"
                                        canvasProps={{
                                          width: 300,
                                          height: 200,
                                        }}
                                      />{" "}
                                    </div>
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
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}

                            {field.type === "file" && (
                              <div className="add-ann-form mt-2">
                                {console.log(field, "fileField")}
                                <div className="flex justify-between items-center">
                                  {" "}
                                  <label>
                                    {" "}
                                    {field?.label}{" "}
                                    {!field?.required && "(Optional)"}{" "}
                                  </label>{" "}
                                  <div
                                    onClick={() =>
                                      toggleHint(fieldIndex, index)
                                    }
                                  >
                                    <InfoIcon />{" "}
                                  </div>
                                </div>

                                {!field?.default_value ? (
                                  <div>
                                    <div>
                                      <div className=" add-ann-img-form mt-1 ">
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
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex gap-2 items-center flex-wrap">
                                    {field?.default_value?.map((op, index) => (
                                      <div className="my-3 thumbnail-wrapper relative ">
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
                                              onClose={() =>
                                                setShowModal(false)
                                              }
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
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      <div
                        className={`mb-3 mt-10 ${
                          step?.fields?.length < 4 && "mt-32"
                        }`}
                      >
                        <div className="flex justify-between items-center mt-5 ">
                          <button
                            className="preview-back-btn"
                            onClick={handlePrevious}
                            disabled={currentStep === 0}
                          >
                            Previous
                          </button>
                          <button
                            className="preview-next-btn"
                            onClick={handleNext}
                            disabled={currentStep === formArr.steps.length - 1}
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PreviewForm;
// preview-form-buttons
