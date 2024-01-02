import { motion } from "framer-motion";
import { SideTimes } from "utills/svgs/SideTimes";
const AddBusinessSide = ({ toggleBusinessSide }) => {
  function hideSide() {
    toggleBusinessSide();
  }
  return (
    <div className="show-business-side grid grid-cols-5">
      <div className="col-span-3"></div>
      <motion.div
        initial={{ x: 700 }}
        animate={{ x: 0 }}
        transition={{ delay: 0.2, type: "tween", duration: 0.4 }}
        className="col-span-2 inner-right relative"
      >
        <div
          onClick={hideSide}
          className="text-white  p-2 absolute right-1 top-1 cursor-pointer"
        >
          <SideTimes />
        </div>

        <div className="add-business-info p-5 pt-10">
          <div className="title">Add Business</div>

          <div className="my-2 business-logo">Upload Business Logo</div>
          <div className="upload-camera p-1 cursor-pointer">
            <div className="inner-upload flex justify-center items-center flex-col">
              <div>
                <svg
                  width="23"
                  height="21"
                  viewBox="0 0 33 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.5 12.2778C13.9797 12.2778 11.85 14.4914 11.85 17.1111C11.85 19.7308 13.9797 21.9444 16.5 21.9444C19.0203 21.9444 21.15 19.7308 21.15 17.1111C21.15 14.4914 19.0203 12.2778 16.5 12.2778Z"
                    stroke="url(#paint0_linear_2369_3660)"
                    stroke-width="1.6"
                  />
                  <path
                    d="M28.9 5.83333H24.8917L20.6958 1.47206C20.5522 1.32216 20.3814 1.20327 20.1933 1.12226C20.0052 1.04124 19.8036 0.999695 19.6 1H13.4C13.1964 0.999695 12.9948 1.04124 12.8067 1.12226C12.6186 1.20327 12.4478 1.32216 12.3041 1.47206L8.1083 5.83333H4.1C2.39035 5.83333 1 7.2785 1 9.05556V26.7778C1 28.5548 2.39035 30 4.1 30H28.9C30.6096 30 32 28.5548 32 26.7778V9.05556C32 7.2785 30.6096 5.83333 28.9 5.83333Z"
                    stroke="url(#paint1_linear_2369_3660)"
                    stroke-width="1.6"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_2369_3660"
                      x1="18.021"
                      y1="1.36015"
                      x2="18.0007"
                      y2="30.0001"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#101828" />
                      <stop offset="0.998509" stop-color="#0D1B37" />
                      <stop offset="1" stop-color="#0A1E46" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_2369_3660"
                      x1="18.021"
                      y1="1.36015"
                      x2="18.0007"
                      y2="30.0001"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#101828" />
                      <stop offset="0.998509" stop-color="#0D1B37" />
                      <stop offset="1" stop-color="#0A1E46" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="upload-text mt-1">Click to upload</div>
            </div>
          </div>

          <div className="business-form pr-10 mt-5">
            <div>
              <label>Business Name</label>
            </div>
            <div>
              <input type="text" className="first-input rounded-xl mt-2" />
            </div>

            <div className="grid grid-cols-2 mt-2 gap-5">
              <div>
                <div>
                  <div>
                    <label>Email</label>
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Enter Email"
                      className="rounded-xl px-3"
                    />
                  </div>
                </div>

                <div>
                  <div className="mt-1">
                    <label>ABN</label>
                  </div>
                  <div>
                    <input
                      type="text"
                      maxLength="60"
                      placeholder="ABN"
                      className="rounded-xl px-3"
                    />
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <div>
                    <label>Phone Number</label>
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Enter Phone No"
                      className="rounded-xl px-3"
                    />
                  </div>
                </div>

                <div>
                  <div className="mt-1">
                    <label>Website Link</label>
                  </div>
                  <div>
                    <input
                      type="url"
                      placeholder="https://"
                      className="rounded-xl px-3"
                    />
                  </div>
                </div>
              </div>
              <div></div>
            </div>
          </div>

          <div className="flex justify-center  btn-wrap mt-36 max-lg:mt-48">
            <button className="add-btn text-white px-16 py-2 rounded-md">
              Add
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AddBusinessSide;
