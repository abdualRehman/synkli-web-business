import Header from "../../../Header";
import "./css/alternateMethod.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const AlternateMethodPage = () => {
  const navigate = useNavigate();
  const [checkValue, setCheckValue] = useState("");

  const handleCheck = (event) => {
    if (event === true) {
      setCheckValue("code");
    } else {
      setCheckValue("");
    }
  };

  const handleSecondCheck = (event) => {
    if (event === true) {
      setCheckValue("email");
    } else {
      setCheckValue("");
    }
  };

  const navigateHandler = () => {
    if (checkValue === "code") {
      navigate("/backup/alternate");
    } else {
      navigate("/email/alternate");
    }
  };
  return (
    <div>
      <Header />
      <div className="flex justify-center items-center">
        <div className="alternate-method">
          <div className="upper-layer-a">
            <h1 className="px-16 title mt-5">Use Alternate Method</h1>
            <div className="px-20">
              <div className="a-use mt-10">
                You can choose your Alternate Method
              </div>

              <div className="radios mt-5">
                <div className="flex gap-2 justify-between">
                  <div className="flex justify-center items-center ">
                    <svg
                      width="6"
                      height="10"
                      viewBox="0 0 8 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.433859 2.66497C-0.486076 1.68906 0.154012 0 1.44378 0C1.82265 0 2.18628 0.161092 2.45593 0.448399L7.57503 5.90261C8.14166 6.50634 8.14166 7.49366 7.57503 8.09739L2.45593 13.5516C2.18628 13.8389 1.82265 14 1.44378 14C0.154012 14 -0.486078 12.3109 0.433856 11.335L4.52022 7L0.433859 2.66497Z"
                        fill="url(#paint0_linear_2369_13257)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_2369_13257"
                          x1="4.39252"
                          y1="0.173866"
                          x2="4.37418"
                          y2="14"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#101828" />
                          <stop offset="0.998509" stop-color="#0D1B37" />
                          <stop offset="1" stop-color="#0A1E46" />
                        </linearGradient>
                      </defs>
                    </svg>

                    <div className="a-label mx-2">By Backup Code</div>
                  </div>

                  <div className="flex justify-center items-center mt-1">
                    <input
                      type="checkbox"
                      onChange={(e) => handleCheck(e.target.checked)}
                      checked={checkValue === "code" ? true : false}
                    />
                  </div>
                </div>

                <div className="a-use mt-2 ml-3">
                  Use the provided backup codes. You can Sign In to your account
                  by using a Backup code
                </div>

                <div className="flex gap-2 justify-between mt-5">
                  <div className="flex justify-center items-center ">
                    <svg
                      width="6"
                      height="10"
                      viewBox="0 0 8 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.433859 2.66497C-0.486076 1.68906 0.154012 0 1.44378 0C1.82265 0 2.18628 0.161092 2.45593 0.448399L7.57503 5.90261C8.14166 6.50634 8.14166 7.49366 7.57503 8.09739L2.45593 13.5516C2.18628 13.8389 1.82265 14 1.44378 14C0.154012 14 -0.486078 12.3109 0.433856 11.335L4.52022 7L0.433859 2.66497Z"
                        fill="url(#paint0_linear_2369_13257)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_2369_13257"
                          x1="4.39252"
                          y1="0.173866"
                          x2="4.37418"
                          y2="14"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#101828" />
                          <stop offset="0.998509" stop-color="#0D1B37" />
                          <stop offset="1" stop-color="#0A1E46" />
                        </linearGradient>
                      </defs>
                    </svg>

                    <div className="a-label mx-2">By Email & Security Questions</div>
                  </div>

                  <div className="flex justify-center items-center mt-1">
                    <input
                      type="checkbox"
                      onChange={(e) => handleSecondCheck(e.target.checked)}
                      checked={checkValue === "email" ? true : false}
                    />
                  </div>
                </div>

                <div className="a-use mt-2 ml-3">
                  We’ll send you a message with code to an authorized Email.
                </div>
              </div>
            </div>
          </div>

          <div className="bottom-layer-a absolute bottom-10 left-1/2  flex justify-center items-center">
            <button onClick={navigateHandler} className="px-12 py-2 rounded-md">
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlternateMethodPage;
