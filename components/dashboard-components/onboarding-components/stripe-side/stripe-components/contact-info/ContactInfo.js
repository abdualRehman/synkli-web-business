import "./css/contactInfo.css";
import "../../../add-service/css/addService.css";
import { useState } from "react";
import Ripples from "react-ripples";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  validateEmail,
  validateWebLink,
} from "../../../../../../utills/FormValidation";

const ContactInfo = ({ handleCondition, changePercent }) => {
  const [legalBusinessName, setLegalBusinessName] = useState("");
  const [doingBusinessAs, setDoingBusinessAs] = useState("");
  const [email, setEmail] = useState("");
  const [businessWebsite, setBusinessWebsite] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const [hasError, setHasError] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [weblinkError, setWeblinkError] = useState(false);

  const handleSubmit = () => {
    if (
      !legalBusinessName ||
      !doingBusinessAs ||
      !email ||
      !businessWebsite ||
      !city ||
      !state ||
      !street ||
      !postalCode
    ) {
      return toast.error("Please fill all required fields");
      setHasError(true);
    } else {
      setHasError(false);
      changePercent(50);
      handleCondition(3);
    }
  };

  const goBack = () => {
    changePercent(0);
    handleCondition(1);
  };

  const goForward = () => {
    handleSubmit();
  };

  const handleEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value.trim().length === 0) {
      setEmailError(false);
    } else if (!validateEmail(value)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };
  const handleBusinessWebsite = (e) => {
    const value = e.target.value;
    setBusinessWebsite(value);
    if (value.trim().length === 0) {
      setWeblinkError(false);
    } else if (!validateWebLink(value)) {
      setWeblinkError(true);
    } else {
      setWeblinkError(false);
    }
  };
  return (
    <div className="contact-info p-5 mt-3">
      <ToastContainer />
      <div className="ci-top ">
        <div className="service-form">
          <div>
            <div>
              <label>Legal Business Name</label>
            </div>
            <div className="mt-1">
              <input
                onChange={(e) => setLegalBusinessName(e.target.value)}
                type="text"
                maxLength="60"
                placeholder="Business name"
                className="rounded-lg px-3 "
              />
            </div>
            <div className="ci-text px-3 mt-1">
              The name you provide must exactly match the name associated with
              the connected account’s tax ID
            </div>
          </div>

          <div className="mt-3">
            <div>
              <label>Doing Business As</label>
            </div>
            <div className="mt-1">
              <input
                onChange={(e) => setDoingBusinessAs(e.target.value)}
                type="text"
                maxLength="60"
                placeholder="Business name"
                className="rounded-lg px-3 "
              />
            </div>
            <div className="ci-text px-3 mt-1">
              The operating name of the connected account company,. If its
              different than the legal name
            </div>
          </div>
        </div>

        <div className="service-form mt-3">
          <div className="grid grid-cols-2 gap-3 ">
            <div>
              <div>
                <label>Email</label>
              </div>
              <div>
                <input
                  onChange={(e) => handleEmail(e)}
                  type="email"
                  placeholder="Email"
                  className="rounded-lg px-3"
                />
              </div>
              <div className="error-div mt-1">
                {" "}
                {emailError && <span> Invalid email address </span>}{" "}
              </div>
            </div>
            <div>
              <div>
                <label>Business Website</label>
              </div>
              <div>
                <input
                  onChange={(e) => handleBusinessWebsite(e)}
                  type="text"
                  maxLength="60"
                  placeholder="https://"
                  className="px-3 rounded-lg"
                />
              </div>
              <div className="error-div mt-1">
                {" "}
                {weblinkError && <span> Invalid Website Link </span>}{" "}
              </div>
            </div>
          </div>
        </div>

        <div className="ci-address mt-3">Address</div>

        <div className="service-form mt-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div>
                <label>City</label>
              </div>
              <div>
                <input
                  onChange={(e) => setCity(e.target.value)}
                  type="text"
                  maxLength="60"
                  placeholder="City"
                  className="rounded-lg px-3"
                />
              </div>
            </div>
            <div>
              <div>
                <label>State</label>
              </div>
              <div>
                <input
                  onChange={(e) => setState(e.target.value)}
                  type="text"
                  maxLength="60"
                  placeholder="State"
                  className="px-3 rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="service-form mt-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div>
                <label>Street</label>
              </div>
              <div>
                <input
                  onChange={(e) => setStreet(e.target.value)}
                  type="text"
                  maxLength="60"
                  placeholder="Street"
                  className="rounded-lg px-3"
                />
              </div>
            </div>
            <div>
              <div>
                <label>Postal Code</label>
              </div>
              <div>
                <input
                  onChange={(e) => setPostalCode(e.target.value)}
                  type="number"
                  placeholder="Postal Code"
                  className="px-3 rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        <div className=" flex gap-2 mt-5 ">
          <button
            onClick={goBack}
            className="cancel-btn px-8 text-sm rounded-lg"
          >
            Back
          </button>
          <button className="add-btn px-10 rounded-lg text-white text-xs">
            Save & Continue
          </button>
          <Ripples during={2000} color="#979797">
            <button
              onClick={goForward}
              className="cancel-btn px-6 text-sm rounded-lg"
              disabled={hasError || emailError || weblinkError}
            >
              Next
            </button>
          </Ripples>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
