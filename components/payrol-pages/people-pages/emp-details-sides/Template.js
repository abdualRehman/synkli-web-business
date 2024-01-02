export const Template = () => {
  return (
    <div className="mt-3 opening-balance p-2">
      <div className="b-s-title my-2">Earnings</div>
      <div className="template-top-grid gap-1 mt-2 add-ann-form">
        <div>
          <div className="b-s-light-text template-h-text">
            {" "}
            You can change saving settings in the{" "}
          </div>
          <div className="template-h-text">
            {" "}
            <label>Ordinary Time earnings</label>{" "}
          </div>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div>
                <div className="leave-loading-container">
                  <input
                    type="number"
                    placeholder="Hours"
                    className="template-input"
                  />
                  <button className="template-btn">hr</button>
                </div>
              </div>

              <div className="mt-1">
                <select>
                  <option value="" selected disabled>
                    Exempt
                  </option>
                </select>
              </div>
            </div>
            <div>
              <div className="leave-loading-container ">
                <input
                  type="number"
                  placeholder="Earnings"
                  className="template-input"
                />
                <button className="template-btn">$</button>
              </div>

              <div className="leave-loading-container mt-2">
                <input
                  type="number"
                  placeholder="Earnings"
                  className="template-input"
                />
                <button className="template-btn">$</button>
              </div>
            </div>
          </div>
        </div>

        <div className="template-blue-text mt-3 flex gap-2 items-center">
          <div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1639_5812)">
                <path
                  d="M8.68574 0.0611362C8.60137 0.0927753 8.46426 0.184183 8.3834 0.265041C8.10215 0.542776 8.11973 0.293167 8.11973 4.43809V8.12246H4.43535C0.29043 8.12246 0.540039 8.1084 0.262305 8.38613C-0.0822266 8.73067 -0.0822266 9.27207 0.262305 9.6166C0.540039 9.89434 0.29043 9.88027 4.43535 9.88027H8.11973V13.5646C8.11973 17.7096 8.10566 17.46 8.3834 17.7377C8.72793 18.0822 9.26934 18.0822 9.61387 17.7377C9.8916 17.46 9.87754 17.7096 9.87754 13.5646V9.88027H13.5619C17.7068 9.88027 17.4572 9.89434 17.735 9.6166C18.0795 9.27207 18.0795 8.73067 17.735 8.38613C17.4572 8.1084 17.7068 8.12246 13.5619 8.12246H9.87754V4.43809C9.87754 0.293167 9.8916 0.542776 9.61387 0.265041C9.37129 0.0189476 9.01973 -0.0548801 8.68574 0.0611362Z"
                  fill="url(#paint0_linear_1639_5812)"
                />
              </g>
              <defs>
                <linearGradient
                  id="paint0_linear_1639_5812"
                  x1="8.99863"
                  y1="17.9961"
                  x2="8.99863"
                  y2="0.0074482"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#101828" />
                  <stop offset="1" stop-color="#0A1E46" />
                </linearGradient>
                <clipPath id="clip0_1639_5812">
                  <rect width="18" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div>Add Extra Hours</div>
        </div>
      </div>

      <div className="add-ann-form">
        <div className="b-s-title my-2 mt-3">Allowance</div>
        <div>
          <label>Allowance</label>
        </div>

        <div className="mt-1 grid grid-cols-2 gap-5">
          <div>
            <div className="leave-loading-container">
              <input
                type="number"
                placeholder="Allowance"
                className="leave-loading-input"
              />
              <button className="leave-loading-btn">Unit</button>
            </div>
            <div className="mt-2">
              <select>
                <option value="" selected disabled>
                  Subject to Tax and Super
                </option>
              </select>
            </div>
            <div className="b-s-light-text mt-2"> Option </div>
          </div>
          <div>
            <div className="pay-rate-container">
              <input
                type="number"
                name=""
                id=""
                placeholder="Earnings"
                className="pay-rate-input"
              />
              <button className="pay-rate-btn">$</button>
            </div>
            <div className="mt-1">
              <input type="text" placeholder="Cents per KM" />
            </div>

            <div className="b-s-light-text mt-2"> Type </div>
          </div>
        </div>

        <div className="template-blue-text mt-3 flex gap-2 items-center">
          <div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1639_5812)">
                <path
                  d="M8.68574 0.0611362C8.60137 0.0927753 8.46426 0.184183 8.3834 0.265041C8.10215 0.542776 8.11973 0.293167 8.11973 4.43809V8.12246H4.43535C0.29043 8.12246 0.540039 8.1084 0.262305 8.38613C-0.0822266 8.73067 -0.0822266 9.27207 0.262305 9.6166C0.540039 9.89434 0.29043 9.88027 4.43535 9.88027H8.11973V13.5646C8.11973 17.7096 8.10566 17.46 8.3834 17.7377C8.72793 18.0822 9.26934 18.0822 9.61387 17.7377C9.8916 17.46 9.87754 17.7096 9.87754 13.5646V9.88027H13.5619C17.7068 9.88027 17.4572 9.89434 17.735 9.6166C18.0795 9.27207 18.0795 8.73067 17.735 8.38613C17.4572 8.1084 17.7068 8.12246 13.5619 8.12246H9.87754V4.43809C9.87754 0.293167 9.8916 0.542776 9.61387 0.265041C9.37129 0.0189476 9.01973 -0.0548801 8.68574 0.0611362Z"
                  fill="url(#paint0_linear_1639_5812)"
                />
              </g>
              <defs>
                <linearGradient
                  id="paint0_linear_1639_5812"
                  x1="8.99863"
                  y1="17.9961"
                  x2="8.99863"
                  y2="0.0074482"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#101828" />
                  <stop offset="1" stop-color="#0A1E46" />
                </linearGradient>
                <clipPath id="clip0_1639_5812">
                  <rect width="18" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div>Add Allowance</div>
        </div>

        <div className="b-s-title my-2 mt-3">Deduction</div>
        <div>
          {" "}
          <label>Deduction</label>{" "}
        </div>

        <div className="grid grid-cols-3 mt-1 gap-3">
          <div>
            <div>
              <select>
                <option value="" disabled selected>
                  {" "}
                  Pre-tax deduction{" "}
                </option>
              </select>
            </div>
          </div>
          <div>
            <div>
              <select>
                <option value="" disabled selected>
                  {" "}
                  Fees{" "}
                </option>
              </select>
            </div>
          </div>
          <div>
            <div className="pay-rate-container">
              <input
                type="number"
                name=""
                id=""
                placeholder="Earnings"
                className="ob-input"
              />
              <button className="ob-btn">$</button>
            </div>
          </div>
        </div>
        <div className="b-s-light-text mt-1"> Option </div>

        <div className="template-blue-text mt-3 flex gap-2 items-center">
          <div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1639_5812)">
                <path
                  d="M8.68574 0.0611362C8.60137 0.0927753 8.46426 0.184183 8.3834 0.265041C8.10215 0.542776 8.11973 0.293167 8.11973 4.43809V8.12246H4.43535C0.29043 8.12246 0.540039 8.1084 0.262305 8.38613C-0.0822266 8.73067 -0.0822266 9.27207 0.262305 9.6166C0.540039 9.89434 0.29043 9.88027 4.43535 9.88027H8.11973V13.5646C8.11973 17.7096 8.10566 17.46 8.3834 17.7377C8.72793 18.0822 9.26934 18.0822 9.61387 17.7377C9.8916 17.46 9.87754 17.7096 9.87754 13.5646V9.88027H13.5619C17.7068 9.88027 17.4572 9.89434 17.735 9.6166C18.0795 9.27207 18.0795 8.73067 17.735 8.38613C17.4572 8.1084 17.7068 8.12246 13.5619 8.12246H9.87754V4.43809C9.87754 0.293167 9.8916 0.542776 9.61387 0.265041C9.37129 0.0189476 9.01973 -0.0548801 8.68574 0.0611362Z"
                  fill="url(#paint0_linear_1639_5812)"
                />
              </g>
              <defs>
                <linearGradient
                  id="paint0_linear_1639_5812"
                  x1="8.99863"
                  y1="17.9961"
                  x2="8.99863"
                  y2="0.0074482"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#101828" />
                  <stop offset="1" stop-color="#0A1E46" />
                </linearGradient>
                <clipPath id="clip0_1639_5812">
                  <rect width="18" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div>Add Deduction</div>
        </div>

        <div className="b-s-title my-2 mt-3">Child Support</div>
        <div>
          {" "}
          <label>Child Support</label>{" "}
        </div>
        <div className="grid grid-cols-2 gap-5 mt-1">
          <div>
            <select>
              <option value="" selected disabled>
                Child Support
              </option>
            </select>
          </div>
          <div>
            <div className="pay-rate-container">
              <input
                type="number"
                name=""
                id=""
                placeholder="Earnings"
                className="pay-rate-input"
              />
              <button className="pay-rate-btn">$</button>
            </div>
          </div>
        </div>
        <div className="b-s-light-text mt-1"> Type </div>
        <div className="template-blue-text mt-3 flex gap-2 items-center">
          <div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1639_5812)">
                <path
                  d="M8.68574 0.0611362C8.60137 0.0927753 8.46426 0.184183 8.3834 0.265041C8.10215 0.542776 8.11973 0.293167 8.11973 4.43809V8.12246H4.43535C0.29043 8.12246 0.540039 8.1084 0.262305 8.38613C-0.0822266 8.73067 -0.0822266 9.27207 0.262305 9.6166C0.540039 9.89434 0.29043 9.88027 4.43535 9.88027H8.11973V13.5646C8.11973 17.7096 8.10566 17.46 8.3834 17.7377C8.72793 18.0822 9.26934 18.0822 9.61387 17.7377C9.8916 17.46 9.87754 17.7096 9.87754 13.5646V9.88027H13.5619C17.7068 9.88027 17.4572 9.89434 17.735 9.6166C18.0795 9.27207 18.0795 8.73067 17.735 8.38613C17.4572 8.1084 17.7068 8.12246 13.5619 8.12246H9.87754V4.43809C9.87754 0.293167 9.8916 0.542776 9.61387 0.265041C9.37129 0.0189476 9.01973 -0.0548801 8.68574 0.0611362Z"
                  fill="url(#paint0_linear_1639_5812)"
                />
              </g>
              <defs>
                <linearGradient
                  id="paint0_linear_1639_5812"
                  x1="8.99863"
                  y1="17.9961"
                  x2="8.99863"
                  y2="0.0074482"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#101828" />
                  <stop offset="1" stop-color="#0A1E46" />
                </linearGradient>
                <clipPath id="clip0_1639_5812">
                  <rect width="18" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div>Add Child Support</div>
        </div>

        <div className="b-s-title my-1 mt-3">Superannuation</div>
        <div className="b-s-light-text ">
          {" "}
          You can change super contribution rate in the link & Super section{" "}
        </div>

        <div className="grid grid-cols-2 gap-5 mt-2">
          <div>
            <div>
              {" "}
              <label>Employer Contribution</label>{" "}
            </div>
            <div>
              <input type="text" placeholder="Contribution" />
            </div>
          </div>
          <div>
            <div>
              {" "}
              <label>Super Salary Sacrifice</label>{" "}
            </div>
            <div>
              <input type="text" placeholder="Salary" />
            </div>
          </div>
        </div>
        <div className="b-s-title my-1 mt-3">Tax</div>
        <div className="flex gap-2  items-center">
          <div>
            {" "}
            <input type="checkbox" />{" "}
          </div>
          <div>
            {" "}
            <label>Apply fixed tax amount</label>{" "}
          </div>
        </div>
      </div>

      <div className="my-5 flex justify-center items-center w-full gap-3">
        <button className="emp-details-save-btn">Save</button>
        <button className="emp-details-close-btn">Close</button>
      </div>
    </div>
  );
};
