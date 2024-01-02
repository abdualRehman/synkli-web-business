import "./css/addPerson.css";
import { useRef, useState } from "react";
import { validateEmail } from "../../../../../../utills/FormValidation";
import Ripples from "react-ripples";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddPersonForm = ({ handleCondition, changePercent }) => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [personalIdNumber, setPersonalIdNumber] = useState("");
  const [percentageOwnership, setPercentageOwnership] = useState("");
  const [IdentityDocument, setIdentityDocument] = useState(null);

  const [emailError, setEmailError] = useState(false);

  const handleSubmit = () => {
    console.log(personalIdNumber, phoneNo);
    // console.log(firstName, lastName, emailAddress, jobTitle, dob, address, city, state, street, postalCode, phoneNo,personalIdNumber, percentageOwnership, IdentityDocument)
    if (
      !firstName ||
      !lastName ||
      !emailAddress ||
      !jobTitle ||
      !dob ||
      !address ||
      !city ||
      !state ||
      !street ||
      !postalCode ||
      !phoneNo ||
      !personalIdNumber ||
      !percentageOwnership
    ) {
      toast.error("Please fill all required fields");
    } else if (!IdentityDocument) {
      toast.error("Please select a file");
    } else {
      handleCondition(9);
    }
  };

  const handleEmail = (e) => {
    const value = e.target.value;
    setEmailAddress(value);
    if (value.trim().length === 0) {
      setEmailError(false);
    } else if (!validateEmail(value)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const goBack = () => {
    handleCondition(7);
  };

  const goForward = () => {
    handleSubmit();
  };

  const goToPayment = () => {
    changePercent(100);

    handleCondition(12);
  };

  const inputRef = useRef(null);

  function onFileSelect(file) {
    setIdentityDocument(file);
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    onFileSelect(file);
  };

  const handleButtonClick = () => {
    inputRef.current.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    onFileSelect(file);
  };

  return (
    <div className="person-form p-5 mt-5">
      <ToastContainer />
      <div className="grid grid-cols-2 gap-2 person-top-form">
        <div>
          <div>
            <label>First Name</label>
          </div>
          <div>
            <input
              onChange={(e) => setFirstname(e.target.value)}
              type="text"
              maxLength="60"
              placeholder="First Name"
            />
          </div>
        </div>

        <div>
          <div>
            <label>Last Name</label>
          </div>
          <div>
            <input
              onChange={(e) => setLastname(e.target.value)}
              type="text"
              maxLength="60"
              placeholder="Last Name"
            />
          </div>
        </div>

        <div>
          <div>
            <label>Email Address</label>
          </div>
          <div>
            <input
              onChange={(e) => handleEmail(e)}
              type="email"
              placeholder="Email Address"
            />
          </div>
        </div>

        <div>
          <div>
            <label>Job Title</label>
          </div>
          <div>
            <input
              onChange={(e) => setJobTitle(e.target.value)}
              type="text"
              maxLength="60"
              placeholder="Job Title"
            />
          </div>
        </div>

        <div>
          <div>
            <label>Date Of Birth</label>
          </div>
          <div>
            <input onChange={(e) => setDob(e.target.value)} type="date" />
          </div>
        </div>
      </div>

      <div className="heading-add">Address</div>
      <div>
        <input
          onChange={(e) => setAddress(e.target.value)}
          type="text"
          maxLength="60"
          placeholder="Address"
        />
      </div>

      <div className="grid grid-cols-2 gap-2 mt-2 person-top-form">
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
            />
          </div>
        </div>

        <div>
          <div>
            <label>Street</label>
          </div>
          <div>
            <input
              onChange={(e) => setStreet(e.target.value)}
              type="email"
              placeholder="Street"
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
              type="text"
              maxLength="60"
              placeholder="Postal Code"
            />
          </div>
        </div>

        <div>
          <div>
            <label>Phone Number</label>
          </div>
          <div>
            <input
              onChange={(e) => setPhoneNo(e.target.value)}
              type="text"
              maxLength="60"
              placeholder="Phone Number"
            />
          </div>
        </div>

        <div>
          <div>
            <label>Personal ID Number</label>
          </div>
          <div>
            <select onChange={(e) => setPersonalIdNumber(e.target.value)}>
              <option value="select">select</option>
              <option value="Au">Au</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-2">
        <div>
          <label>Percantage Ownership Of the Business</label>
        </div>
        <div>
          <input
            onChange={(e) => setPercentageOwnership(e.target.value)}
            type="number"
            placeholder="0"
          />
        </div>

        <div className="person-text">
          What percentage of the business does this person own?
        </div>
      </div>

      <div className="mt-5">
        <label>Identity Document</label>
        <div>
          <div
            className="file-input mt-2 relative"
            onClick={handleButtonClick}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="file-input__icon mt-5 ml-5">
              <svg
                width="41"
                height="26"
                viewBox="0 0 41 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M33.0068 10.7471C33.0068 10.9198 33.1295 11.0587 33.302 11.0665C37.1299 11.2388 40.1875 14.4055 40.1875 18.2787C40.1875 22.2568 36.9795 25.507 33.0068 25.507H24V25.5156H17.6875H17H8.67871C4.33691 25.5156 0.8125 21.9795 0.8125 17.6287C0.8125 14.8494 2.24878 12.406 4.42783 11.0049L4.42784 11.0049C5.12813 10.5546 5.47828 10.3295 5.58448 10.2379C5.69378 10.1437 5.71343 10.133 5.72824 10.1176C5.74304 10.1022 5.753 10.0822 5.84292 9.96931C5.93029 9.85964 6.2198 9.36862 6.79881 8.38658L6.79881 8.38657C7.71102 6.83941 9.39511 5.79822 11.3154 5.79822C12.3672 5.79822 12.8931 5.79822 12.9814 5.79038C13.4186 5.75156 13.5797 5.75949 13.7081 5.69847C13.8364 5.63746 13.9319 5.5075 14.238 5.19289C14.2998 5.12937 14.5245 4.85323 14.974 4.30095C16.8341 2.01525 19.6603 0.554688 22.8379 0.554688C28.4541 0.554688 33.0068 5.11353 33.0068 10.7471ZM17.6875 22.6206H23.3125V18.5734H25.6544C26.2502 18.5734 26.5481 18.5734 26.688 18.4549C26.8094 18.3521 26.8746 18.1976 26.8637 18.0389C26.851 17.8561 26.6433 17.6426 26.2279 17.2155L22.795 13.6869C21.9939 12.8634 21.5934 12.4516 21.129 12.298C20.7207 12.163 20.2798 12.1631 19.8716 12.2984C19.4073 12.4523 19.007 12.8643 18.2064 13.6882L14.7702 17.2245C14.3553 17.6515 14.1479 17.865 14.1353 18.0478C14.1245 18.2065 14.1897 18.3609 14.3111 18.4636C14.4509 18.582 14.7486 18.582 15.344 18.582H17.6875V22.6206Z"
                  fill="url(#paint0_linear_2369_7166)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_2369_7166"
                    x1="22.432"
                    y1="0.864678"
                    x2="22.4201"
                    y2="25.5157"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#101828" />
                    <stop offset="0.998509" stop-color="#0D1B37" />
                    <stop offset="1" stop-color="#0A1E46" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="m-5">
              <p className="file-input__text font-bold">
                Select a file or drag and drop here{" "}
              </p>
              <p>JPG, PNG or PDF, file size no more than 10 MB</p>
            </div>

            <p className="absolute bottom-2 right-3 file-text">Select File</p>

            <input
              ref={inputRef}
              type="file"
              accept=".jpg, .jpeg, .png, .gif, .pdf" // Specify the file types you want to allow
              className="file-input__input"
              onChange={handleFileSelect}
            />
          </div>
        </div>
      </div>

      <div className=" flex  gap-2 my-5 ">
        <button onClick={goBack} className="cancel-btn px-8  rounded-lg">
          Back
        </button>
        <Ripples during={2000} color="#979797">
          <button
            onClick={goForward}
            className="add-btn px-5 text-xs  rounded-lg text-white"
          >
            Save & Continue
          </button>
        </Ripples>
        <button onClick={goToPayment} className="cancel-btn px-8  rounded-lg">
          Next
        </button>
      </div>
    </div>
  );
};

export default AddPersonForm;
