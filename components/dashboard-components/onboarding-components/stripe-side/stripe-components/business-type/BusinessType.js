import "./css/businessType.css";
import { useState } from "react";
import Ripples from "react-ripples";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BusinessType = ({ changePercent, handleCondition, toggleStripeSide }) => {
  const [businessType, setBusinessType] = useState("");

  const changeConditions = () => {
    if (businessType === "") {
      return toast.error("Please select business type");
    }
    changePercent(25);
    handleCondition(2);
  };
  return (
    <div className="p-5 service-form business-type mt-3 relative">
      <ToastContainer />
      <div className="bt-inner">
        <div className="title">
          <label> Business Type</label>
        </div>
        <div>
          <select
            onChange={(e) => setBusinessType(e.target.value)}
            className="px-3 rounded-xl mt-1"
          >
            <option value="Business Type">Business Type</option>
            <option value="Business Name">Business Name</option>
          </select>
        </div>
      </div>
      <div className="bt-outer flex justify-center items-center gap-3">
        <button
          onClick={toggleStripeSide}
          className="cancel-btn px-12 py-2 rounded-lg"
        >
          Cancel
        </button>
        <Ripples during={2000} color="#979797">
          <button
            onClick={changeConditions}
            className="save-btn px-12 py-2 rounded-lg"
          >
            save
          </button>
        </Ripples>
      </div>
    </div>
  );
};
export default BusinessType;
