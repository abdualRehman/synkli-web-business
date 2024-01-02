import "./css/stripeSide.css";
import BusinessType from "./stripe-components/business-type/BusinessType";
import ContactInfo from "./stripe-components/contact-info/ContactInfo";
import BusinessDetails from "./stripe-components/business-details/BusinessDetails";
import ProofOfDocs from "./stripe-components/business-details/bd-components/ProofOfDocs";
import ProofDocsUpload from "./stripe-components/business-details/bd-components/ProofDocsUpload";
import AbnUpload from "./stripe-components/business-details/bd-components/AbnUpload";
import AddPerson from "./stripe-components/add-person/AddPerson";
import AddPersonForm from "./stripe-components/add-person/AddPersonForm";
import ProofIdentity from "./stripe-components/add-person/ProofIdentity";
import ProofIdentityDocs from "./stripe-components/add-person/ProofIdentityDocs";
import IdentityPhotoCard from "./stripe-components/add-person/IdentityPhotoCard";
import PaymentInfo from "./stripe-components/payment-info/PaymentInfo";

import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";

import { useState } from "react";
import { motion } from "framer-motion";

const StripeSide = ({ toggleStripeSide }) => {
  const [percent, setPercent] = useState(0);
  const [condition, setCondition] = useState(1);

  function changePercent(percent) {
    setPercent(percent);
  }

  const handleCondition = (condition) => {
    setCondition(condition);
  };
  function myComponent() {
    return (
      <div>
        {condition === 1 && (
          <BusinessType
            changePercent={changePercent}
            handleCondition={handleCondition}
            toggleStripeSide={toggleStripeSide}
          />
        )}
        {condition === 2 && (
          <ContactInfo
            changePercent={changePercent}
            handleCondition={handleCondition}
          />
        )}
        {condition === 3 && (
          <BusinessDetails
            changePercent={changePercent}
            handleCondition={handleCondition}
          />
        )}
        {condition === 4 && (
          <ProofOfDocs
            changePercent={changePercent}
            handleCondition={handleCondition}
          />
        )}
        {condition === 5 && (
          <ProofDocsUpload
            changePercent={changePercent}
            handleCondition={handleCondition}
          />
        )}
        {condition === 6 && (
          <AbnUpload
            changePercent={changePercent}
            handleCondition={handleCondition}
          />
        )}
        {condition === 7 && (
          <AddPerson
            changePercent={changePercent}
            handleCondition={handleCondition}
          />
        )}
        {condition === 8 && (
          <AddPersonForm
            changePercent={changePercent}
            handleCondition={handleCondition}
          />
        )}
        {condition === 9 && (
          <ProofIdentity
            changePercent={changePercent}
            handleCondition={handleCondition}
          />
        )}
        {condition === 10 && (
          <ProofIdentityDocs
            changePercent={changePercent}
            handleCondition={handleCondition}
          />
        )}
        {condition === 11 && (
          <IdentityPhotoCard
            changePercent={changePercent}
            handleCondition={handleCondition}
          />
        )}
        {condition === 12 && (
          <PaymentInfo
            changePercent={changePercent}
            handleCondition={handleCondition}
          />
        )}
      </div>
    );
  }

  function myTitle() {
    return (
      <div>
        {condition === 1 && "Set up Stripe"}
        {condition === 2 && "Contact Information Details"}
        {condition === 3 && "Business Details"}
        {condition === 4 && "Proof Of Business Documents "}
        {condition === 5 && "Proof Of Business Documents "}
        {condition === 6 && "Business Details"}
        {condition === 7 && "Add Person"}
        {condition === 8 && "Add Person"}
        {condition === 9 && "Proof Of Identity Document"}
        {condition === 10 && "Proof Of Identity Document"}
        {condition === 11 && "Proof Of Identity Document"}
        {condition === 12 && "Payment Information"}
      </div>
    );
  }

  return (
    <div className="add-p-side grid grid-cols-5">
      <div className="left-side  col-span-3"></div>
      <div className="right-side col-span-2 ">
        <motion.div
          initial={{ x: 700 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2, type: "tween", duration: 0.4 }}
          className="inner-right"
        >
          <div>
            <div className="grid grid-cols-2 p-5 stripe-top">
              <div className="title">{myTitle()}</div>
              <div className="flex justify-end gap-10">
                {condition === 1 ? (
                  <button className="stripe-btn px-5 py-1 rounded-xl">
                    Status
                  </button>
                ) : (
                  ""
                )}
                <span
                  onClick={toggleStripeSide}
                  className="flex  cursor-pointer"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="13" cy="13" r="13" fill="#666666" />
                    <path
                      d="M19 8L8 19"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                    <path
                      d="M19 19L8 8"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <div className="px-10 mt-3">
            <ProgressBar
              percent={percent}
              filledBackground="linear-gradient(180.04deg, #101828 1.28%, #0D1B37 99.81%, #0A1E46 99.96%)"
              height={2}
            >
              <Step transition="scale">
                {({ accomplished }) => (
                  <div
                    className={`progress step ${
                      accomplished ? "complete" : "incomplete"
                    }`}
                  >
                    1
                  </div>
                )}
              </Step>
              <Step transition="scale">
                {({ accomplished }) => (
                  <div
                    className={`progress step ${
                      accomplished ? "complete" : "incomplete"
                    }`}
                  >
                    2
                  </div>
                )}
              </Step>
              <Step transition="scale">
                {({ accomplished }) => (
                  <div
                    className={`progress step ${
                      accomplished ? "complete" : "incomplete"
                    }`}
                  >
                    3
                  </div>
                )}
              </Step>

              <Step transition="scale">
                {({ accomplished }) => (
                  <div
                    className={`progress step ${
                      accomplished ? "complete" : "incomplete"
                    }`}
                  >
                    4
                  </div>
                )}
              </Step>

              <Step transition="scale">
                {({ accomplished }) => (
                  <div
                    className={`progress step ${
                      accomplished ? "complete" : "incomplete"
                    }`}
                  >
                    5
                  </div>
                )}
              </Step>
            </ProgressBar>
          </div>

          <div>{myComponent()}</div>
        </motion.div>
      </div>
    </div>
  );
};
export default StripeSide;
