import React from "react";
import "./css/empPaymentOption.css";
import { motion } from "framer-motion";
export const EmpPaymentOptions = ({ toggleEmpPaymentOptions }) => {
  return (
    <div className="add-p-side grid grid-cols-4 ">
      <div className="md:col-span-2 hidden md:block left-side"></div>
      <div className="right-side col-span-4 md:col-span-2">
        <motion.div
          initial={{ x: 700 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2, type: "tween", duration: 0.4 }}
          className="inner-right relative"
        >
          <div>
            <div
              onClick={toggleEmpPaymentOptions}
              className="absolute   text-white p-2 right-1 top-1 cursor-pointer"
            >
              <svg
                width="18"
                height="18"
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
            </div>
            <div className="add-detail pt-10 px-5">
              <div className="title">Employee Payment Options</div>

              <div className="jumbo-dir mt-2">
                Payroll{" "}
                <span className="special-jumbo-text"> &gt; Settings</span>
              </div>
            </div>
          </div>

          <div className="add-ann-form mt-5 px-5">
            <div className="linked-agent-title flex gap-5 items-center">
              <div> ABA File Settings </div>
              <div>
                {" "}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_1639_2719)">
                    <path
                      d="M9.04297 0.0419483C6.71094 0.28023 4.58594 1.28414 2.9375 2.92867C-0.976562 6.83492 -0.976562 13.163 2.9375 17.0693C4.52344 18.6513 6.45703 19.6005 8.76953 19.9287C9.23438 19.9951 10.7695 19.9912 11.25 19.9248C13.5156 19.6123 15.5039 18.6357 17.0664 17.0654C18.8789 15.2412 19.8906 12.9209 19.9883 10.3505C20.0898 7.5732 19.043 4.90914 17.0625 2.92867C15.5273 1.3896 13.582 0.416948 11.3867 0.0927296C10.9102 0.0224171 9.52344 -0.00883293 9.04297 0.0419483ZM11.4453 1.51851C13.2578 1.84664 14.8008 2.65132 16.0742 3.92476C17.7109 5.56148 18.5938 7.69039 18.5938 9.99898C18.5938 12.3076 17.7109 14.4365 16.0742 16.0732C14.4375 17.7099 12.3086 18.5927 10 18.5927C7.69531 18.5927 5.55859 17.706 3.92578 16.0732C2.63281 14.7802 1.83203 13.2216 1.49609 11.3466C1.39844 10.788 1.39844 9.20992 1.49609 8.65132C1.83203 6.77632 2.63281 5.21773 3.92578 3.92476C5.32031 2.53023 7.00781 1.71382 9.04297 1.44429C9.52344 1.38179 10.9336 1.42476 11.4453 1.51851Z"
                      fill="url(#paint0_linear_1639_2719)"
                    />
                    <path
                      d="M9.47997 5.00391C8.8081 5.05859 8.19872 5.32031 7.78466 5.72656C7.19482 6.30469 7.1206 7.04297 7.6206 7.35156C8.01513 7.59766 8.32763 7.52734 8.61278 7.13281C8.94872 6.66016 9.19091 6.51953 9.71825 6.49219C10.5464 6.44531 11.0542 6.82031 11.0073 7.4375C10.9722 7.86719 10.8081 8.08984 10.1362 8.63281C9.44872 9.1875 9.21044 9.51172 9.0581 10.1094C8.95653 10.5156 8.95653 11.2031 9.0581 11.4336C9.16357 11.6641 9.31591 11.7344 9.71044 11.7344C10.2768 11.7344 10.4683 11.5547 10.4683 11.0156C10.4683 10.3516 10.6479 10.0234 11.2886 9.48828C12.312 8.64453 12.7768 7.76563 12.6558 6.90625C12.4722 5.62891 11.1909 4.85938 9.47997 5.00391Z"
                      fill="url(#paint1_linear_1639_2719)"
                    />
                    <path
                      d="M9.39475 12.7002C8.69553 12.958 8.4885 13.833 8.99631 14.3643C9.39475 14.7822 10.0041 14.7783 10.4104 14.3603C11.0276 13.7236 10.6291 12.708 9.74631 12.665C9.6174 12.6611 9.46115 12.6768 9.39475 12.7002Z"
                      fill="url(#paint2_linear_1639_2719)"
                    />
                  </g>
                  <defs>
                    <linearGradient
                      id="paint0_linear_1639_2719"
                      x1="9.9985"
                      y1="19.9766"
                      x2="9.9985"
                      y2="0.0169125"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#101828" />
                      <stop offset="1" stop-color="#0A1E46" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_1639_2719"
                      x1="9.98181"
                      y1="11.7344"
                      x2="9.98181"
                      y2="4.98656"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#101828" />
                      <stop offset="1" stop-color="#0A1E46" />
                    </linearGradient>
                    <linearGradient
                      id="paint2_linear_1639_2719"
                      x1="9.71177"
                      y1="14.6758"
                      x2="9.71177"
                      y2="12.6644"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#101828" />
                      <stop offset="1" stop-color="#0A1E46" />
                    </linearGradient>
                    <clipPath id="clip0_1639_2719">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <div>
                  {" "}
                  <label>BSB *</label>{" "}
                </div>
                <div>
                  {" "}
                  <input type="text" placeholder="BSB" />{" "}
                </div>
                <div className="mt-1">
                  {" "}
                  <label>Account Name *</label>{" "}
                </div>
                <div>
                  {" "}
                  <input type="text" placeholder="Account Name" />{" "}
                </div>
                <div className="mt-1">
                  {" "}
                  <label>APCA User ID * Digits</label>{" "}
                </div>
                <div>
                  {" "}
                  <input type="text" placeholder="APCA User ID" />{" "}
                </div>
              </div>
              <div>
                <div>
                  {" "}
                  <label>Account Number 6-9 </label>{" "}
                </div>
                <div>
                  {" "}
                  <input
                    type="Number"
                    placeholder="Account Number"
                    className="mised-input-style"
                  />{" "}
                </div>
                <div className="mt-1">
                  {" "}
                  <label>
                    {" "}
                    Institution Code *{" "}
                    <span className="text-blue-900">Search</span>{" "}
                  </label>{" "}
                </div>
                <div>
                  {" "}
                  <input type="text" placeholder="Account Name" />{" "}
                </div>
              </div>
            </div>
            <div className="linked-agent-title mt-3">
              Contact your bank to confirm your APCA ID (Eg. For CBA, use
              305500)
            </div>
            <div className="leave-settings-weak-text mt-1">
              For APCA ID is not registered and will be ignored, please enter
              000000 in the field to proceed{" "}
            </div>

            <div className="mt-3 flex gap-2 items-center">
              <div>
                {" "}
                <input type="checkbox" />{" "}
              </div>
              <div>
                {" "}
                <div className="leave-settings-weak-text">
                  Includes Self Balancing Transaction
                </div>{" "}
              </div>
              <div>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_1639_2719)">
                    <path
                      d="M9.04297 0.0419483C6.71094 0.28023 4.58594 1.28414 2.9375 2.92867C-0.976562 6.83492 -0.976562 13.163 2.9375 17.0693C4.52344 18.6513 6.45703 19.6005 8.76953 19.9287C9.23438 19.9951 10.7695 19.9912 11.25 19.9248C13.5156 19.6123 15.5039 18.6357 17.0664 17.0654C18.8789 15.2412 19.8906 12.9209 19.9883 10.3505C20.0898 7.5732 19.043 4.90914 17.0625 2.92867C15.5273 1.3896 13.582 0.416948 11.3867 0.0927296C10.9102 0.0224171 9.52344 -0.00883293 9.04297 0.0419483ZM11.4453 1.51851C13.2578 1.84664 14.8008 2.65132 16.0742 3.92476C17.7109 5.56148 18.5938 7.69039 18.5938 9.99898C18.5938 12.3076 17.7109 14.4365 16.0742 16.0732C14.4375 17.7099 12.3086 18.5927 10 18.5927C7.69531 18.5927 5.55859 17.706 3.92578 16.0732C2.63281 14.7802 1.83203 13.2216 1.49609 11.3466C1.39844 10.788 1.39844 9.20992 1.49609 8.65132C1.83203 6.77632 2.63281 5.21773 3.92578 3.92476C5.32031 2.53023 7.00781 1.71382 9.04297 1.44429C9.52344 1.38179 10.9336 1.42476 11.4453 1.51851Z"
                      fill="url(#paint0_linear_1639_2719)"
                    />
                    <path
                      d="M9.47997 5.00391C8.8081 5.05859 8.19872 5.32031 7.78466 5.72656C7.19482 6.30469 7.1206 7.04297 7.6206 7.35156C8.01513 7.59766 8.32763 7.52734 8.61278 7.13281C8.94872 6.66016 9.19091 6.51953 9.71825 6.49219C10.5464 6.44531 11.0542 6.82031 11.0073 7.4375C10.9722 7.86719 10.8081 8.08984 10.1362 8.63281C9.44872 9.1875 9.21044 9.51172 9.0581 10.1094C8.95653 10.5156 8.95653 11.2031 9.0581 11.4336C9.16357 11.6641 9.31591 11.7344 9.71044 11.7344C10.2768 11.7344 10.4683 11.5547 10.4683 11.0156C10.4683 10.3516 10.6479 10.0234 11.2886 9.48828C12.312 8.64453 12.7768 7.76563 12.6558 6.90625C12.4722 5.62891 11.1909 4.85938 9.47997 5.00391Z"
                      fill="url(#paint1_linear_1639_2719)"
                    />
                    <path
                      d="M9.39475 12.7002C8.69553 12.958 8.4885 13.833 8.99631 14.3643C9.39475 14.7822 10.0041 14.7783 10.4104 14.3603C11.0276 13.7236 10.6291 12.708 9.74631 12.665C9.6174 12.6611 9.46115 12.6768 9.39475 12.7002Z"
                      fill="url(#paint2_linear_1639_2719)"
                    />
                  </g>
                  <defs>
                    <linearGradient
                      id="paint0_linear_1639_2719"
                      x1="9.9985"
                      y1="19.9766"
                      x2="9.9985"
                      y2="0.0169125"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#101828" />
                      <stop offset="1" stop-color="#0A1E46" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_1639_2719"
                      x1="9.98181"
                      y1="11.7344"
                      x2="9.98181"
                      y2="4.98656"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#101828" />
                      <stop offset="1" stop-color="#0A1E46" />
                    </linearGradient>
                    <linearGradient
                      id="paint2_linear_1639_2719"
                      x1="9.71177"
                      y1="14.6758"
                      x2="9.71177"
                      y2="12.6644"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#101828" />
                      <stop offset="1" stop-color="#0A1E46" />
                    </linearGradient>
                    <clipPath id="clip0_1639_2719">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          <div className="emp-details-b-buttons absolute bottom-5 w-full flex items-center justify-center gap-3">
            <button className="emp-details-save-btn">Save & Close</button>
            <button className="emp-details-close-btn">Close</button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
