import { useState } from "react";
import Ripples from "react-ripples";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ProofIdentity = ({ handleCondition }) => {
  const [passportCheck, setPassportCheck] = useState(false);
  const [photoCard, setPhotoCard] = useState(false);

  const passportCheckHandle = () => {
    setPhotoCard(false);
    setPassportCheck(true);
  };

  const photoCardHandle = () => {
    setPhotoCard(true);
    setPassportCheck(false);
  };

  const navigationHandler = () => {
    if (passportCheck) {
      handleCondition(10);
    } else if (photoCard) {
      handleCondition(11);
    }

    if (!passportCheck && !photoCard) {
      toast.error("please select document which you want to upload");
    }
  };
  return (
    <div className=" docs-proof">
      <ToastContainer />
      <div>
        <div className="main-heading px-5 mt-7">
          Please pick which document you’d like to upload in order to verify
          your business
        </div>

        <div className="px-5 check-form mt-5">
          <div className="flex gap-2">
            <div className="flex justify-center items-center">
              <input
                onChange={passportCheckHandle}
                checked={passportCheck}
                type="checkbox"
              />
            </div>
            <div>Passport</div>
          </div>

          <div className="flex gap-2 mt-2">
            <div className="mt-1">
              <input type="checkbox" />
            </div>
            <div>Driving License ( Driver’s License)</div>
          </div>

          <div className="flex gap-2 mt-2">
            <div className="flex justify-center items-center">
              <input
                onChange={photoCardHandle}
                checked={photoCard}
                type="checkbox"
              />
            </div>
            <div>Photo Card</div>
          </div>

          <div className="flex gap-2 mt-2">
            <div className="flex justify-center items-center">
              <input type="checkbox" />
            </div>
            <div>New South Wales Driving Instructor License</div>
          </div>

          <div className="flex gap-2 mt-2">
            <div className="mt-1">
              <input type="checkbox" />
            </div>
            <div>Tasmanian Government Personal Information Card</div>
          </div>

          <div className="flex gap-2 mt-2">
            <div className="flex justify-center items-center">
              <input type="checkbox" />
            </div>
            <div>Immicard</div>
          </div>

          <div className="flex gap-2 mt-2">
            <div className="flex justify-center items-center">
              <input type="checkbox" />
            </div>
            <div>Proof Of Age Card</div>
          </div>

          <div className="flex gap-2 mt-2">
            <div className="flex justify-center items-center">
              <input type="checkbox" />
            </div>
            <div>
              Australian Defence Force (ADF) Identification Card (Military ID)
            </div>
          </div>

          <div className="flex gap-2 mt-2">
            <div className="flex justify-center items-center">
              <input type="checkbox" />
            </div>
            <div>Other</div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center mt-20">
        <Ripples during={2000} color="#979797">
          <button
            onClick={navigationHandler}
            className="add-btn text-white px-2 py-2 rounded-md"
          >
            Continue to upload
          </button>
        </Ripples>
      </div>
    </div>
  );
};

export default ProofIdentity;
