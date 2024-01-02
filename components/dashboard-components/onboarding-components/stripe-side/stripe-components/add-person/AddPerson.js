import "./css/addPerson.css";
import { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddPerson = ({ changePercent, handleCondition }) => {
  const [representativeAcc, setRepresentativeAcc] = useState(false);
  const [percentageOwner, setPercentageOwner] = useState(false);
  const [governingBoardMember, setGoverningBoardMember] = useState(false);
  const [isExectiveOrSM, setIsExectiveOrSM] = useState(false);

  const goBack = () => {
    changePercent(50);
    handleCondition(6);
  };

  const isAnyTrue = (obj) => {
    return Object.values(obj).some((value) => value === true);
  };

  const goForward = () => {
    const addPersonObj = {
      representativeAcc,
      percentageOwner,
      governingBoardMember,
      isExectiveOrSM,
    };
    if (isAnyTrue(addPersonObj)) {
      handleCondition(8);
    } else {
      toast.error("Please select atleast one option.");
    }
  };
  return (
    <div className="p-5">
      <ToastContainer />
      <div className="upper-upload">
        <div className="docs-proof-inner">
          <div>
            <div className="px-3 check-form mt-5">
              <div className="flex gap-2">
                <div className="mt-1">
                  <input
                    onChange={(e) => setRepresentativeAcc(e.target.checked)}
                    type="checkbox"
                  />
                </div>
                <div>
                  This person is authorized as the primary representative of the
                  account.
                </div>
              </div>

              <div className="flex gap-2 mt-3">
                <div className="mt-1">
                  <input
                    onChange={(e) => setPercentageOwner(e.target.checked)}
                    type="checkbox"
                  />
                </div>
                <div>This person owns 25% or more of the company.</div>
              </div>

              <div className="flex gap-2 mt-3">
                <div className="mt-1">
                  <input
                    onChange={(e) => setGoverningBoardMember(e.target.checked)}
                    type="checkbox"
                  />
                </div>
                <div>
                  This person is the member of the governing board of the
                  company.
                </div>
              </div>

              <div className="flex gap-2 mt-3">
                <div className="mt-1">
                  <input
                    onChange={(e) => setIsExectiveOrSM(e.target.checked)}
                    type="checkbox"
                  />
                </div>
                <div>
                  This person is an executive or senior manager with significant
                  management responsibility.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center gap-2">
        <button onClick={goBack} className="cancel-btn px-8 py-2 rounded-md">
          Cancel
        </button>
        <button
          onClick={goForward}
          className="add-btn text-white px-10 py-2 rounded-md"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddPerson;
