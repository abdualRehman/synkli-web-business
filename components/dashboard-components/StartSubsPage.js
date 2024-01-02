import "../../components/dashboard-css/startSubs.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AppSidebar from "../appSidebarComp/AppSidebar";
import { DashboardWelcomeCard } from "../../pages/dashboard/dashboard-cards/DashboardWelcomeCard";
import { TwoStepSecondActive } from "../../utills/svgs/TwoStepSecondActive";
import {
  validateAccountNumber,
  isValidCVV,
  containsNumber,
} from "../../utills/FormValidation";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StartSubsPage = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    cardHolderName: "",
    cardNumber: null,
    expiryDate: null,
    cvv: null,
    isDefault: false,
  });

  const [cardNumberError, setcardNumberError] = useState(false);
  const [cvvError, setCvvError] = useState(false);
  const [nameError, setNameError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "cardNumber") {
      const hasError = validateAccountNumber(value);
      setcardNumberError(hasError);
    }
    if (name === "cvv") {
      const hasError = !isValidCVV(value);
      setCvvError(hasError);
    }
    if (name === "cardHolderName") {
      const hasError = containsNumber(value);
      setNameError(hasError);
    }
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const hasEmptyValue = Object.values(formData).some((value) => {
      return (
        value === "" ||
        value === null ||
        value === undefined ||
        (Array.isArray(value) && value.length === 0)
      );
    });

    if (hasEmptyValue) {
      toast.error("Please fill in all required fields.");
    } else {
      console.log("All values are non-empty.");
      navigate("/subs/success");
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="dashboard-page">
      <ToastContainer />
      {/* <div>
        <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      </div> */}
      <div className="main-grid-container">
        <div className="one "></div>
        <div className="two shadow-md">
          <DashboardWelcomeCard />
        </div>
        <div className="three shadow-md">
          <div className="one-head px-5 pt-6">
            <h1>Start Subscription</h1>
          </div>

          <div className="sub-text px-5 mt-3">
            The system will deduct money after 14 days. Your plan will
            automatically start after 14 days. However, you can cancel this plan
            anytime within the free trial period.
          </div>

          <div className="card-container pl-5 pr-16 mt-10">
            <div>
              <label>Card Holder Name</label>
              <input
                type="text"
                maxLength="60"
                placeholder="Name"
                name="cardHolderName"
                className="w-full rounded-lg px-3 mt-1"
                onChange={handleInputChange}
              />
            </div>
            {formData.cardHolderName && (
              <div className="error-div mt-1">
                {nameError && (
                  <span> Card holder name can't contain digits </span>
                )}
              </div>
            )}

            <div className="mt-3">
              <label>Card Number</label>
              <input
                type="number"
                name="cardNumber"
                placeholder="0000"
                className="w-full rounded-lg px-3 mt-1"
                onChange={handleInputChange}
              />
            </div>
            {formData.cardNumber && (
              <div className="error-div mt-1">
                {cardNumberError && <span> Invalid card number </span>}
              </div>
            )}
          </div>

          <div className="card-container flex gap-5 pl-5 pr-16 w-full  mt-3">
            <div className="w-full">
              <h1>Expiry Date</h1>
              <input
                onChange={handleInputChange}
                name="expiryDate"
                type="date"
                className="w-full rounded-lg px-3 mt-1"
              />
            </div>
            <div className="w-full">
              <h1>CVV Code</h1>
              <input
                type="number"
                className="w-full rounded-lg px-3 mt-1"
                placeholder="0000"
                name="cvv"
                onChange={handleInputChange}
              />

              {formData.cvv && (
                <div className="error-div mt-1">
                  {" "}
                  {cvvError ? <span> Invalid CVV number </span> : ""}{" "}
                </div>
              )}
            </div>
          </div>

          <div className="px-5 mt-3 flex gap-2 items-center check">
            <div className="flex justify-center items-center">
              <input
                onChange={handleInputChange}
                type="checkbox"
                name="isDefault"
              />
            </div>
            <div>Use as default payment method</div>
          </div>

          <div className="flex justify-center items-center sm:mt-5 md:mt-10 max-md:mt-12 lg:mt-24 max-lg:mt-28 max-xl:mt-32">
            <div className="my-next-btn">
              <button
                disabled={cardNumberError || cvvError || nameError}
                onClick={handleSubmit}
                className="px-12 py-2 rounded-md"
              >
                Save
              </button>
            </div>
          </div>

          <div className="flex justify-center items-center mt-2">
            <div className="bottom-svg-wrapper">
              <TwoStepSecondActive />
            </div>
          </div>
        </div>
        <div className="four"></div>
      </div>
    </div>
  );
};

export default StartSubsPage;
