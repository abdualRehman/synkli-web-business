import React, { useState } from "react";
import { motion } from "framer-motion";
import { SideTimes } from "utills/svgs/SideTimes";
import { TrainingWelcomeCard } from "./TrainingWelcomeCard";

export const AddedFormsTraining = () => {
  const [condition, setCondition] = useState("prebuilt");
  const componentProvider = () => {
    return (
      <div>
        {/* {condition === "prebuilt" && (
              <PrebuiltForms
                handleForm={handleForm}
                handleUpdateForm={handleUpdateForm}
                togglePreviewForm={togglePreviewForm}
              />
            )}
            {condition === "live" && (
              <LiveForms
                handleUpdateForm={handleUpdateForm}
                toggleFormsUpdated={toggleFormsUpdated}
                togglePreviewForm={togglePreviewForm}
              />
            )}
            {condition === "draft" && (
              <DraftForms
                handleUpdateForm={handleUpdateForm}
                toggleFormsUpdated={toggleFormsUpdated}
                togglePreviewForm={togglePreviewForm}
              />
            )} */}
      </div>
    );
  };

  return (
    <div>
      {" "}
      <div className="add-p-side grid grid-cols-10 relative ">
        <div className="col-span-2 left-side"></div>
        <div className="right-side col-span-8">
          <motion.div
            initial={{ x: 700 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.2, type: "tween", duration: 0.4 }}
            className="inner-right relative"
          >
            <TrainingWelcomeCard />
            {/* {isLoading && <Loader />} */}
            <div>
              {/* <div  onClick={closeAddedForms}> cloe added forms</div> */}
              <div
                // onClick={closeAddedForms}
                className="absolute  z-50 text-white p-2 right-1 top-1 cursor-pointer"
              >
                <SideTimes />
              </div>
              <div className="add-detail pt-5 px-5 relative">
                <div className="flex absolute right-5 gap-2 top-10 ">
                  <div
                    //   onClick={handleSubmit}
                    className=" flex items-center px-3 py-1 edit-form-btn gap-1 cursor-pointer"
                  >
                    <div>
                      <svg
                        width="11"
                        height="12"
                        viewBox="0 0 18 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.875 20C1.35937 20 0.918125 19.8043 0.55125 19.413C0.18375 19.021 0 18.55 0 18V2C0 1.45 0.18375 0.979 0.55125 0.587C0.918125 0.195667 1.35937 0 1.875 0H9.375L15 6V10H13.125V7H8.4375V2H1.875V18H7.5V20H1.875ZM13.4062 12.525L14.4141 13.6L10.7812 17.45V18.5H11.7656L15.3984 14.65L16.3828 15.7L12.3516 20H9.375V16.825L13.4062 12.525ZM16.3828 15.7L13.4062 12.525L14.7656 11.075C14.9375 10.8917 15.1562 10.8 15.4219 10.8C15.6875 10.8 15.9062 10.8917 16.0781 11.075L17.7422 12.85C17.9141 13.0333 18 13.2667 18 13.55C18 13.8333 17.9141 14.0667 17.7422 14.25L16.3828 15.7Z"
                          fill="#B695F8"
                        />
                      </svg>
                    </div>
                    <div className="flex items-center gap-2">
                      Publish Form{" "}
                      {/* {formLoader && (
                      <span>
                        <SmallLoader />
                      </span>
                    )} */}
                    </div>
                  </div>

                  <div
                    // onClick={handleCreateForm}
                    className="added-forms-btn create-form-indicate gap-1 cursor-pointer flex items-center px-3 py-2"
                  >
                    <div>+</div>
                    <div> Create Form</div>
                  </div>
                </div>
                <div className="title flex gap-2 items-center">
                  <div
                    //    onClick={closeAddedForms}
                    className="cursor-pointer"
                  >
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
                  <div>Added Forms</div>
                </div>

                <div className="add-form-route mt-2">
                  Forms &gt; Added Forms
                </div>
              </div>
            </div>

            <div className="added-forms-operations">
              <div className="forms-buttons mt-3 mx-5 grid grid-cols-4 gap-1">
                <div
                  //   onClick={() => handleCondition("prebuilt")}
                  className={`forms-btn cursor-pointer   shadow-lg ${
                    condition === "prebuilt" && "forms-active-btn"
                  }`}
                >
                  {" "}
                  Prebuilt Forms{" "}
                </div>
                <div
                  //   onClick={() => handleCondition("live")}
                  className={`forms-btn cursor-pointer   shadow-lg ${
                    condition === "live" && "forms-active-btn"
                  }`}
                >
                  {" "}
                  Live Forms{" "}
                </div>
                <div
                  //   onClick={() => handleCondition("draft")}
                  className={`forms-btn cursor-pointer   shadow-lg ${
                    condition === "draft" && "forms-active-btn"
                  }`}
                >
                  {" "}
                  Draft Forms{" "}
                </div>
              </div>
            </div>

            <div className="p-5">{componentProvider()}</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
