import { useState } from "react";
import Ripples from "react-ripples";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateAccountNumber } from "../../../../../../utills/FormValidation";
const PaymentInfo = ({ handleCondition, changePercent }) => {
  const [bsb, setBsb] = useState("");
  const [accountNumber, setAccountNumber] = useState(null);
  const [accountError, setAccountError] = useState(false);

  function goBack() {
    changePercent(75);
    handleCondition(7);
  }

  const handleAccountNumber = (e) => {
    const { value } = e.target;
    setAccountNumber(value);
    if (!validateAccountNumber(value)) {
      setAccountError(true);
    } else {
      setAccountError(false);
    }
  };

  const handleSubmit = () => {
    if (!bsb || !accountNumber) {
      return toast.error("Please fill all required.");
    }
  };

  return (
    <div className="p-5">
      <ToastContainer />
      <div className="payment-inner">
        <div className="payment-text mt-3">
          This information will be used for getting the Payouts.
        </div>

        <div className="payment-inputs mt-3">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <div>
                <label>BSB</label>
              </div>
              <div>
                <input
                  onChange={(e) => setBsb(e.target.value)}
                  type="text"
                  maxLength="60"
                  placeholder="BSB"
                />
              </div>
            </div>

            <div>
              <div>
                <label>Account Number</label>
              </div>
              <div>
                <input
                  onChange={(e) => handleAccountNumber(e)}
                  type="number"
                  placeholder="Account Number"
                />
                <div className="error-div mt-1">
                  {" "}
                  {accountError && accountNumber !== "" ? (
                    <span> invalid account number </span>
                  ) : (
                    ""
                  )}{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center gap-3">
        <button onClick={goBack} className="cancel-btn px-10 py-2 rounded-md ">
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="add-btn px-10 py-2 rounded-md text-white"
          disabled={accountError}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default PaymentInfo;
